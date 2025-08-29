import { useCallback, useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ZoomIn, ZoomOut, RotateCcw, Move, Square } from "lucide-react";

interface PixelData {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  owner?: string;
  imageUrl?: string;
  url?: string;
  sold: boolean;
}

interface PixelGridProps {
  onPixelSelect?: (pixels: PixelData[]) => void;
}

export const PixelGrid = ({ onPixelSelect }: PixelGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1.0); // Start at 100% zoom
  const [pan, setPan] = useState({ x: 0, y: 0 }); // Will be set to center the grid
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 });
  const [selectedPixels, setSelectedPixels] = useState<PixelData[]>([]);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  // Sample sold pixels for demo
  const [soldPixels] = useState<PixelData[]>([
    { id: '1', x: 100, y: 100, width: 200, height: 200, sold: true, owner: 'Demo User' },
    { id: '2', x: 300, y: 200, width: 100, height: 100, sold: true, owner: 'Test Corp' },
    { id: '3', x: 500, y: 500, width: 200, height: 150, sold: true, owner: 'Big Brand' },
  ]);

  const GRID_SIZE = 1000;
  const PIXEL_SIZE = 1;
  const PADDING = { top: 30, bottom: 50, left: 30, right: 30 };

  // Pan clamping function to keep grid within bounds
  const clampPan = useCallback((currentZoom: number, panX: number, panY: number) => {
    if (!containerRef.current) return { x: panX, y: panY };
    
    const container = containerRef.current;
    const screenWidth = container.clientWidth;
    const screenHeight = container.clientHeight;
    const scaledGridWidth = GRID_SIZE * currentZoom;
    const scaledGridHeight = GRID_SIZE * currentZoom;
    
    // Calculate bounds with padding
    const minX = screenWidth - scaledGridWidth - PADDING.right;
    const maxX = PADDING.left;
    const minY = screenHeight - scaledGridHeight - PADDING.bottom;
    const maxY = PADDING.top;
    
    return {
      x: Math.max(minX, Math.min(maxX, panX)),
      y: Math.max(minY, Math.min(maxY, panY))
    };
  }, [GRID_SIZE, PADDING]);

  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ensure canvas backing store matches device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas with visible background color
    ctx.fillStyle = '#1e293b'; // Slate-800 background
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Set transform for zoom and pan
    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    // Draw main grid area with contrasting background
    ctx.fillStyle = '#0f172a'; // Very dark background for the grid
    ctx.fillRect(0, 0, GRID_SIZE, GRID_SIZE);

    // Draw grid lines with adaptive spacing
    const minGridSpacing = 50 / zoom; // Minimum spacing in screen pixels
    let gridSpacing = 10;
    while (gridSpacing * zoom < minGridSpacing && gridSpacing < 1000) {
      gridSpacing *= 10;
    }
    
    if (zoom > 0.01) { // Only draw grid lines when zoomed in enough
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 1 / zoom;
      
      // Vertical lines
      for (let x = 0; x <= GRID_SIZE; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, GRID_SIZE);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y <= GRID_SIZE; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(GRID_SIZE, y);
        ctx.stroke();
      }
    }

    // Draw sold pixels
    soldPixels.forEach(pixel => {
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 3 / zoom;
      ctx.strokeRect(pixel.x, pixel.y, pixel.width, pixel.height);
    });

    // Draw selected pixels
    selectedPixels.forEach(pixel => {
      ctx.fillStyle = '#10b981'; // Green for selected pixels
      ctx.fillRect(pixel.x, pixel.y, pixel.width, pixel.height);
      
      // Add border to selected pixels
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 3 / zoom;
      ctx.strokeRect(pixel.x, pixel.y, pixel.width, pixel.height);
    });

    ctx.restore();
  }, [zoom, pan, soldPixels, selectedPixels, GRID_SIZE]);

  const getCanvasCoordinates = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left - pan.x) / zoom;
    const y = (clientY - rect.top - pan.y) / zoom;
    
    return { 
      x: Math.max(0, Math.min(GRID_SIZE, x)), 
      y: Math.max(0, Math.min(GRID_SIZE, y)) 
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const coords = getCanvasCoordinates(e.clientX, e.clientY);
    
    if (e.shiftKey) {
      setIsSelecting(true);
      setSelectionStart(coords);
      setSelectedPixels([]); // Clear previous selection
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isSelecting) {
      const coords = getCanvasCoordinates(e.clientX, e.clientY);
      const selection = {
        x: Math.min(selectionStart.x, coords.x),
        y: Math.min(selectionStart.y, coords.y),
        width: Math.abs(coords.x - selectionStart.x),
        height: Math.abs(coords.y - selectionStart.y),
      };
      
      // Snap to 10-pixel grid
      const snappedSelection = {
        x: Math.floor(selection.x / 10) * 10,
        y: Math.floor(selection.y / 10) * 10,
        width: Math.ceil(selection.width / 10) * 10,
        height: Math.ceil(selection.height / 10) * 10,
      };

      if (snappedSelection.width > 0 && snappedSelection.height > 0) {
        setSelectedPixels([{
          id: 'temp',
          ...snappedSelection,
          sold: false,
        }]);
      }
    }
  };

  const handleMouseUp = () => {
    if (isSelecting && selectedPixels.length > 0) {
      onPixelSelect?.(selectedPixels);
    }
    setIsSelecting(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(1.0, Math.min(50, zoom * zoomFactor));
    
    // Get mouse position relative to canvas for pointer-centered zoom
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate world position at mouse cursor
    const worldX = (mouseX - pan.x) / zoom;
    const worldY = (mouseY - pan.y) / zoom;
    
    // Calculate new pan to keep world position under cursor
    const newPanX = mouseX - worldX * newZoom;
    const newPanY = mouseY - worldY * newZoom;
    
    // Apply clamping
    const clampedPan = clampPan(newZoom, newPanX, newPanY);
    
    setZoom(newZoom);
    setPan(clampedPan);
  };

  const centerView = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const centerX = container.clientWidth / 2;
    const centerY = container.clientHeight / 2;
    const gridCenterX = GRID_SIZE / 2;
    const gridCenterY = GRID_SIZE / 2;
    
    const newPanX = centerX - gridCenterX * zoom;
    const newPanY = centerY - gridCenterY * zoom;
    const clampedPan = clampPan(zoom, newPanX, newPanY);
    
    setPan(clampedPan);
  };

  const resetView = () => {
    setZoom(1.0);
    setSelectedPixels([]);
    if (containerRef.current) {
      const container = containerRef.current;
      const centerX = container.clientWidth / 2;
      const centerY = container.clientHeight / 2;
      const gridCenterX = GRID_SIZE / 2;
      const gridCenterY = GRID_SIZE / 2;
      
      const newPanX = centerX - gridCenterX * 1.0;
      const newPanY = centerY - gridCenterY * 1.0;
      const clampedPan = clampPan(1.0, newPanX, newPanY);
      
      setPan(clampedPan);
    }
  };

  const zoomToFit = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const fitZoom = Math.min(
      (container.clientWidth - PADDING.left - PADDING.right) / GRID_SIZE,
      (container.clientHeight - PADDING.top - PADDING.bottom) / GRID_SIZE
    ) * 0.9;
    
    setZoom(fitZoom);
    
    const centerX = container.clientWidth / 2;
    const centerY = container.clientHeight / 2;
    const gridCenterX = GRID_SIZE / 2;
    const gridCenterY = GRID_SIZE / 2;
    
    const newPanX = centerX - gridCenterX * fitZoom;
    const newPanY = centerY - gridCenterY * fitZoom;
    const clampedPan = clampPan(fitZoom, newPanX, newPanY);
    
    setPan(clampedPan);
  };

  // Initialize canvas size and center the grid using proper constraints
  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current && canvasRef.current) {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        
        setCanvasSize({
          width: container.clientWidth,
          height: container.clientHeight
        });
        
        // Center the grid with proper clamping
        const centerX = container.clientWidth / 2;
        const centerY = container.clientHeight / 2;
        const gridCenterX = GRID_SIZE / 2;
        const gridCenterY = GRID_SIZE / 2;
        
        const newPanX = centerX - gridCenterX * 1.0;
        const newPanY = centerY - gridCenterY * 1.0;
        const clampedPan = clampPan(1.0, newPanX, newPanY);
        
        setPan(clampedPan);
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [clampPan]);

  // Draw grid when dependencies change
  useEffect(() => {
    console.log("Dependencies changed, redrawing...");
    const timeoutId = setTimeout(() => drawGrid(), 10);
    return () => clearTimeout(timeoutId);
  }, [drawGrid]);

  return (
    <div className="flex flex-col" style={{ minHeight: `calc(100vh + ${Math.max(200, zoom * 300)}px)` }}>
      {/* Instructions at the very top */}
      <div className="bg-card/50 border-b border-border p-3">
        <div className="flex flex-wrap gap-6 items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div>
              <span><strong>Shift + Drag</strong> to select pixel areas for purchase</span>
            </div>
            <div>
              <span><strong>Scroll</strong> to zoom in/out (maintains center position)</span>
            </div>
          </div>
          <div className="text-muted-foreground">
            💡 Tip: Use "Fit" to see the entire grid, then zoom in to explore details
          </div>
        </div>
      </div>

    <Card className="flex-1 flex flex-col glass-card overflow-hidden rounded-t-none">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Square className="w-5 h-5 text-primary" />
          <span className="font-semibold">1,000 x 1,000 Pixel Grid</span>
          <span className="text-sm text-muted-foreground">
            Zoom: {Math.round(zoom * 100)}%
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const newZoom = Math.max(1.0, zoom * 0.8);
              if (containerRef.current) {
                const container = containerRef.current;
                const centerX = container.clientWidth / 2;
                const centerY = container.clientHeight / 2;
                const gridCenterX = GRID_SIZE / 2;
                const gridCenterY = GRID_SIZE / 2;
                
                const newPanX = centerX - gridCenterX * newZoom;
                const newPanY = centerY - gridCenterY * newZoom;
                const clampedPan = clampPan(newZoom, newPanX, newPanY);
                
                setPan(clampedPan);
              }
              setZoom(newZoom);
            }}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const newZoom = Math.min(50, zoom * 1.25);
              if (containerRef.current) {
                const container = containerRef.current;
                const centerX = container.clientWidth / 2;
                const centerY = container.clientHeight / 2;
                const gridCenterX = GRID_SIZE / 2;
                const gridCenterY = GRID_SIZE / 2;
                
                const newPanX = centerX - gridCenterX * newZoom;
                const newPanY = centerY - gridCenterY * newZoom;
                const clampedPan = clampPan(newZoom, newPanX, newPanY);
                
                setPan(clampedPan);
              }
              setZoom(newZoom);
            }}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={zoomToFit}>
            Fit
          </Button>
          <Button variant="ghost" size="sm" onClick={resetView}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="flex-1 relative overflow-auto bg-slate-900"
        style={{ minHeight: 'calc(100vh - 120px)' }}
      >
        <canvas
          ref={canvasRef}
          className="absolute left-0 right-0 top-0 bottom-0"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          style={{ 
            width: '100%',
            height: '100%',
            imageRendering: 'pixelated',
            cursor: isSelecting ? 'crosshair' : 'default'
          }}
        />
        
        {/* Stats overlay - moved to bottom right */}
        <div className="absolute bottom-4 right-4 glass-card p-3">
          <div className="text-sm space-y-1">
            <div className="font-semibold">Grid Stats</div>
            <div>Total Pixels: <span className="font-mono text-primary">1,000,000</span></div>
            <div>Sold: <span className="font-mono text-blue-400">{soldPixels.length}</span></div>
            <div>Available: <span className="font-mono text-green-400">999,997</span></div>
            {selectedPixels.length > 0 && (
              <div className="border-t border-border pt-1 mt-2">
                <div>Selected: <span className="font-mono text-accent">
                  {selectedPixels.reduce((sum, p) => sum + (p.width * p.height), 0).toLocaleString()}
                </span></div>
              </div>
            )}
          </div>
        </div>

        {/* Zoom indicator - moved to bottom left */}
        <div className="absolute bottom-4 left-4 glass-card p-2">
          <div className="text-xs text-muted-foreground">
            Zoom: <span className="font-mono text-primary">{Math.round(zoom * 100)}%</span>
          </div>
        </div>
      </div>
    </Card>
    </div>
  );
};