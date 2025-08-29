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
  const [isPanning, setIsPanning] = useState(false);

  // Sample sold pixels for demo
  const [soldPixels] = useState<PixelData[]>([
    { id: '1', x: 100, y: 100, width: 200, height: 200, sold: true, owner: 'Demo User' },
    { id: '2', x: 300, y: 200, width: 100, height: 100, sold: true, owner: 'Test Corp' },
    { id: '3', x: 500, y: 500, width: 200, height: 150, sold: true, owner: 'Big Brand' },
  ]);

  const GRID_SIZE = 1000;
  const PIXEL_SIZE = 1;
  const TOP_PADDING = 30; // Space between instructions and grid
  const BOTTOM_PADDING = 60; // Space at bottom of viewport (increased for pan control)

  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log("Canvas not found");
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.log("Context not found");
      return;
    }

  console.log("Drawing grid with zoom:", zoom, "pan:", pan);

    // Clear canvas with visible background color
    ctx.fillStyle = '#1e293b'; // Slate-800 background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
      // Add border to sold pixels (removed fill so images can show through)
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
    console.log("Grid drawn successfully");
  }, [zoom, pan, soldPixels, selectedPixels]);

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
    setIsPanning(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(1.0, Math.min(50, zoom * zoomFactor));
    
    if (!containerRef.current) {
      setZoom(newZoom);
      return;
    }
    
    const container = containerRef.current;
    const centerX = container.clientWidth / 2;
    const centerY = container.clientHeight / 2;
    
    // Calculate the grid center point in canvas coordinates
    const gridCenterX = GRID_SIZE / 2;
    const gridCenterY = GRID_SIZE / 2;
    
    // Calculate new pan to keep the grid centered during zoom, but constrain top and bottom
    const idealPanY = centerY - gridCenterY * newZoom;
    const minPanY = TOP_PADDING; // Keep space between instructions and grid
    const maxPanY = container.clientHeight - BOTTOM_PADDING - GRID_SIZE * newZoom; // Keep space at bottom
    
    const newPan = {
      x: centerX - gridCenterX * newZoom,
      y: Math.max(minPanY, Math.min(maxPanY, idealPanY))
    };
    
    setZoom(newZoom);
    setPan(newPan);
  };

  const centerView = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    setPan({ 
      x: (container.clientWidth - GRID_SIZE * zoom) / 2,
      y: (container.clientHeight - GRID_SIZE * zoom) / 2
    });
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
      
      const idealPanY = centerY - gridCenterY * 1.0;
      const minPanY = TOP_PADDING;
      const maxPanY = container.clientHeight - BOTTOM_PADDING - GRID_SIZE * 1.0;
      
      setPan({ 
        x: centerX - gridCenterX * 1.0,
        y: Math.max(minPanY, Math.min(maxPanY, idealPanY))
      });
    }
  };

  const zoomToFit = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const fitZoom = Math.min(
      container.clientWidth / GRID_SIZE,
      container.clientHeight / GRID_SIZE
    ) * 0.9;
    
    // Set zoom to 100% but use centered positioning with top constraint
    setZoom(1.0);
    
    const centerX = container.clientWidth / 2;
    const centerY = container.clientHeight / 2;
    const gridCenterX = GRID_SIZE / 2;
    const gridCenterY = GRID_SIZE / 2;
    
    const idealPanY = centerY - gridCenterY * 1.0;
    const minPanY = Math.max(TOP_PADDING, (container.clientHeight - GRID_SIZE * fitZoom) / 2);
    const maxPanY = container.clientHeight - BOTTOM_PADDING - GRID_SIZE * 1.0;
    
    setPan({ 
      x: centerX - gridCenterX * 1.0,
      y: Math.max(minPanY, Math.min(maxPanY, idealPanY))
    });
  };

  // Initialize canvas size and center the grid using proper constraints
  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current && canvasRef.current) {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        
        setCanvasSize({
          width: container.clientWidth,
          height: container.clientHeight
        });
        
        // Center the grid with top constraint
        const centerX = container.clientWidth / 2;
        const centerY = container.clientHeight / 2;
        const gridCenterX = GRID_SIZE / 2;
        const gridCenterY = GRID_SIZE / 2;
        
        const idealPanY = centerY - gridCenterY * 1.0;
        const minPanY = TOP_PADDING;
        const maxPanY = container.clientHeight - BOTTOM_PADDING - GRID_SIZE * 1.0;
        
        setPan({
          x: centerX - gridCenterX * 1.0,
          y: Math.max(minPanY, Math.min(maxPanY, idealPanY))
        });
        
        console.log("Canvas size updated:", canvas.width, "x", canvas.height);
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  // Handle pan control
  const handlePanControlMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPanning(true);
  };

  const handlePanControlMouseMove = (e: React.MouseEvent) => {
    if (!isPanning || !containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    
    // Calculate the pan position based on mouse position
    const panControlWidth = container.clientWidth - 40; // Account for padding
    const progress = Math.max(0, Math.min(1, mouseX / panControlWidth));
    
    // Calculate the range of possible pan values
    const gridWidth = GRID_SIZE * zoom;
    const maxPanX = container.clientWidth - gridWidth;
    const minPanX = 0;
    
    if (gridWidth > container.clientWidth) {
      const newPanX = maxPanX + progress * (minPanX - maxPanX);
      setPan(prev => ({ ...prev, x: newPanX }));
    }
  };

  // Calculate if pan control should be visible
  const shouldShowPanControl = zoom > 1 && containerRef.current && GRID_SIZE * zoom > containerRef.current.clientWidth;

  // Calculate pan control position
  const getPanControlPosition = () => {
    if (!containerRef.current) return 0;
    const container = containerRef.current;
    const gridWidth = GRID_SIZE * zoom;
    const maxPanX = container.clientWidth - gridWidth;
    const minPanX = 0;
    
    if (gridWidth <= container.clientWidth) return 0;
    
    const progress = (pan.x - maxPanX) / (minPanX - maxPanX);
    return Math.max(0, Math.min(1, progress)) * (container.clientWidth - 60); // Account for padding and thumb width
  };

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
                
                const idealPanY = centerY - gridCenterY * newZoom;
                const minPanY = TOP_PADDING;
                const maxPanY = container.clientHeight - BOTTOM_PADDING - GRID_SIZE * newZoom;
                
                setPan({
                  x: centerX - gridCenterX * newZoom,
                  y: Math.max(minPanY, Math.min(maxPanY, idealPanY))
                });
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
                
                const idealPanY = centerY - gridCenterY * newZoom;
                const minPanY = TOP_PADDING;
                const maxPanY = container.clientHeight - BOTTOM_PADDING - GRID_SIZE * newZoom;
                
                setPan({
                  x: centerX - gridCenterX * newZoom,
                  y: Math.max(minPanY, Math.min(maxPanY, idealPanY))
                });
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
        className="flex-1 relative overflow-hidden bg-slate-900"
        style={{ minHeight: 'calc(100vh - 120px)' }}
      >
        <canvas
          ref={canvasRef}
          className="absolute left-0 right-0 top-0"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          style={{ 
            width: '100%',
            bottom: BOTTOM_PADDING,
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

        {/* Pan control bar - only visible when zoomed in */}
        {shouldShowPanControl && (
          <div className="absolute bottom-0 left-0 right-0 h-8 flex items-center justify-center bg-card/80 backdrop-blur-sm border-t border-border">
            <div 
              className="relative w-full max-w-4xl h-2 bg-muted rounded-full mx-5 cursor-pointer"
              onMouseDown={handlePanControlMouseDown}
              onMouseMove={handlePanControlMouseMove}
              onMouseUp={() => setIsPanning(false)}
              onMouseLeave={() => setIsPanning(false)}
            >
              <div 
                className="absolute top-0 h-full w-8 bg-primary rounded-full transition-all duration-75 cursor-grab active:cursor-grabbing"
                style={{ 
                  left: `${getPanControlPosition()}px`,
                  transform: 'translateX(-50%)'
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Card>
    </div>
  );
};