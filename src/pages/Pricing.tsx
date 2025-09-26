import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Calculator, 
  Grid3X3, 
  Zap,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Users
} from "lucide-react";

const Pricing = () => {
  const pricingExamples = [
    {
      size: "10×10",
      pixels: 100,
      price: 100,
      description: "Perfect for small logos or simple graphics",
      popular: false
    },
    {
      size: "20×20",
      pixels: 400,
      price: 400,
      description: "Great for medium-sized advertisements",
      popular: true
    },
    {
      size: "50×50",
      pixels: 2500,
      price: 2500,
      description: "Ideal for detailed logos and branding",
      popular: false
    },
    {
      size: "100×100",
      pixels: 10000,
      price: 10000,
      description: "Premium space for major brand presence",
      popular: false
    }
  ];

  const features = [
    "Permanent pixel ownership",
    "Clickable links to your website",
    "Instant publication after payment",
    "No recurring fees or subscriptions",
    "SEO-friendly alt text support",
    "Global visibility and exposure",
    "Part of internet history",
    "Secure Stripe payment processing"
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      description: "No hidden fees, no surprises. Every pixel costs exactly $1 with no additional charges."
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Your advertisement goes live immediately after payment confirmation. No waiting periods."
    },
    {
      icon: TrendingUp,
      title: "Lasting Value",
      description: "Your investment becomes part of internet history with permanent display and no expiration."
    },
    {
      icon: Users,
      title: "Global Reach",
      description: "Reach visitors from around the world who come to see this legendary internet phenomenon."
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
          <Badge className="mb-4" variant="secondary">
            <DollarSign className="h-4 w-4 mr-2" />
            Simple, Transparent Pricing
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            $1 Per Pixel
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Our pricing is as simple as it gets. Every pixel costs exactly $1 with no hidden fees, 
            no subscriptions, and no complicated pricing tiers. What you see is what you pay.
          </p>
        </section>

        {/* Pricing Calculator */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-slate-700">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
                <Calculator className="h-6 w-6" />
                Pricing Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-white mb-2">
                  Width × Height = Total Cost
                </div>
                <div className="text-slate-300">
                  Simply multiply your desired width by height to get the total price
                </div>
              </div>
              
              <div className="bg-slate-800/50 p-6 rounded-lg mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-300 mb-2">
                    Example: 25 × 40 = 1,000 pixels = $1,000
                  </div>
                  <div className="text-slate-300">
                    A 25×40 pixel rectangle would cost exactly $1,000
                  </div>
                </div>
              </div>

              <div className="text-center text-slate-400">
                <p>Minimum purchase: 10×10 pixels ($100)</p>
                <p>Maximum purchase: Limited only by canvas availability</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Pricing Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Popular Sizes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingExamples.map((example, index) => (
              <Card 
                key={index} 
                className={`bg-slate-800/50 border-slate-700 relative ${
                  example.popular ? 'ring-2 ring-blue-500/50' : ''
                }`}
              >
                {example.popular && (
                  <Badge 
                    className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600"
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Grid3X3 className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-white">{example.size} pixels</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    ${example.price.toLocaleString()}
                  </div>
                  <div className="text-slate-400 text-sm mb-4">
                    {example.pixels.toLocaleString()} pixels
                  </div>
                  <p className="text-slate-300 text-sm">{example.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* What's Included */}
        <section className="mb-16">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white text-center">What's Included</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Value Proposition */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Why Choose Our Pixels?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 text-center">
                <CardHeader>
                  <div className="mx-auto bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-full w-fit mb-4">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Comparison */}
        <section className="mb-16">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white text-center">
                Compare to Traditional Advertising
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-slate-300">
                  <thead>
                    <tr className="border-b border-slate-600">
                      <th className="text-left py-3">Feature</th>
                      <th className="text-center py-3">Million Dollar Homepage</th>
                      <th className="text-center py-3">Google Ads</th>
                      <th className="text-center py-3">Facebook Ads</th>
                      <th className="text-center py-3">Billboard</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-slate-700">
                      <td className="py-3">Cost</td>
                      <td className="text-center py-3 text-green-400">$1 per pixel (one-time)</td>
                      <td className="text-center py-3">$1-2 per click</td>
                      <td className="text-center py-3">$0.50-3 per click</td>
                      <td className="text-center py-3">$1,000+ per month</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-3">Duration</td>
                      <td className="text-center py-3 text-green-400">Permanent</td>
                      <td className="text-center py-3">Until budget runs out</td>
                      <td className="text-center py-3">Until budget runs out</td>
                      <td className="text-center py-3">Monthly contracts</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-3">Uniqueness</td>
                      <td className="text-center py-3 text-green-400">Part of internet history</td>
                      <td className="text-center py-3">Standard ads</td>
                      <td className="text-center py-3">Standard ads</td>
                      <td className="text-center py-3">Traditional display</td>
                    </tr>
                    <tr>
                      <td className="py-3">Targeting</td>
                      <td className="text-center py-3">Global, viral interest</td>
                      <td className="text-center py-3">Highly targeted</td>
                      <td className="text-center py-3">Highly targeted</td>
                      <td className="text-center py-3">Geographic only</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Support Section */}
        <section className="mb-16">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Questions About Pricing?</h3>
              <p className="text-slate-300 mb-6">
                Need help calculating costs for your pixel purchase or have questions about our pricing model? 
                Our support team is here to help with all your pricing inquiries.
              </p>
              <a 
                href="mailto:support@milliondollarhomepage2025.com" 
                className="text-blue-400 hover:text-blue-300 font-medium text-lg"
              >
                support@milliondollarhomepage2025.com
              </a>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border-slate-600">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Secure Your Pixels?</h3>
              <p className="text-slate-300 mb-6">
                Simple pricing, permanent results. Start selecting your pixels today and become 
                part of internet history.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="/">Browse Available Pixels</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/how-it-works">How It Works</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-800/50 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-slate-400">
          <p>&copy; 2025 Million Dollar Homepage 2025. Simple pricing, lasting value.</p>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;