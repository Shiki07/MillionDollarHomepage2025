import { useState } from "react";
import { PixelGrid } from "@/components/PixelGrid";
import { Sidebar } from "@/components/Sidebar";

const Index = () => {
  const [selectedPixels, setSelectedPixels] = useState([]);
  
  // Sample sold pixels with content for demonstration
  const [soldPixelsWithContent, setSoldPixelsWithContent] = useState([
    {
      id: "demo1",
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      imageUrl: "/placeholder.svg",
      url: "https://lovable.dev",
      alt: "Lovable Logo",
      sold: true,
      owner: "demo-user"
    },
    {
      id: "demo2", 
      x: 250,
      y: 150,
      width: 80,
      height: 60,
      imageUrl: "/placeholder.svg",
      url: "https://github.com",
      alt: "GitHub",
      sold: true,
      owner: "demo-user2"
    }
  ]);

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
    
    setSoldPixelsWithContent(prev => [...prev, testPixel]);
    setSelectedPixels([]);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Sidebar selectedPixels={selectedPixels} onTestImage={handleTestImage} />
      <div className="flex-1 p-1 min-h-0">
        <PixelGrid 
          onPixelSelect={setSelectedPixels} 
          soldPixelsWithContent={soldPixelsWithContent}
        />
      </div>
    </div>
  );
};

export default Index;
