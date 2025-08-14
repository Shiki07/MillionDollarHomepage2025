import { useState } from "react";
import { PixelGrid } from "@/components/PixelGrid";
import { Sidebar } from "@/components/Sidebar";

const Index = () => {
  const [selectedPixels, setSelectedPixels] = useState([]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Sidebar selectedPixels={selectedPixels} />
      <div className="flex-1 p-1 min-h-0">
        <PixelGrid onPixelSelect={setSelectedPixels} />
      </div>
    </div>
  );
};

export default Index;
