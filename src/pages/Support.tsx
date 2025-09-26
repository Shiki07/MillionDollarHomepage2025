import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  MessageCircle, 
  Clock, 
  HelpCircle,
  CheckCircle,
  AlertCircle,
  Zap,
  Users
} from "lucide-react";

const Support = () => {
  const supportCategories = [
    {
      icon: HelpCircle,
      title: "General Questions",
      description: "Questions about how the Million Dollar Homepage 2025 works, pricing, or getting started.",
      examples: ["How do I buy pixels?", "What's the minimum purchase?", "Is my payment secure?"]
    },
    {
      icon: Zap,
      title: "Technical Issues",
      description: "Problems with the website, payment processing, or image uploads.",
      examples: ["Payment failed", "Can't upload image", "Site not loading properly"]
    },
    {
      icon: Users,
      title: "Business Inquiries",
      description: "Bulk purchases, partnerships, or custom advertising solutions.",
      examples: ["Large pixel purchases", "Partnership opportunities", "Custom integrations"]
    },
    {
      icon: AlertCircle,
      title: "Account & Billing",
      description: "Issues with your purchase, receipts, or account-related questions.",
      examples: ["Need purchase receipt", "Refund inquiry", "Update billing info"]
    }
  ];

  const responseTimeInfo = [
    {
      priority: "Critical Issues",
      time: "Within 2 hours",
      description: "Payment problems, technical errors preventing purchases"
    },
    {
      priority: "General Support",
      time: "Within 24 hours",
      description: "Questions, guidance, and non-urgent technical issues"
    },
    {
      priority: "Business Inquiries",
      time: "Within 48 hours",
      description: "Partnership discussions, bulk purchases, custom solutions"
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
            <MessageCircle className="h-4 w-4 mr-2" />
            Customer Support
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            We're Here to Help
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Have questions about purchasing pixels, need technical assistance, or want to discuss 
            business opportunities? Our support team is ready to help you succeed.
          </p>
        </section>

        {/* Contact Information */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-slate-700">
            <CardContent className="p-8 text-center">
              <Mail className="h-16 w-16 text-white mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                For all support inquiries, technical questions, or business discussions, 
                reach out to our dedicated support team.
              </p>
              <div className="bg-slate-800/50 p-6 rounded-lg inline-block">
                <a 
                  href="mailto:support@milliondollarhomepage2025.com"
                  className="text-2xl font-bold text-blue-300 hover:text-blue-200 transition-colors"
                >
                  support@milliondollarhomepage2025.com
                </a>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Support Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What Can We Help With?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {supportCategories.map((category, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                      <category.icon className="h-5 w-5 text-white" />
                    </div>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-4">{category.description}</p>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-slate-400">Common examples:</div>
                    <ul className="text-sm text-slate-300 space-y-1">
                      {category.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Response Times */}
        <section className="mb-16">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white text-center flex items-center justify-center gap-2">
                <Clock className="h-6 w-6" />
                Response Times
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {responseTimeInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <div className="font-semibold text-white">{info.priority}</div>
                        <div className="text-green-400 font-medium">{info.time}</div>
                      </div>
                      <div className="text-slate-300 text-sm">{info.description}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-900/30 border border-blue-700/50 rounded-lg">
                <p className="text-blue-200 text-sm">
                  <strong>Note:</strong> Response times are calculated during business hours (Monday-Friday, 9 AM - 6 PM EST). 
                  We monitor critical issues 24/7 and will respond to urgent matters outside business hours when possible.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Before You Contact Us */}
        <section className="mb-16">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Before You Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">
                To help us assist you more efficiently, please check our self-service resources first:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Button variant="outline" asChild className="w-full justify-start">
                    <a href="/faq">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Frequently Asked Questions
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="w-full justify-start">
                    <a href="/how-it-works">
                      <Zap className="h-4 w-4 mr-2" />
                      How It Works Guide
                    </a>
                  </Button>
                </div>
                <div className="space-y-3">
                  <Button variant="outline" asChild className="w-full justify-start">
                    <a href="/pricing">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Pricing Information
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="w-full justify-start">
                    <a href="/about">
                      <Users className="h-4 w-4 mr-2" />
                      About Our Project
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border-slate-600">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Support?</h3>
              <p className="text-slate-300 mb-6">
                Don't hesitate to reach out! We're committed to providing excellent support 
                to help you succeed with your pixel advertising.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="mailto:support@milliondollarhomepage2025.com">
                    <Mail className="h-5 w-5 mr-2" />
                    Email Support Now
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/faq">View FAQ</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-800/50 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-slate-400">
          <p>&copy; 2025 Million Dollar Homepage 2025. We're here to help you succeed.</p>
        </div>
      </footer>
    </div>
  );
};

export default Support;