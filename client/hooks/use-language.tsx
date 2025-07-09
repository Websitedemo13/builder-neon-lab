import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Language = "vi" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

interface Translations {
  [key: string]: {
    vi: string;
    en: string;
  };
}

const translations: Translations = {
  // Navigation
  "nav.home": { vi: "Trang Chủ", en: "Home" },
  "nav.menu": { vi: "Thực Đơn", en: "Menu" },
  "nav.blog": { vi: "Tin Tức", en: "Blog" },
  "nav.contact": { vi: "Liên Hệ", en: "Contact" },
  "nav.booking": { vi: "Đặt Bàn", en: "Booking" },

  // Homepage
  "hero.slogan1": {
    vi: 'Sống một đời "Không phí"',
    en: 'Live a Life "Without Waste"',
  },
  "hero.slogan2": {
    vi: "Cà Phê Bên Lề – Chuyện Đời Bên Tai",
    en: "Roadside Coffee – Life Stories by Your Side",
  },
  "hero.cta": { vi: "Khám Phá Menu", en: "Explore Menu" },
  "hero.booking": { vi: "Đặt Bàn Ngay", en: "Book Now" },

  // Featured Products
  "featured.title": { vi: "Sản Phẩm Nổi Bật", en: "Featured Products" },
  "featured.subtitle": {
    vi: "Những món cà phê đặc biệt được yêu thích nhất",
    en: "Most beloved specialty coffee drinks",
  },

  // Latest Posts
  "blog.title": { vi: "Tin Tức Mới Nhất", en: "Latest News" },
  "blog.subtitle": {
    vi: "Khám phá những câu chuyện thú vị về cà phê",
    en: "Discover interesting stories about coffee",
  },
  "blog.readMore": { vi: "Đọc Thêm", en: "Read More" },

  // About Section
  "about.title": { vi: "Về Sống KOFFI", en: "About Sống KOFFI" },
  "about.description": {
    vi: "Chào mừng đến với Sống KOFFI - nơi mang đến cho bạn trải nghiệm cà phê đích thực với không gian ấm cúng và những câu chuyện đời thường.",
    en: "Welcome to Sống KOFFI - where we bring you authentic coffee experiences with cozy atmosphere and everyday life stories.",
  },

  // Contact
  "contact.title": { vi: "Liên Hệ", en: "Contact Us" },
  "contact.address": {
    vi: "770B Sư Vạn Hạnh, Phường 12, Quận 10, TP. HCM",
    en: "770B Su Van Hanh, Ward 12, District 10, Ho Chi Minh City",
  },
  "contact.phone": { vi: "Điện thoại", en: "Phone" },
  "contact.email": { vi: "Email", en: "Email" },
  "contact.hours": { vi: "Giờ mở cửa", en: "Opening Hours" },
  "contact.hours.value": {
    vi: "6:00 - 22:00 (Thứ 2 - Chủ Nhật)",
    en: "6:00 AM - 10:00 PM (Mon - Sun)",
  },

  // Menu
  "menu.categories.espresso": { vi: "Espresso", en: "Espresso" },
  "menu.categories.coldbrew": { vi: "Cold Brew", en: "Cold Brew" },
  "menu.categories.signature": { vi: "Đặc Biệt", en: "Signature" },
  "menu.categories.pastry": { vi: "Bánh Ngọt", en: "Pastries" },

  // Booking
  "booking.title": { vi: "Đặt Bàn", en: "Make a Reservation" },
  "booking.form.name": { vi: "Họ và tên", en: "Full Name" },
  "booking.form.phone": { vi: "Số điện thoại", en: "Phone Number" },
  "booking.form.date": { vi: "Ngày", en: "Date" },
  "booking.form.time": { vi: "Giờ", en: "Time" },
  "booking.form.guests": { vi: "Số khách", en: "Number of Guests" },
  "booking.form.area": { vi: "Khu vực", en: "Area" },
  "booking.form.area.indoor": { vi: "Trong nhà", en: "Indoor" },
  "booking.form.area.outdoor": { vi: "Ngoài trời", en: "Outdoor" },
  "booking.form.area.sofa": { vi: "Khu Sofa", en: "Sofa Area" },
  "booking.form.notes": { vi: "Ghi chú", en: "Notes" },
  "booking.form.submit": { vi: "Đặt Bàn", en: "Book Table" },

  // Authentication
  "auth.login": { vi: "Đăng Nhập", en: "Sign In" },
  "auth.signup": { vi: "Đăng Ký", en: "Sign Up" },
  "auth.logout": { vi: "Đăng Xuất", en: "Sign Out" },
  "auth.profile": { vi: "Hồ Sơ", en: "Profile" },
  "auth.orders": { vi: "Đơn Hàng", en: "Orders" },
  "auth.favorites": { vi: "Yêu Thích", en: "Favorites" },
  "auth.settings": { vi: "Cài Đặt", en: "Settings" },
  "auth.admin": { vi: "Quản Trị", en: "Admin" },

  // Common
  "common.loading": { vi: "Đang tải...", en: "Loading..." },
  "common.error": { vi: "Có lỗi xảy ra", en: "An error occurred" },
  "common.success": { vi: "Thành công!", en: "Success!" },
  "common.viewAll": { vi: "Xem Tất Cả", en: "View All" },
  "common.close": { vi: "Đóng", en: "Close" },
  "common.submit": { vi: "Gửi", en: "Submit" },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("vi");

  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      "song-koffi-language",
    ) as Language;
    if (savedLanguage && (savedLanguage === "vi" || savedLanguage === "en")) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("song-koffi-language", lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
