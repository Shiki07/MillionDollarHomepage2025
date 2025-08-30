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
  alt?: string;
  sold: boolean;
}

interface PixelGridProps {
  onPixelSelect?: (pixels: PixelData[]) => void;
  soldPixelsWithContent?: PixelData[];
}

export const PixelGrid = ({ onPixelSelect, soldPixelsWithContent = [] }: PixelGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1.0); // Start at 100% zoom
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 });
  const [selectedPixels, setSelectedPixels] = useState<PixelData[]>([]);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [loadedImages, setLoadedImages] = useState<Map<string, HTMLImageElement>>(new Map());

  // Sample sold pixels for demo - now using soldPixelsWithContent prop
  const soldPixels = soldPixelsWithContent;

  // Load images for sold pixels
  useEffect(() => {
    const imageMap = new Map<string, HTMLImageElement>();
    
    soldPixels.forEach(pixel => {
      if (pixel.imageUrl && !loadedImages.has(pixel.id)) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          imageMap.set(pixel.id, img);
          setLoadedImages(prev => new Map(prev).set(pixel.id, img));
        };
        img.onerror = () => {
          console.warn(`Failed to load image for pixel ${pixel.id}`);
        };
        img.src = pixel.imageUrl;
      }
    });
  }, [soldPixels, loadedImages]);

  // Resize image to fit pixel area
  const resizeImageToFit = (img: HTMLImageElement, width: number, height: number) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return img;

    canvas.width = width;
    canvas.height = height;

    // Calculate aspect ratios
    const imgAspectRatio = img.width / img.height;
    const targetAspectRatio = width / height;

    let drawWidth, drawHeight, drawX, drawY;

    if (imgAspectRatio > targetAspectRatio) {
      // Image is wider than target
      drawWidth = width;
      drawHeight = width / imgAspectRatio;
      drawX = 0;
      drawY = (height - drawHeight) / 2;
    } else {
      // Image is taller than target
      drawHeight = height;
      drawWidth = height * imgAspectRatio;
      drawX = (width - drawWidth) / 2;
      drawY = 0;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    
    const resizedImg = new Image();
    resizedImg.src = canvas.toDataURL();
    return resizedImg;
  };

  const GRID_SIZE = 1000;
  const PIXEL_SIZE = 1;

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

    // Ensure canvas drawing buffer matches CSS size to prevent stretching
    const container = containerRef.current;
    if (container) {
      const desiredWidth = container.clientWidth;
      const desiredHeight = container.clientHeight;
      if (canvas.width !== desiredWidth || canvas.height !== desiredHeight) {
        canvas.width = desiredWidth;
        canvas.height = desiredHeight;
      }
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

    // Draw sold pixels with images or fallback color
    soldPixels.forEach(pixel => {
      const loadedImg = loadedImages.get(pixel.id);
      
      if (loadedImg && pixel.imageUrl) {
        // Draw the image, resized to fit the pixel area
        ctx.drawImage(loadedImg, pixel.x, pixel.y, pixel.width, pixel.height);
      } else {
        // Fallback to colored rectangle
        ctx.fillStyle = '#6b7280'; // Gray for sold pixels
        ctx.fillRect(pixel.x, pixel.y, pixel.width, pixel.height);
      }
      
      // Add border to sold pixels
      ctx.strokeStyle = '#9ca3af';
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
    
    // Check if clicking on a sold pixel with a URL
    const clickedPixel = soldPixels.find(pixel => 
      coords.x >= pixel.x && 
      coords.x <= pixel.x + pixel.width &&
      coords.y >= pixel.y && 
      coords.y <= pixel.y + pixel.height
    );
    
    if (clickedPixel && clickedPixel.url && !e.shiftKey) {
      // Open URL in new tab
      window.open(clickedPixel.url, '_blank');
      return;
    }
    
    if (e.shiftKey) {
      setIsSelecting(true);
      setSelectionStart(coords);
      setSelectedPixels([]); // Clear previous selection
    } else {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    } else if (isSelecting) {
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
    setIsDragging(false);
    setIsSelecting(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(1.0, Math.min(50, zoom * zoomFactor)); // Minimum 100% zoom
    
    if (newZoom !== zoom && containerRef.current) {
      const container = containerRef.current;
      // Center horizontally, anchor at top
      const newPanX = (container.clientWidth - GRID_SIZE * newZoom) / 2;
      const newPanY = Math.max(0, pan.y); // Keep top position, don't go negative
      
      setPan({ x: newPanX, y: newPanY });
    }
    
    setZoom(newZoom);
  };

  const resetView = () => {
    setZoom(1.0);
    setPan({ x: 0, y: 0 });
    setSelectedPixels([]);
  };

  const zoomToFit = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const fitZoom = Math.min(
      container.clientWidth / GRID_SIZE,
      container.clientHeight / GRID_SIZE
    ) * 0.9;
    const finalZoom = Math.max(1.0, fitZoom); // Minimum 100% zoom
    setZoom(finalZoom);
    setPan({ 
      x: (container.clientWidth - GRID_SIZE * finalZoom) / 2,
      y: (container.clientHeight - GRID_SIZE * finalZoom) / 2
    });
  };

  // Initialize canvas size
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
        
        console.log("Canvas size updated:", canvas.width, "x", canvas.height);
        
        // Auto-fit the grid on initial load only
        if (zoom === 1.0 && pan.x === 0 && pan.y === 0) {
          const fitZoom = Math.min(
            container.clientWidth / GRID_SIZE,
            container.clientHeight / GRID_SIZE
          ) * 0.9;
          const finalZoom = Math.max(1.0, fitZoom);
          setZoom(finalZoom);
          setPan({ 
            x: (container.clientWidth - GRID_SIZE * finalZoom) / 2,
            y: (container.clientHeight - GRID_SIZE * finalZoom) / 2
          });
        }
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []); // Remove drawGrid dependency

  // Draw grid when dependencies change - throttled to prevent excessive rendering
  useEffect(() => {
    const timeoutId = setTimeout(() => drawGrid(), 16); // ~60fps throttling
    return () => clearTimeout(timeoutId);
  }, [drawGrid]);

  return (
    <div className="flex flex-col h-full">
      {/* Instructions at the very top */}
      <div className="bg-card/50 border-b border-border p-3">
        <div className="flex flex-wrap gap-6 items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Move className="w-3 h-3 text-muted-foreground" />
              <span><strong>Drag</strong> to pan around the 1,000x1,000 canvas</span>
            </div>
            <div>
              <span><strong>Shift + Drag</strong> to select pixel areas for purchase</span>
            </div>
            <div>
              <span><strong>Scroll</strong> to zoom in/out</span>
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
            onClick={() => setZoom(Math.max(1.0, zoom * 0.8))}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setZoom(Math.min(50, zoom * 1.25))}
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
        style={{ 
          minHeight: Math.max(400, (GRID_SIZE * zoom) + 100) + 'px',
          height: Math.max(400, (GRID_SIZE * zoom) + 100) + 'px'
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          style={{ 
            width: '100%', 
            height: '100%',
            imageRendering: 'pixelated',
            cursor: isDragging ? 'grabbing' : isSelecting ? 'crosshair' : 'grab'
          }}
        />
        
        {/* Stats overlay - moved to bottom right */}
        <div className="absolute bottom-4 right-4 glass-card p-3">
          <div className="text-sm space-y-1">
            <div className="font-semibold">Grid Stats</div>
            <div>Total Pixels: <span className="font-mono text-primary">1,000,000</span></div>
            <div>Sold: <span className="font-mono text-muted-foreground">{soldPixels.length}</span></div>
            <div>Available: <span className="font-mono text-green-400">1,000,000</span></div>
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