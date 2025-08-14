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
    <div className="w-full border-b border-border bg-card/50 p-3">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        {/* Header Section */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Pixel Marketplace</h1>
            <p className="text-xs text-muted-foreground">10,000 x 10,000 pixel canvas</p>
          </div>
          <div className="flex gap-4 ml-4">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">3</div>
              <div className="text-xs text-muted-foreground">Pixels Sold</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-accent">$30.00</div>
              <div className="text-xs text-muted-foreground">Revenue</div>
            </div>
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
              <span>Hold Shift and drag to select pixel areas</span>
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