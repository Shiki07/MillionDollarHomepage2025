import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Target, TrendingUp, Users, Zap, Eye, Clock, BarChart3 } from "lucide-react";

const DigitalAdvertising = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <DollarSign className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Million Dollar Homepage 2025
            </span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</Link>
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
            <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
          </nav>
        </div>
      </header>

      <main className="container py-12 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <Badge variant="secondary" className="mb-4">Digital Marketing Guide</Badge>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Digital Advertising in 2025
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover why pixel advertising remains one of the most unique and effective forms of digital marketing, offering permanent placement and viral potential.
          </p>
        </section>

        {/* Why Pixel Advertising Works */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Why Pixel Advertising Works</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="relative overflow-hidden">
              <CardHeader>
                <Target className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Permanent Placement</CardTitle>
                <CardDescription>Your ad stays forever</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Unlike traditional digital ads that disappear after campaigns end, pixel ads provide permanent visibility on a legendary platform.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Viral Potential</CardTitle>
                <CardDescription>Built-in shareability</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  The unique nature of pixel advertising naturally encourages sharing, creating organic viral marketing opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader>
                <Users className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Engaged Audience</CardTitle>
                <CardDescription>Quality over quantity</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Visitors are highly engaged and curious about the interactive pixel canvas, leading to higher click-through rates.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Comparison with Other Advertising */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Pixel Ads vs Traditional Digital Advertising</h2>
          
          <div className="grid gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600 dark:text-green-400">Pixel Advertising Advantages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Eye className="w-5 h-5 text-green-600 dark:text-green-400 mt-1" />
                  <div>
                    <h4 className="font-semibold">Permanent Visibility</h4>
                    <p className="text-sm text-muted-foreground">Your ad never expires or gets removed</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400 mt-1" />
                  <div>
                    <h4 className="font-semibold">One-time Cost</h4>
                    <p className="text-sm text-muted-foreground">No monthly fees or recurring charges</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-green-600 dark:text-green-400 mt-1" />
                  <div>
                    <h4 className="font-semibold">Unique Format</h4>
                    <p className="text-sm text-muted-foreground">Stand out from standard banner ads</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400 mt-1" />
                  <div>
                    <h4 className="font-semibold">SEO Benefits</h4>
                    <p className="text-sm text-muted-foreground">Permanent backlinks to your website</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-orange-600 dark:text-orange-400">Traditional Digital Ads</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-1" />
                  <div>
                    <h4 className="font-semibold">Limited Duration</h4>
                    <p className="text-sm text-muted-foreground">Ads disappear when campaigns end</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <BarChart3 className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-1" />
                  <div>
                    <h4 className="font-semibold">Ongoing Costs</h4>
                    <p className="text-sm text-muted-foreground">Monthly fees and cost-per-click charges</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Eye className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-1" />
                  <div>
                    <h4 className="font-semibold">Ad Blindness</h4>
                    <p className="text-sm text-muted-foreground">Users often ignore standard ad formats</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Target className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-1" />
                  <div>
                    <h4 className="font-semibold">Ad blockers</h4>
                    <p className="text-sm text-muted-foreground">Many ads are blocked by browser extensions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Use Cases */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Perfect for Every Business</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Startups & Small Business</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Affordable one-time marketing investment</li>
                  <li>• Perfect for launch announcements</li>
                  <li>• Build brand awareness without ongoing costs</li>
                  <li>• Great for viral marketing campaigns</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Artists & Creators</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Showcase your artwork to a global audience</li>
                  <li>• Create pixel art masterpieces</li>
                  <li>• Drive traffic to your portfolio</li>
                  <li>• Connect with the digital art community</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tech Companies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Appeal to tech-savvy audiences</li>
                  <li>• Show innovation and creativity</li>
                  <li>• Permanent presence in internet history</li>
                  <li>• Cost-effective brand positioning</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">E-commerce Stores</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Drive consistent traffic to your store</li>
                  <li>• No ongoing advertising costs</li>
                  <li>• Stand out from competitors</li>
                  <li>• Build long-term brand recognition</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Non-Profits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Permanent awareness for your cause</li>
                  <li>• Budget-friendly marketing solution</li>
                  <li>• Engage with digital communities</li>
                  <li>• Create memorable campaigns</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Personal Brands</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Build your online presence</li>
                  <li>• Create a unique personal statement</li>
                  <li>• Network with other pixel owners</li>
                  <li>• Leave your mark on internet culture</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-6 py-12">
          <h2 className="text-3xl font-bold">Ready to Start Your Pixel Campaign?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of innovative brands who've chosen pixel advertising for its unique blend of creativity, permanence, and viral potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/">
                Buy Pixels Now
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/pricing">
                View Pricing
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/50 backdrop-blur">
        <div className="container py-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              &copy; 2025 Million Dollar Homepage 2025. The future of digital advertising.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DigitalAdvertising;