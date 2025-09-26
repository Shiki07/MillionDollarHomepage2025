import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircle, Mail } from "lucide-react";

const FAQ = () => {
  const faqData = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "What is the Million Dollar Homepage 2025?",
          answer: "The Million Dollar Homepage 2025 is a modern revival of Alex Tew's legendary 2005 website. It features a 1000×1000 pixel canvas where individuals and businesses can purchase pixels for $1 each to display their logos, advertisements, or pixel art. This 20th anniversary edition uses modern web technology while honoring the original concept that became an internet sensation."
        },
        {
          question: "How much does it cost to buy pixels?",
          answer: "Each pixel costs exactly $1. There are no hidden fees, subscriptions, or additional charges. The minimum purchase is 100 pixels (10×10 area) for $100. You only pay for the pixels you select, and the price is completely transparent."
        },
        {
          question: "What's the minimum number of pixels I can buy?",
          answer: "The minimum purchase is 100 pixels, which forms a 10×10 pixel square. This ensures that advertisements are visible and meaningful while keeping the barrier to entry accessible for small businesses and individuals."
        }
      ]
    },
    {
      category: "Purchasing Process",
      questions: [
        {
          question: "How do I select and buy pixels?",
          answer: "Simply visit our homepage and click-and-drag on the canvas to select the pixel area you want. After selecting, upload your image, add your website URL and alt text, then complete the secure payment process through Stripe. Your content appears immediately after payment confirmation."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover) and digital payment methods through our secure Stripe payment system. All transactions are protected with SSL encryption and industry-standard security measures."
        },
        {
          question: "Is my payment secure?",
          answer: "Absolutely. We use Stripe, one of the world's most trusted payment processors, to handle all transactions. Your payment information is encrypted and never stored on our servers. All transactions are protected by SSL encryption and comply with PCI DSS standards."
        },
        {
          question: "Can I get a refund?",
          answer: "All pixel purchases are final and non-refundable. This policy ensures the permanent nature of the canvas and prevents disruption to the overall display. Please carefully review your selection and content before completing your purchase."
        }
      ]
    },
    {
      category: "Content & Images",
      questions: [
        {
          question: "What image formats do you support?",
          answer: "We support PNG, JPEG, and GIF image formats. The maximum file size is 5MB. Images are automatically resized to fit your selected pixel area while maintaining the best possible quality."
        },
        {
          question: "What are the content guidelines?",
          answer: "All content must be family-friendly and legal. We prohibit offensive material, adult content, illegal activities, hate speech, and spam. Content that violates our guidelines will be removed without refund. We reserve the right to moderate all content."
        },
        {
          question: "Can I change my image after purchase?",
          answer: "No, once your payment is confirmed and your content is published, it becomes permanent. This permanence is part of the canvas's historical value. Please ensure your image and details are correct before completing your purchase."
        },
        {
          question: "Do I need to provide a website URL?",
          answer: "While not mandatory, we highly recommend providing a website URL as it makes your pixel advertisement clickable and more valuable. You should also provide alt text for accessibility and SEO purposes."
        }
      ]
    },
    {
      category: "Technical Questions",
      questions: [
        {
          question: "How long does it take for my content to appear?",
          answer: "Your content appears immediately after payment confirmation. There's no waiting period or approval process for content that meets our guidelines. The canvas updates in real-time."
        },
        {
          question: "Is the canvas mobile-friendly?",
          answer: "Yes, our canvas is optimized for all devices including smartphones and tablets. The interface adapts to different screen sizes while maintaining full functionality for selecting and purchasing pixels."
        },
        {
          question: "How do you handle high traffic?",
          answer: "Our platform is built on modern cloud infrastructure that automatically scales to handle traffic spikes. We use content delivery networks (CDNs) and optimized caching to ensure fast loading times worldwide."
        },
        {
          question: "Can pixels be resold or transferred?",
          answer: "Currently, we don't offer a resale or transfer system. Each pixel purchase is tied to the original buyer. We may consider adding this feature in the future based on user demand and technical feasibility."
        }
      ]
    },
    {
      category: "Business & Marketing",
      questions: [
        {
          question: "Is this good for marketing my business?",
          answer: "The Million Dollar Homepage offers unique marketing value through its novelty, permanent display, and historical significance. It's particularly effective for businesses wanting to associate with internet culture, viral marketing, or those targeting tech-savvy audiences."
        },
        {
          question: "Do you provide analytics or traffic data?",
          answer: "While we don't provide individual analytics, the canvas receives significant organic traffic from people interested in internet history, digital culture, and unique marketing approaches. The permanent nature means your advertisement has lasting value."
        },
        {
          question: "Can I buy pixels for someone else as a gift?",
          answer: "Yes! Pixel purchases make unique gifts for entrepreneurs, digital marketers, or internet culture enthusiasts. During checkout, you can specify different contact information for the recipient."
        }
      ]
    },
    {
      category: "Support & Contact",
      questions: [
        {
          question: "What if I have technical issues during purchase?",
          answer: "If you experience any technical difficulties, please contact our support team immediately. We monitor transactions closely and can assist with payment issues, technical problems, or content questions."
        },
        {
          question: "How can I contact customer support?",
          answer: "You can reach our support team by emailing support@milliondollarhomepage2025.com or through the contact form on our website. We typically respond within 24 hours and prioritize urgent payment or technical issues."
        },
        {
          question: "Do you offer bulk discounts?",
          answer: "Currently, we maintain the $1 per pixel pricing for all purchases to honor the original concept. However, for extremely large purchases (10,000+ pixels), please contact us to discuss your requirements."
        }
      ]
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
            <HelpCircle className="h-4 w-4 mr-2" />
            Frequently Asked Questions
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            FAQ
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about buying pixels, payments, content guidelines, 
            and technical specifications. Can't find what you're looking for? Contact our support team.
          </p>
        </section>

        {/* FAQ Content */}
        <section className="mb-16">
          <div className="space-y-8">
            {faqData.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-xl text-white">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, questionIndex) => (
                      <AccordionItem 
                        key={questionIndex} 
                        value={`${categoryIndex}-${questionIndex}`}
                        className="border-slate-600"
                      >
                        <AccordionTrigger className="text-left text-slate-200 hover:text-white">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-300 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-slate-700">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Quick Facts</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-300 mb-2">$1</div>
                  <div className="text-slate-300">Price per pixel</div>
                  <div className="text-sm text-slate-400 mt-1">No hidden fees</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-300 mb-2">100</div>
                  <div className="text-slate-300">Minimum pixels</div>
                  <div className="text-sm text-slate-400 mt-1">10×10 pixel area</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-300 mb-2">∞</div>
                  <div className="text-slate-300">Permanent display</div>
                  <div className="text-sm text-slate-400 mt-1">No time limits</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Support */}
        <section className="mb-16">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h3>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Our support team is here to help! If you can't find the answer you're looking for 
                in our FAQ, don't hesitate to reach out to us directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" asChild className="flex items-center gap-2">
                  <a href="mailto:support@milliondollarhomepage2025.com">
                    <Mail className="h-4 w-4" />
                    support@milliondollarhomepage2025.com
                  </a>
                </Button>
                <Button asChild>
                  <a href="/how-it-works">How It Works Guide</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border-slate-600">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Buy Pixels?</h3>
              <p className="text-slate-300 mb-6">
                Now that you have all the information, it's time to secure your spot on internet history.
              </p>
              <Button size="lg" asChild>
                <a href="/">Browse Available Pixels</a>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-800/50 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-slate-400">
          <p>&copy; 2025 Million Dollar Homepage 2025. Your questions answered.</p>
        </div>
      </footer>
    </div>
  );
};

export default FAQ;