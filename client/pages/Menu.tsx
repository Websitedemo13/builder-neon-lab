import React, { useEffect, useState } from "react";
import { Star, Filter, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

const Menu: React.FC = () => {
  const { t, language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: "all", name: { vi: "Tất Cả", en: "All" } },
    { id: "espresso", name: { vi: "Espresso", en: "Espresso" } },
    { id: "coldbrew", name: { vi: "Cold Brew", en: "Cold Brew" } },
    { id: "signature", name: { vi: "Đặc Biệt", en: "Signature" } },
    { id: "pastry", name: { vi: "Bánh Ngọt", en: "Pastries" } },
  ];

  useEffect(() => {
    // Load products data
    fetch("/src/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setIsLoading(false);
      })
      .catch(() => {
        // Fallback mock data
        const mockProducts = [
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
            id: "cap-classic",
            name: { vi: "Cappuccino Cổ Điển", en: "Classic Cappuccino" },
            description: {
              vi: "Espresso kết hợp với sữa tươi được đánh bông mịn",
              en: "Espresso with perfectly steamed milk foam",
            },
            price: 50000,
            category: "espresso",
            featured: false,
            image:
              "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=300&fit=crop",
          },
          {
            id: "latte-vanilla",
            name: { vi: "Latte Vani", en: "Vanilla Latte" },
            description: {
              vi: "Latte thơm ngọt với syrup vani tự nhiên",
              en: "Sweet latte with natural vanilla syrup",
            },
            price: 55000,
            category: "espresso",
            featured: false,
            image:
              "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=300&h=300&fit=crop",
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
            id: "cb-orange",
            name: { vi: "Cold Brew Cam Tươi", en: "Orange Cold Brew" },
            description: {
              vi: "Cold brew kết hợp với cam tươi ngọt mát",
              en: "Cold brew combined with fresh orange",
            },
            price: 60000,
            category: "coldbrew",
            featured: false,
            image:
              "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=300&h=300&fit=crop",
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
          {
            id: "croissant",
            name: { vi: "Bánh Sừng Bò", en: "Croissant" },
            description: {
              vi: "Bánh sừng bò bơ tươi, giòn tan",
              en: "Fresh butter croissant, crispy and flaky",
            },
            price: 35000,
            category: "pastry",
            featured: false,
            image:
              "https://images.unsplash.com/photo-1555507036-ab794f0eca5b?w=300&h=300&fit=crop",
          },
          {
            id: "tiramisu",
            name: { vi: "Tiramisu", en: "Tiramisu" },
            description: {
              vi: "Bánh tiramisu với hương cà phê đặc trưng",
              en: "Classic tiramisu with coffee flavor",
            },
            price: 65000,
            category: "pastry",
            featured: true,
            image:
              "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=300&fit=crop",
          },
        ];
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name[language]
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.description[language]
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, products, language]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-coffee-900 to-coffee-800 text-cream-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold font-serif mb-6">
              {t("nav.menu")}
            </h1>
            <p className="text-xl lg:text-2xl text-cream-200 max-w-3xl mx-auto">
              {t("featured.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-background border-b border-coffee-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    selectedCategory === category.id
                      ? "bg-coffee-900 text-cream-100"
                      : "border-coffee-300 text-coffee-900 hover:bg-coffee-50",
                  )}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {category.name[language]}
                </Button>
              ))}
            </div>

            {/* Search */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coffee-400 w-4 h-4" />
              <Input
                type="text"
                placeholder={
                  language === "vi"
                    ? "Tìm kiếm sản phẩm..."
                    : "Search products..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-coffee-300 focus:border-coffee-500"
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4">
            <p className="text-coffee-600">
              {language === "vi"
                ? `Hiển thị ${filteredProducts.length} sản phẩm`
                : `Showing ${filteredProducts.length} products`}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin w-12 h-12 border-4 border-coffee-200 border-t-coffee-900 rounded-full mx-auto"></div>
              <p className="mt-4 text-coffee-600">{t("common.loading")}</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-coffee-600">
                {language === "vi"
                  ? "Không tìm thấy sản phẩm nào"
                  : "No products found"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <Card
                  key={product.id}
                  className={cn(
                    "group hover-lift border-coffee-200 hover:border-coffee-300 transition-all duration-300",
                    `fade-in-up animation-delay-${index * 100}`,
                  )}
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name[language]}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.featured && (
                      <Badge className="absolute top-3 left-3 bg-coffee-900 text-cream-100">
                        {language === "vi" ? "Nổi bật" : "Featured"}
                      </Badge>
                    )}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-coffee-900 px-2 py-1 rounded-full text-sm font-medium">
                      {formatPrice(product.price)}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg font-semibold text-coffee-900 mb-2 font-serif line-clamp-1">
                      {product.name[language]}
                    </CardTitle>
                    <CardDescription className="text-coffee-600 mb-4 line-clamp-2 text-sm">
                      {product.description[language]}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                        <span className="text-xs text-coffee-500 ml-1">
                          (4.8)
                        </span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-coffee-900 text-cream-100 hover:bg-coffee-800 h-8 px-3 text-xs"
                      >
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        {language === "vi" ? "Đặt" : "Order"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-coffee-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-coffee-900 font-serif mb-4">
            {language === "vi"
              ? "Muốn đặt bàn trước?"
              : "Want to reserve a table?"}
          </h2>
          <p className="text-lg text-coffee-600 mb-8">
            {language === "vi"
              ? "Đặt bàn ngay để được phục vụ tốt nhất và không phải chờ đợi"
              : "Book a table now for the best service and no waiting"}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-coffee-900 text-cream-100 hover:bg-coffee-800 px-8 py-6 text-lg"
          >
            <a href="/booking">{t("hero.booking")}</a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Menu;
