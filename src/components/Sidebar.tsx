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
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SidebarProps {
  selectedPixels: any[];
  onTestImage: (imageData: { imageUrl: string; url: string; alt: string }) => void;
}

export const Sidebar = ({ selectedPixels, onTestImage }: SidebarProps) => {
  const [formData, setFormData] = useState({
    url: '',
    imageUrl: '',
    alt: '',
    email: ''
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { toast } = useToast();

  const pixelCount = selectedPixels.reduce((sum, pixel) => 
    sum + (pixel.width * pixel.height), 0
  );
  const price = pixelCount * 1; // $1 per pixel

  const handlePurchase = async () => {
    if (!formData.email || !formData.imageUrl || !formData.url || !formData.alt) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before purchasing.",
        variant: "destructive",
      });
      return;
    }

    if (pixelCount < 100) {
      toast({
        title: "Minimum Purchase",
        description: "Minimum purchase is 100 pixels ($100).",
        variant: "destructive",
      });
      return;
    }

    setIsProcessingPayment(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          email: formData.email,
          imageUrl: formData.imageUrl,
          url: formData.url,
          alt: formData.alt,
          pixels: selectedPixels
        }
      });

      if (error) throw error;

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
        toast({
          title: "Payment Started",
          description: "Complete your payment in the new tab to secure your pixels.",
        });
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: error.message || "Failed to start payment process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

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
              The Million Dollar Homepage 2025
            </h1>
            <p className="text-sm text-muted-foreground">20th Anniversary Edition - 1 Million Pixels Available</p>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-sm leading-relaxed text-foreground/90">
            Twenty years ago, a simple idea changed internet history. Now, as digital landscapes evolve at lightning speed, 
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

        {/* Selection Info or Purchase Form */}
        {selectedPixels.length > 0 ? (
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-accent" />
                <span className="font-semibold">Purchase Pixels</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div>Selected: <span className="font-mono">{pixelCount.toLocaleString()}</span></div>
                <div>Total: <span className="font-mono text-accent">${price.toFixed(2)}</span></div>
              </div>
            </div>

            {/* Purchase Form */}
            <Card className="p-4 glass-card">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="imageUpload">Upload Image</Label>
                  <Input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          setFormData(prev => ({ 
                            ...prev, 
                            imageUrl: event.target?.result as string 
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {formData.imageUrl && (
                    <div className="mt-2">
                      <img 
                        src={formData.imageUrl} 
                        alt="Preview" 
                        className="w-20 h-20 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="url">Website URL (optional)</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://your-website.com"
                    value={formData.url}
                    onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alt">Alt Text</Label>
                  <Input
                    id="alt"
                    placeholder="Describe your image"
                    value={formData.alt}
                    onChange={(e) => setFormData(prev => ({ ...prev, alt: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your-email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <Button 
                  variant="outline"
                  onClick={() => {
                    if (formData.imageUrl) {
                      onTestImage({
                        imageUrl: formData.imageUrl,
                        url: formData.url,
                        alt: formData.alt || 'Test image'
                      });
                    }
                  }}
                  disabled={!formData.imageUrl}
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Test Image
                </Button>
                <Button 
                  className="glow-button"
                  onClick={handlePurchase}
                  disabled={isProcessingPayment || !formData.email || !formData.imageUrl || !formData.alt}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {isProcessingPayment ? "Processing..." : `Purchase for $${price.toFixed(2)}`}
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ImageIcon className="w-4 h-4" />
              <span>Hold Shift and drag to select pixel areas • Minimum 100 pixels ($100)</span>
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