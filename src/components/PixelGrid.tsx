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
  const [zoom, setZoom] = useState(0.1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 });
  const [selectedPixels, setSelectedPixels] = useState<PixelData[]>([]);
  const [soldPixels] = useState<PixelData[]>([
    // Sample sold pixels for demo
    { id: '1', x: 100, y: 100, width: 100, height: 100, sold: true, owner: 'Demo User' },
    { id: '2', x: 300, y: 200, width: 50, height: 50, sold: true, owner: 'Test Corp' },
  ]);

  const GRID_SIZE = 10000;
  const PIXEL_SIZE = 1;

  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set transform
    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    // Draw background
    ctx.fillStyle = 'hsl(220, 27%, 6%)';
    ctx.fillRect(0, 0, GRID_SIZE, GRID_SIZE);

    // Draw grid lines (only when zoomed in enough)
    if (zoom > 0.5) {
      ctx.strokeStyle = 'hsl(220, 27%, 16%)';
      ctx.lineWidth = 1 / zoom;
      
      for (let x = 0; x <= GRID_SIZE; x += 10) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, GRID_SIZE);
        ctx.stroke();
      }
      
      for (let y = 0; y <= GRID_SIZE; y += 10) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(GRID_SIZE, y);
        ctx.stroke();
      }
    }

    // Draw sold pixels
    soldPixels.forEach(pixel => {
      ctx.fillStyle = 'hsl(217, 91%, 60%)';
      ctx.fillRect(pixel.x, pixel.y, pixel.width, pixel.height);
    });

    // Draw selected pixels
    selectedPixels.forEach(pixel => {
      ctx.fillStyle = 'hsl(142, 76%, 36%)';
      ctx.fillRect(pixel.x, pixel.y, pixel.width, pixel.height);
      
      // Add border
      ctx.strokeStyle = 'hsl(142, 76%, 46%)';
      ctx.lineWidth = 2 / zoom;
      ctx.strokeRect(pixel.x, pixel.y, pixel.width, pixel.height);
    });

    ctx.restore();
  }, [zoom, pan, soldPixels, selectedPixels]);

  const getCanvasCoordinates = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left - pan.x) / zoom;
    const y = (clientY - rect.top - pan.y) / zoom;
    
    return { x: Math.max(0, Math.min(GRID_SIZE, x)), y: Math.max(0, Math.min(GRID_SIZE, y)) };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const coords = getCanvasCoordinates(e.clientX, e.clientY);
    
    if (e.shiftKey) {
      // Start selection
      setIsSelecting(true);
      setSelectionStart(coords);
    } else {
      // Start panning
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
      
      // Snap to grid
      const snappedSelection = {
        x: Math.floor(selection.x / 10) * 10,
        y: Math.floor(selection.y / 10) * 10,
        width: Math.ceil(selection.width / 10) * 10,
        height: Math.ceil(selection.height / 10) * 10,
      };

      setSelectedPixels([{
        id: 'temp',
        ...snappedSelection,
        sold: false,
      }]);
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
    const newZoom = Math.max(0.05, Math.min(5, zoom + (e.deltaY > 0 ? -0.1 : 0.1)));
    setZoom(newZoom);
  };

  const resetView = () => {
    setZoom(0.1);
    setPan({ x: 0, y: 0 });
  };

  useEffect(() => {
    drawGrid();
  }, [drawGrid]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const updateCanvasSize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      drawGrid();
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [drawGrid]);

  return (
    <Card className="flex-1 flex flex-col glass-card overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Square className="w-5 h-5 text-primary" />
          <span className="font-semibold">10,000 x 10,000 Pixel Grid</span>
          <span className="text-sm text-muted-foreground">
            Zoom: {Math.round(zoom * 100)}%
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setZoom(Math.max(0.05, zoom - 0.1))}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setZoom(Math.min(5, zoom + 0.1))}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={resetView}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="flex-1 relative overflow-hidden cursor-move"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onWheel={handleWheel}
        />
        
        {/* Instructions overlay */}
        <div className="absolute top-4 left-4 glass-card p-3">
          <div className="text-sm space-y-1">
            <div className="flex items-center gap-2">
              <Move className="w-3 h-3" />
              <span>Drag to pan</span>
            </div>
            <div>
              <span className="font-mono bg-muted px-1 rounded">Shift + Click</span> to select pixels
            </div>
            <div>Scroll to zoom</div>
          </div>
        </div>

        {/* Stats overlay */}
        <div className="absolute bottom-4 right-4 glass-card p-3">
          <div className="text-sm space-y-1">
            <div>Total Pixels: <span className="font-mono">100,000,000</span></div>
            <div>Sold: <span className="font-mono text-primary">2</span></div>
            <div>Available: <span className="font-mono text-accent">99,999,998</span></div>
          </div>
        </div>
      </div>
    </Card>
  );
};