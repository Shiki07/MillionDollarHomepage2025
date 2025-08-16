import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Wallet, 
  ImageIcon, 
  CreditCard, 
  ShoppingCart,
  User,
  DollarSign,
  BarChart3
} from "lucide-react";

interface SidebarProps {
  selectedPixels: any[];
}

export const Sidebar = ({ selectedPixels }: SidebarProps) => {
  const [formData, setFormData] = useState({
    url: '',
    imageUrl: '',
    alt: '',
    email: ''
  });

  const pixelCount = selectedPixels.reduce((sum, pixel) => 
    sum + (pixel.width * pixel.height), 0
  );
  const price = pixelCount * 0.01; // $0.01 per pixel

  return (
    <div className="w-full border-b border-border bg-card/50 p-3 space-y-4">
      {/* Title and Description */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              The Million Dollar Homepage 2.0
            </h1>
            <p className="text-sm text-muted-foreground">20th Anniversary Edition - 100 Million Pixels Available</p>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-sm leading-relaxed text-foreground/90">
            Twenty years ago, a simple idea changed internet history. Now, as digital landscapes evolve at breakneck speed, 
            <span className="font-semibold text-primary"> your company deserves more than fleeting social media posts</span>. 
            This is your chance to claim permanent digital real estate on the world's most iconic pixel canvas. 
            Whether you're a startup seeking that breakthrough moment, an established brand wanting to make a bold statement, 
            or simply someone who believes in leaving a lasting mark on internet history - 
            <span className="font-semibold text-accent"> this is your testament to existence in the digital age</span>.
            Own a piece of internet legacy that will outlast trends, algorithms, and platforms.
          </p>
        </div>
      </div>

      {/* Stats and Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">0</div>
            <div className="text-xs text-muted-foreground">Pixels Sold</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-accent">$0.00</div>
            <div className="text-xs text-muted-foreground">Revenue</div>
          </div>
        </div>

        {/* Selection Info or Quick Actions */}
        {selectedPixels.length > 0 ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-accent" />
              <span className="font-semibold">Purchase Pixels</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div>Selected: <span className="font-mono">{pixelCount.toLocaleString()}</span></div>
              <div>Total: <span className="font-mono text-accent">${price.toFixed(2)}</span></div>
            </div>
            <Button className="glow-button">
              <CreditCard className="w-4 h-4 mr-2" />
              Purchase for ${price.toFixed(2)}
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ImageIcon className="w-4 h-4" />
              <span>Hold Shift and drag to select pixel areas • Minimum 10x10 pixels ($1)</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                My Pixels
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};