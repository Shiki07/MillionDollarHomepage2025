import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  ArrowRight,
  BookOpen,
  TrendingUp,
  Users,
  Lightbulb,
  History
} from "lucide-react";

const Blog = () => {
  const featuredPost = {
    title: "The Million Dollar Homepage Phenomenon: 20 Years Later",
    excerpt: "Exploring how Alex Tew's revolutionary idea changed internet advertising forever and why it's more relevant than ever in 2025.",
    date: "March 15, 2025",
    readTime: "8 min read",
    category: "Internet History",
    image: "/lovable-uploads/bb68d99d-1df4-4780-a87d-47483b1787c7.png"
  };

  const blogPosts = [
    {
      title: "How to Create Effective Pixel Art for Your Advertisement",
      excerpt: "Learn the fundamentals of pixel art design and how to make your small advertisement space pack a big visual punch.",
      date: "March 10, 2025",
      readTime: "5 min read",
      category: "Design Tips",
      featured: false
    },
    {
      title: "The Psychology Behind Viral Marketing in 2025",
      excerpt: "Understanding what makes content go viral and how the Million Dollar Homepage concept applies to modern marketing strategies.",
      date: "March 8, 2025",
      readTime: "7 min read",
      category: "Marketing",
      featured: false
    },
    {
      title: "Digital Real Estate: The New Frontier of Online Investment",
      excerpt: "Exploring the concept of digital real estate and why owning pixels on iconic websites is becoming a legitimate investment strategy.",
      date: "March 5, 2025",
      readTime: "6 min read",
      category: "Investment",
      featured: false
    },
    {
      title: "Building Community Through Shared Digital Spaces",
      excerpt: "How collaborative digital canvases create unique communities and why participation in internet history matters.",
      date: "March 1, 2025",
      readTime: "4 min read",
      category: "Community",
      featured: false
    },
    {
      title: "The Technology Behind Modern Pixel Marketplaces",
      excerpt: "A deep dive into the technical infrastructure that powers secure, scalable pixel-based advertising platforms.",
      date: "February 28, 2025",
      readTime: "9 min read",
      category: "Technology",
      featured: false
    },
    {
      title: "From Idea to Million: Lessons from Internet Success Stories",
      excerpt: "Analyzing what we can learn from the original Million Dollar Homepage and other breakthrough internet concepts.",
      date: "February 25, 2025",
      readTime: "6 min read",
      category: "Entrepreneurship",
      featured: false
    }
  ];

  const categories = [
    { name: "Internet History", count: 8, icon: History },
    { name: "Marketing", count: 12, icon: TrendingUp },
    { name: "Design Tips", count: 6, icon: Lightbulb },
    { name: "Community", count: 4, icon: Users },
    { name: "Technology", count: 5, icon: BookOpen }
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
            <BookOpen className="h-4 w-4 mr-2" />
            Insights & Stories
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Blog
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Explore the intersection of digital culture, marketing innovation, and internet history. 
            Discover insights, tips, and stories from the world of pixel advertising and viral marketing.
          </p>
        </section>

        {/* Featured Post */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-slate-700 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <div className="h-48 md:h-full bg-slate-700 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-slate-400" />
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <Badge className="mb-4">Featured</Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {featuredPost.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readTime}
                  </div>
                  <Badge variant="outline">{featuredPost.category}</Badge>
                </div>
                <Button>
                  Read Article
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </section>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-white mb-8">Latest Articles</h2>
            <div className="space-y-6">
              {blogPosts.map((post, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-32 md:h-24 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-8 w-8 text-slate-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                          <div className="text-sm text-slate-400 flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {post.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readTime}
                            </div>
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2 hover:text-blue-300 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                        <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-400 hover:text-blue-300">
                          Read more
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline">
                Load More Articles
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Categories */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-3">
                          <category.icon className="h-4 w-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                          <span className="text-slate-300 group-hover:text-white transition-colors">
                            {category.name}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-white mb-3">Stay Updated</h3>
                  <p className="text-slate-300 text-sm mb-4">
                    Get the latest insights on digital marketing, pixel art, and internet culture.
                  </p>
                  <Button size="sm" className="w-full">
                    Subscribe to Newsletter
                  </Button>
                </CardContent>
              </Card>

              {/* Popular Posts */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Popular Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 3).map((post, index) => (
                      <div key={index} className="group cursor-pointer">
                        <h4 className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors leading-tight mb-2">
                          {post.title}
                        </h4>
                        <div className="text-xs text-slate-400 flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </div>
                        {index < 2 && <div className="border-b border-slate-700 mt-4"></div>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-800/50 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-slate-400">
          <p>&copy; 2025 Million Dollar Homepage 2025. Sharing insights from the digital frontier.</p>
        </div>
      </footer>
    </div>
  );
};

export default Blog;