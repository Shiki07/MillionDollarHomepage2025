import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MousePointer, 
  CreditCard, 
  Upload, 
  Eye, 
  CheckCircle,
  ArrowRight,
  Grid3X3,
  DollarSign,
  Globe
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: MousePointer,
      title: "Select Your Pixels",
      description: "Click and drag on the 1000×1000 pixel canvas to select the area you want to purchase. Each pixel costs exactly $1.",
      details: "Choose any available space on the grid. Pixels are sold in rectangular blocks with a minimum size of 10×10 pixels ($100)."
    },
    {
      icon: Upload,
      title: "Upload Your Content",
      description: "Upload your image, logo, or pixel art. Add your website URL and alt text for accessibility and SEO.",
      details: "Supported formats: PNG, JPEG, GIF. Images are automatically resized to fit your selected pixel area."
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description: "Complete your purchase with our secure Stripe payment system. Pay only for the pixels you select.",
      details: "We accept all major credit cards and digital payment methods. All transactions are secured with SSL encryption."
    },
    {
      icon: CheckCircle,
      title: "Instant Publication",
      description: "Your content appears immediately on the canvas after payment confirmation. No waiting period.",
      details: "Your pixel advertisement becomes part of internet history, visible to visitors from around the world."
    }
  ];

  const features = [
    {
      icon: Grid3X3,
      title: "1 Million Pixels",
      description: "Massive 1000×1000 pixel canvas with exactly 1,000,000 pixels available for purchase."
    },
    {
      icon: DollarSign,
      title: "$1 Per Pixel",
      description: "Simple, transparent pricing. Each pixel costs exactly $1 with no hidden fees or subscriptions."
    },
    {
      icon: Globe,
      title: "Permanent Display",
      description: "Your content stays on the canvas forever. No recurring fees or time limits."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Million Dollar Homepage 2025</h1>
          <Button variant="outline" asChild>
            <a href="/">Back to Canvas</a>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">Step by Step Guide</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            How It Works
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Buying pixels on the Million Dollar Homepage 2025 is simple and straightforward. 
            Follow these four easy steps to own your piece of internet history.
          </p>
        </section>

        {/* Steps Section */}
        <section className="mb-16">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 md:w-1/3">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-white/20 p-3 rounded-full">
                          <step.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-white/70 text-sm font-semibold">
                          STEP {index + 1}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                      <div className="h-1 w-16 bg-white/30 rounded"></div>
                    </div>
                    <div className="p-8 md:w-2/3">
                      <p className="text-slate-300 text-lg mb-4">{step.description}</p>
                      <p className="text-slate-400">{step.details}</p>
                      {index < steps.length - 1 && (
                        <div className="flex justify-end mt-6">
                          <ArrowRight className="h-5 w-5 text-slate-500" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 text-center">
                <CardHeader>
                  <div className="mx-auto bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-full w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Technical Details */}
        <section className="mb-16">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Technical Specifications</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-2">Canvas Specifications</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Total canvas size: 1000×1000 pixels</li>
                    <li>• Total available pixels: 1,000,000</li>
                    <li>• Minimum purchase: 10×10 pixels (100 pixels)</li>
                    <li>• Maximum purchase: No limit (subject to availability)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Image Requirements</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Supported formats: PNG, JPEG, GIF</li>
                    <li>• Maximum file size: 5MB</li>
                    <li>• Images auto-resize to fit selected area</li>
                    <li>• Alt text required for accessibility</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Payment & Security</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Secure payments via Stripe</li>
                    <li>• All major credit cards accepted</li>
                    <li>• SSL encryption for all transactions</li>
                    <li>• Instant payment confirmation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Content Guidelines</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Family-friendly content only</li>
                    <li>• No offensive or illegal material</li>
                    <li>• Content subject to moderation</li>
                    <li>• Permanent display (no refunds)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ Preview */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-slate-700">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Have Questions?</h3>
              <p className="text-slate-300 mb-6">
                Check out our comprehensive FAQ section for answers to common questions 
                about pixel purchasing, payments, and technical requirements.
              </p>
              <Button variant="outline" asChild>
                <a href="/faq">View FAQ</a>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border-slate-600">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
              <p className="text-slate-300 mb-6">
                Join the digital revolution and own your piece of internet history today.
              </p>
              <Button size="lg" asChild>
                <a href="/">Start Selecting Pixels</a>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-800/50 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-slate-400">
          <p>&copy; 2025 Million Dollar Homepage 2025. Making internet history, one pixel at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default HowItWorks;