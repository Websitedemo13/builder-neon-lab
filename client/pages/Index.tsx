import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Star, ArrowRight, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: { vi: string; en: string };
  description: { vi: string; en: string };
  price: number;
  category: string;
  featured: boolean;
  image: string;
}

interface Post {
  id: string;
  title: { vi: string; en: string };
  excerpt: { vi: string; en: string };
  image: string;
  date: string;
  author: { vi: string; en: string };
  featured: boolean;
}

const Index: React.FC = () => {
  const { t, language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    // Load products
    fetch("/src/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data.filter((p: Product) => p.featured)))
      .catch(() => {
        // Fallback mock data
        setProducts([
          {
            id: "esp-classic",
            name: { vi: "Espresso Cổ Điển", en: "Classic Espresso" },
            description: {
              vi: "Hương vị đậm đà, tinh túy của cà phê Arabica",
              en: "Rich, pure essence of Arabica coffee",
            },
            price: 45000,
            category: "espresso",
            featured: true,
            image:
              "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=300&h=300&fit=crop",
          },
          {
            id: "cb-smooth",
            name: { vi: "Cold Brew Mượt Mà", en: "Smooth Cold Brew" },
            description: {
              vi: "Cà phê pha lạnh 12 tiếng, vị ngọt tự nhiên",
              en: "12-hour cold brew with natural sweetness",
            },
            price: 55000,
            category: "coldbrew",
            featured: true,
            image:
              "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=300&fit=crop",
          },
          {
            id: "sig-song",
            name: { vi: "Sống KOFFI Đặc Biệt", en: "Song KOFFI Special" },
            description: {
              vi: "Công thức bí mật của nhà, pha chế với tình yêu",
              en: "Our secret recipe, crafted with love",
            },
            price: 65000,
            category: "signature",
            featured: true,
            image:
              "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop",
          },
        ]);
      });

    // Load posts
    fetch("/src/data/posts.json")
      .then((res) => res.json())
      .then((data) => setPosts(data.filter((p: Post) => p.featured)))
      .catch(() => {
        // Fallback mock data
        setPosts([
          {
            id: "story-of-song-koffi",
            title: {
              vi: "Câu Chuyện Sống KOFFI",
              en: "The Story of Song KOFFI",
            },
            excerpt: {
              vi: "Hành trình từ một ý tưởng nhỏ đến quán cà phê được yêu thích nhất phố Sư Vạn Hạnh...",
              en: "The journey from a small idea to the most beloved coffee shop on Su Van Hanh street...",
            },
            image:
              "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop",
            date: "2024-01-15",
            author: { vi: "Đội ngũ Sống KOFFI", en: "Song KOFFI Team" },
            featured: true,
          },
        ]);
      });
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-coffee-900 via-coffee-800 to-coffee-700 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 coffee-steam"></div>
          <div className="absolute top-40 right-32 w-24 h-24 coffee-steam animation-delay-1000"></div>
          <div className="absolute bottom-32 left-1/3 w-28 h-28 coffee-steam animation-delay-2000"></div>
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div
                className={cn(
                  "text-left space-y-8 transition-all duration-1000",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10",
                )}
              >
                <div className="space-y-4">
                  <h1 className="text-5xl lg:text-7xl font-bold text-cream-100 font-serif leading-tight">
                    Sống
                    <span className="block text-4xl lg:text-6xl text-cream-200 mt-2">
                      KOFFI
                    </span>
                  </h1>
                  <div className="space-y-2">
                    <p className="text-xl lg:text-2xl text-cream-200 font-medium">
                      {t("hero.slogan1")}
                    </p>
                    <p className="text-lg text-cream-300">
                      {t("hero.slogan2")}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-cream-100 text-coffee-900 hover:bg-cream-200 font-semibold px-8 py-6 text-lg"
                  >
                    <Link to="/menu">
                      {t("hero.cta")}
                      <ChevronRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-cream-200 text-cream-200 hover:bg-cream-200 hover:text-coffee-900 font-semibold px-8 py-6 text-lg"
                  >
                    <Link to="/booking">{t("hero.booking")}</Link>
                  </Button>
                </div>
              </div>

              {/* Hero Visual */}
              <div
                className={cn(
                  "relative transition-all duration-1000 delay-300",
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10",
                )}
              >
                <div className="relative">
                  <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-cream-200 to-cream-100 rounded-3xl shadow-2xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop"
                      alt="Sống KOFFI Coffee Shop"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-cream-100 rounded-2xl flex items-center justify-center shadow-lg">
                    <Coffee className="w-12 h-12 text-coffee-900" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cream-200 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cream-200 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-coffee-900 font-serif mb-4">
              {t("featured.title")}
            </h2>
            <p className="text-xl text-coffee-600 max-w-2xl mx-auto">
              {t("featured.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card
                key={product.id}
                className={cn(
                  "group hover-lift border-coffee-200 hover:border-coffee-300 transition-all duration-300",
                  `fade-in-up animation-delay-${index * 200}`,
                )}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name[language]}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-coffee-900 text-cream-100 px-2 py-1 rounded-full text-sm font-medium">
                    {formatPrice(product.price)}
                  </div>
                </div>
                <CardContent className="p-6">
                  <CardTitle className="text-xl font-semibold text-coffee-900 mb-2 font-serif">
                    {product.name[language]}
                  </CardTitle>
                  <CardDescription className="text-coffee-600 mb-4">
                    {product.description[language]}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <Button
                      size="sm"
                      className="bg-coffee-900 text-cream-100 hover:bg-coffee-800"
                    >
                      Order Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-coffee-900 text-coffee-900 hover:bg-coffee-900 hover:text-cream-100"
            >
              <Link to="/menu">
                {t("common.viewAll")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-20 bg-coffee-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-coffee-900 font-serif mb-4">
              {t("blog.title")}
            </h2>
            <p className="text-xl text-coffee-600 max-w-2xl mx-auto">
              {t("blog.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {posts.map((post, index) => (
              <Card
                key={post.id}
                className={cn(
                  "group hover-lift border-coffee-200 hover:border-coffee-300 transition-all duration-300",
                  `slide-in-right animation-delay-${index * 300}`,
                )}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={post.image}
                    alt={post.title[language]}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-coffee-500 mb-3">
                    <span>{post.author[language]}</span>
                    <span>•</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <CardTitle className="text-xl font-semibold text-coffee-900 mb-3 font-serif group-hover:text-coffee-700 transition-colors">
                    {post.title[language]}
                  </CardTitle>
                  <CardDescription className="text-coffee-600 mb-4 line-clamp-3">
                    {post.excerpt[language]}
                  </CardDescription>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-coffee-900 hover:text-coffee-700 p-0 h-auto font-medium"
                  >
                    {t("blog.readMore")}
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-coffee-900 text-coffee-900 hover:bg-coffee-900 hover:text-cream-100"
            >
              <Link to="/blog">
                {t("common.viewAll")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-coffee-900 font-serif">
                {t("about.title")}
              </h2>
              <p className="text-lg text-coffee-600 leading-relaxed">
                {t("about.description")}
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-coffee-900 rounded-full"></div>
                  <span className="text-coffee-700">{t("hero.slogan1")}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-coffee-900 rounded-full"></div>
                  <span className="text-coffee-700">{t("hero.slogan2")}</span>
                </div>
              </div>
              <Button
                asChild
                size="lg"
                className="bg-coffee-900 text-cream-100 hover:bg-coffee-800"
              >
                <Link to="/contact">
                  {t("contact.title")}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop"
                alt="Coffee shop interior"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-coffee-900 rounded-2xl flex items-center justify-center">
                <div className="text-center text-cream-100">
                  <div className="text-2xl font-bold">5+</div>
                  <div className="text-sm">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
