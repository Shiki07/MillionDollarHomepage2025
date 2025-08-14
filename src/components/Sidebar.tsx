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
    <div className="w-80 space-y-4 p-4">
      {/* Header */}
      <Card className="glass-card p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Pixel Marketplace</h1>
            <p className="text-sm text-muted-foreground">100M pixel canvas</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">2</div>
            <div className="text-xs text-muted-foreground">Pixels Sold</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">$20.00</div>
            <div className="text-xs text-muted-foreground">Revenue</div>
          </div>
        </div>
      </Card>

      {/* Selection Info */}
      {selectedPixels.length > 0 ? (
        <Card className="glass-card p-4 space-y-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-accent" />
            <h3 className="font-semibold">Purchase Pixels</h3>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Selected Pixels:</span>
              <span className="font-mono">{pixelCount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Price per pixel:</span>
              <span className="font-mono">$0.01</span>
            </div>
            <div className="flex justify-between font-semibold border-t border-border pt-2">
              <span>Total:</span>
              <span className="font-mono text-accent">${price.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <Label htmlFor="url">Target URL</Label>
              <Input
                id="url"
                placeholder="https://example.com"
                value={formData.url}
                onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                placeholder="https://example.com/image.png"
                value={formData.imageUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="alt">Alt Text</Label>
              <Input
                id="alt"
                placeholder="Description of your image"
                value={formData.alt}
                onChange={(e) => setFormData(prev => ({ ...prev, alt: e.target.value }))}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="mt-1"
              />
            </div>
          </div>

          <Button className="w-full glow-button">
            <CreditCard className="w-4 h-4 mr-2" />
            Purchase for ${price.toFixed(2)}
          </Button>
        </Card>
      ) : (
        <Card className="glass-card p-4">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-lg bg-muted flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Select Pixels</h3>
              <p className="text-sm text-muted-foreground">
                Hold Shift and click to select pixel areas for purchase
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <Card className="glass-card p-4 space-y-3">
        <h3 className="font-semibold flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          Quick Actions
        </h3>
        
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <User className="w-4 h-4 mr-2" />
            View My Pixels
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Wallet className="w-4 h-4 mr-2" />
            Browse Marketplace
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
        </div>
      </Card>

      {/* Pricing Info */}
      <Card className="glass-card p-4">
        <h3 className="font-semibold mb-3">Pricing</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Base price:</span>
            <span className="font-mono">$0.01/pixel</span>
          </div>
          <div className="flex justify-between">
            <span>Minimum purchase:</span>
            <span className="font-mono">100 pixels</span>
          </div>
          <div className="flex justify-between">
            <span>Maximum purchase:</span>
            <span className="font-mono">10,000 pixels</span>
          </div>
        </div>
      </Card>
    </div>
  );
};