import { useState } from "react";
import { PixelGrid } from "@/components/PixelGrid";
import { Sidebar } from "@/components/Sidebar";

const Index = () => {
  const [selectedPixels, setSelectedPixels] = useState([]);
  
// Empty sold pixels - no demo content
const [soldPixelsWithContent, setSoldPixelsWithContent] = useState([]);
const [clearSelectionKey, setClearSelectionKey] = useState(0);

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
    
// Add the test pixel and immediately clear selection to show the image
setSoldPixelsWithContent(prev => [...prev, testPixel]);
setSelectedPixels([]);
setClearSelectionKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Sidebar selectedPixels={selectedPixels} onTestImage={handleTestImage} />
      <div className="flex-1 p-1 min-h-0">
        <PixelGrid 
          onPixelSelect={setSelectedPixels} 
          soldPixelsWithContent={soldPixelsWithContent}
          clearSelectionKey={clearSelectionKey}
        />
      </div>
    </div>
  );
};

export default Index;
