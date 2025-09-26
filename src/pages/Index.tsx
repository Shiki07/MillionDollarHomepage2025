import { useState, useEffect } from "react";
import { PixelGrid } from "@/components/PixelGrid";
import { Sidebar } from "@/components/Sidebar";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const Index = () => {
  const [selectedPixels, setSelectedPixels] = useState([]);
  const [soldPixelsWithContent, setSoldPixelsWithContent] = useState([]);
  const [clearSelectionKey, setClearSelectionKey] = useState(0);

  // Load sold pixels from database on component mount
  useEffect(() => {
    const loadSoldPixels = async () => {
      console.log('Starting to load sold pixels...');
      try {
        // Use secure function that only returns safe, non-sensitive data
        const { data: purchases, error } = await supabase
          .rpc('get_public_pixels');

        console.log('RPC call result:', { purchases, error });

        if (error) {
          console.error('Error loading sold pixels:', error);
          return;
        }

        if (purchases) {
          const soldPixels = purchases.map(purchase => {
            const pixels = purchase.pixels as any[];
            return {
              id: purchase.id,
              x: Math.min(...pixels.map((p: any) => p.x)),
              y: Math.min(...pixels.map((p: any) => p.y)),
              width: Math.max(...pixels.map((p: any) => p.x + p.width)) - Math.min(...pixels.map((p: any) => p.x)),
              height: Math.max(...pixels.map((p: any) => p.y + p.height)) - Math.min(...pixels.map((p: any) => p.y)),
              imageUrl: purchase.image_url,
              url: purchase.website_url,
              alt: purchase.alt_text,
              sold: true,
              owner: "Anonymous" // Never expose actual email addresses
            };
          });
          
          setSoldPixelsWithContent(soldPixels);
        }
      } catch (error) {
        console.error('Error loading sold pixels:', error);
      }
    };

    loadSoldPixels();
  }, []);

  const handleTestImage = (imageData: { imageUrl: string; url: string; alt: string }) => {
    if (selectedPixels.length === 0) return;
    
    // Create test pixel data from selected pixels
    const testPixel = {
      id: `test-${Date.now()}`,
      x: selectedPixels[0].x,
      y: selectedPixels[0].y,
      width: selectedPixels[selectedPixels.length - 1].x + selectedPixels[selectedPixels.length - 1].width - selectedPixels[0].x,
      height: selectedPixels[selectedPixels.length - 1].y + selectedPixels[selectedPixels.length - 1].height - selectedPixels[0].y,
      imageUrl: imageData.imageUrl,
      url: imageData.url,
      alt: imageData.alt,
      sold: true,
      owner: "test-user"
    };
    
    // Add the test pixel but keep selection active so form remains visible
    setSoldPixelsWithContent(prev => [...prev, testPixel]);
    setClearSelectionKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header role="banner">
        <Sidebar selectedPixels={selectedPixels} onTestImage={handleTestImage} />
      </header>
      <main role="main" className="flex-1 p-1 min-h-0">
        <section aria-label="Pixel canvas for purchasing digital advertising space">
          <PixelGrid 
            onPixelSelect={setSelectedPixels} 
            soldPixelsWithContent={soldPixelsWithContent}
            clearSelectionKey={clearSelectionKey}
          />
        </section>
      </main>
      <footer className="bg-muted/30 border-t border-border p-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-lg font-semibold mb-4 text-center">Explore More</h3>
          <nav className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors text-center py-2 px-3 rounded-md hover:bg-muted/50">
              About
            </Link>
            <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors text-center py-2 px-3 rounded-md hover:bg-muted/50">
              How It Works
            </Link>
            <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors text-center py-2 px-3 rounded-md hover:bg-muted/50">
              FAQ
            </Link>
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors text-center py-2 px-3 rounded-md hover:bg-muted/50">
              Pricing
            </Link>
            <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors text-center py-2 px-3 rounded-md hover:bg-muted/50">
              Blog
            </Link>
            <Link to="/pixel-history" className="text-muted-foreground hover:text-foreground transition-colors text-center py-2 px-3 rounded-md hover:bg-muted/50">
              Pixel History
            </Link>
            <Link to="/digital-advertising" className="text-muted-foreground hover:text-foreground transition-colors text-center py-2 px-3 rounded-md hover:bg-muted/50">
              Digital Advertising
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Index;
