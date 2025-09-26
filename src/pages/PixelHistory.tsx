import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ExternalLink, Users, DollarSign, Globe, Zap } from "lucide-react";

const PixelHistory = () => {
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
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            The History of Pixel Advertising
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From a student's wild idea to internet legend: Discover how the Million Dollar Homepage revolutionized digital marketing and created a new form of internet art.
          </p>
        </section>

        {/* Timeline */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Timeline of Innovation</h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">August 2005</CardTitle>
                </div>
                <CardDescription>The Original Launch</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  21-year-old Alex Tew launches the original Million Dollar Homepage to pay for university. The simple concept: sell 1 million pixels for $1 each.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">September 2005</CardTitle>
                </div>
                <CardDescription>Viral Growth</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Word spreads through blogs and forums. The page receives millions of visitors as people share this unique internet phenomenon.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">January 2006</CardTitle>
                </div>
                <CardDescription>Global Success</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  The final pixels sell for $38,100 in a eBay auction. Total revenue: $1,037,100. International media coverage follows.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">2006-2020</CardTitle>
                </div>
                <CardDescription>Cultural Impact</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Hundreds of copycat sites emerge. The concept influences modern pixel art, NFTs, and digital real estate concepts.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">2025</CardTitle>
                </div>
                <CardDescription>The Revival</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  20 years later, we bring back the magic with modern technology, secure payments, and new features for the digital age.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Impact Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Cultural Impact</h2>
          
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Internet Culture</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  The Million Dollar Homepage became a symbol of early internet entrepreneurship and creativity. It proved that simple ideas could capture global attention.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Featured in major publications worldwide</li>
                  <li>• Inspired academic studies on viral marketing</li>
                  <li>• Referenced in books about internet culture</li>
                  <li>• Influenced modern pixel art movements</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Innovation Legacy</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  The concept pioneered new forms of digital advertising and community-driven content creation that we see echoed today.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Precursor to modern NFT concepts</li>
                  <li>• Early crowdsourced advertising model</li>
                  <li>• Influenced social media monetization</li>
                  <li>• Inspired digital real estate markets</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-6 py-12">
          <h2 className="text-3xl font-bold">Be Part of Digital History</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the next chapter of this internet legend. Own your piece of digital history on the 2025 canvas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/">
                Start Buying Pixels
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/how-it-works">
                Learn How It Works
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/50 backdrop-blur">
        <div className="container py-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-6 h-6 text-primary" />
                <span className="font-bold">Million Dollar Homepage 2025</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The legendary pixel marketplace returns for the digital age.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Explore</h4>
              <nav className="flex flex-col space-y-2 text-sm">
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</Link>
                <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
              </nav>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Resources</h4>
              <nav className="flex flex-col space-y-2 text-sm">
                <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
                <Link to="/pixel-history" className="text-muted-foreground hover:text-foreground transition-colors">Pixel History</Link>
              </nav>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Connect</h4>
              <div className="flex space-x-4">
                <a href="https://twitter.com/milliondollarhp25" target="_blank" rel="noopener noreferrer" 
                   className="text-muted-foreground hover:text-foreground transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Million Dollar Homepage 2025. Celebrating 20 years of digital innovation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PixelHistory;