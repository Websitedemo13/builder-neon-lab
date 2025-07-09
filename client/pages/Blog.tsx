import React from "react";
import { Calendar, User, ArrowRight, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";

const Blog: React.FC = () => {
  const { t, language } = useLanguage();

  const mockPosts = [
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
    },
    {
      id: "coffee-brewing-guide",
      title: {
        vi: "Bí Quyết Pha Cà Phê Ngon",
        en: "Secrets to Brewing Perfect Coffee",
      },
      excerpt: {
        vi: "Khám phá những bí quyết để pha một tách cà phê hoàn hảo tại nhà với những mẹo từ barista chuyên nghiệp...",
        en: "Discover the secrets to brewing the perfect cup of coffee at home with tips from professional baristas...",
      },
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop",
      date: "2024-01-10",
      author: { vi: "Barista Minh", en: "Barista Minh" },
    },
    {
      id: "coffee-health-benefits",
      title: {
        vi: "Lợi Ích Sức Khỏe Của Cà Phê",
        en: "Health Benefits of Coffee",
      },
      excerpt: {
        vi: "Tìm hiểu về những lợi ích tuyệt vời mà cà phê mang lại cho sức khỏe khi được sử dụng đúng cách...",
        en: "Learn about the amazing health benefits that coffee brings when consumed properly...",
      },
      image:
        "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&h=400&fit=crop",
      date: "2024-01-05",
      author: { vi: "Dr. Coffee Lover", en: "Dr. Coffee Lover" },
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-coffee-900 to-coffee-800 text-cream-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Coffee className="w-16 h-16 mx-auto mb-6 text-cream-200" />
            <h1 className="text-5xl lg:text-6xl font-bold font-serif mb-6">
              {t("blog.title")}
            </h1>
            <p className="text-xl lg:text-2xl text-cream-200 max-w-3xl mx-auto">
              {t("blog.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {mockPosts.map((post, index) => (
              <Card
                key={post.id}
                className="group hover-lift border-coffee-200 hover:border-coffee-300 transition-all duration-300"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={post.image}
                    alt={post.title[language]}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-coffee-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author[language]}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
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

          {/* Coming Soon Message */}
          <div className="text-center mt-16 p-8 bg-coffee-50 rounded-2xl">
            <Coffee className="w-12 h-12 mx-auto mb-4 text-coffee-600" />
            <h3 className="text-2xl font-bold text-coffee-900 font-serif mb-2">
              {language === "vi" ? "Sắp Ra Mắt" : "Coming Soon"}
            </h3>
            <p className="text-coffee-600">
              {language === "vi"
                ? "Chúng tôi đang chuẩn bị thêm nhiều bài viết thú vị về cà phê. Hãy quay lại sau nhé!"
                : "We're preparing more interesting articles about coffee. Please come back soon!"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
