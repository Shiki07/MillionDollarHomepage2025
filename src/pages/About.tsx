import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Globe, Users, TrendingUp } from "lucide-react";

const About = () => {
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
          <Badge className="mb-4" variant="secondary">20th Anniversary Edition</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            The Legend Returns
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Twenty years after Alex Tew's original Million Dollar Homepage took the internet by storm, 
            we're bringing this iconic piece of digital history into 2025 with modern technology and 
            the same revolutionary spirit.
          </p>
        </section>

        {/* Story Section */}
        <section className="mb-16">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                The Original Story
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-4">
              <p>
                In 2005, a 21-year-old university student named Alex Tew had a simple yet brilliant idea: 
                create a webpage with 1 million pixels and sell each pixel for $1 to fund his education. 
                The Million Dollar Homepage became an overnight sensation, attracting worldwide media attention 
                and generating exactly $1,037,100 in revenue.
              </p>
              <p>
                The original site featured a 1000×1000 pixel grid where advertisers could purchase blocks 
                of pixels to display their logos and link to their websites. It became a cultural phenomenon, 
                representing the wild creativity and entrepreneurial spirit of the early internet era.
              </p>
              <p>
                Now, two decades later, we're reviving this concept with modern web technology, 
                secure payments, and the same pioneering spirit that made the original so special.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Vision Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our 2025 Vision</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Global Digital Heritage
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                Preserve and celebrate internet history while creating new digital landmarks 
                for the modern web.
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Community Driven
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                Build a vibrant community of pixel owners, digital artists, and internet 
                culture enthusiasts from around the world.
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Innovation & Growth
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                Combine nostalgia with cutting-edge technology to create new opportunities 
                for digital advertising and creative expression.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-slate-700">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">By the Numbers</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-300">1,000,000</div>
                  <div className="text-slate-300">Total Pixels</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-300">$1</div>
                  <div className="text-slate-300">Per Pixel</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-300">20</div>
                  <div className="text-slate-300">Years Later</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-300">∞</div>
                  <div className="text-slate-300">Possibilities</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">The Team Behind 2025</h2>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-8 text-center">
              <p className="text-slate-300 text-lg mb-6">
                We're a passionate team of developers, designers, and internet culture enthusiasts 
                dedicated to honoring the legacy of the original Million Dollar Homepage while 
                bringing it into the modern era.
              </p>
              <p className="text-slate-300">
                Our mission is to create a platform that celebrates digital history, 
                supports creative expression, and provides genuine value to advertisers 
                and pixel art enthusiasts alike.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Support Section */}
        <section className="mb-16">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Questions About Our Mission?</h3>
              <p className="text-slate-300 mb-6">
                We'd love to hear from you! Whether you have questions about our project, 
                want to learn more about our team, or need assistance with anything else.
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
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Make History?</h3>
              <p className="text-slate-300 mb-6">
                Join thousands of others in recreating internet history. Own your piece of the canvas today.
              </p>
              <Button size="lg" asChild>
                <a href="/">Start Buying Pixels</a>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-800/50 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-slate-400">
          <p>&copy; 2025 Million Dollar Homepage 2025. Honoring digital history.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;