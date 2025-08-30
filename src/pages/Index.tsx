import { useState } from "react";
import { PixelGrid } from "@/components/PixelGrid";
import { Sidebar } from "@/components/Sidebar";

const Index = () => {
  const [selectedPixels, setSelectedPixels] = useState([]);
  
  // Sample sold pixels with content for demonstration
  const [soldPixelsWithContent] = useState([
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Sidebar selectedPixels={selectedPixels} />
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
