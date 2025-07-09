import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Coffee, Globe, LogIn, UserPlus } from "lucide-react";
import { Button } from "./button";
import { AuthModal } from "./auth-modal";
import { UserMenu } from "./user-menu";
import { useLanguage } from "@/hooks/use-language";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: t("nav.home") },
    { path: "/menu", label: t("nav.menu") },
    { path: "/blog", label: t("nav.blog") },
    { path: "/contact", label: t("nav.contact") },
    { path: "/booking", label: t("nav.booking") },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "vi" ? "en" : "vi");
  };

  const openAuthModal = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/90 backdrop-blur-md shadow-lg"
            : "bg-transparent",
        )}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-coffee-900 rounded-lg group-hover:bg-coffee-800 transition-colors">
              <Coffee className="w-6 h-6 text-cream-100" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-bold text-coffee-900 font-serif">
                Sống KOFFI
              </h1>
              <p className="text-xs text-coffee-600 -mt-1">
                {language === "vi" ? "Không phí" : "Without Waste"}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-coffee-900",
                  location.pathname === item.path
                    ? "text-coffee-900 font-semibold"
                    : "text-coffee-600",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex items-center space-x-1 text-coffee-600 hover:text-coffee-900"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language.toUpperCase()}
              </span>
            </Button>

            {/* Auth Buttons or User Menu */}
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <div className="hidden lg:flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openAuthModal("login")}
                  className="text-coffee-600 hover:text-coffee-900"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  {language === "vi" ? "Đăng nhập" : "Sign In"}
                </Button>
                <Button
                  size="sm"
                  onClick={() => openAuthModal("signup")}
                  className="bg-coffee-900 text-cream-100 hover:bg-coffee-800"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  {language === "vi" ? "Đăng ký" : "Sign Up"}
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-coffee-200 bg-background/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                    location.pathname === item.path
                      ? "text-coffee-900 bg-coffee-100"
                      : "text-coffee-600 hover:text-coffee-900 hover:bg-coffee-50",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                variant="ghost"
                onClick={toggleLanguage}
                className="w-full justify-start px-3 py-2 text-coffee-600 hover:text-coffee-900"
              >
                <Globe className="w-4 h-4 mr-2" />
                {language === "vi" ? "English" : "Tiếng Việt"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};