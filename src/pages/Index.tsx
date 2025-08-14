import { useState } from "react";
import { PixelGrid } from "@/components/PixelGrid";
import { Sidebar } from "@/components/Sidebar";

const Index = () => {
  const [selectedPixels, setSelectedPixels] = useState([]);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar selectedPixels={selectedPixels} />
      <div className="flex-1 p-4">
        <PixelGrid onPixelSelect={setSelectedPixels} />
      </div>
    </div>
  );
};

export default Index;
