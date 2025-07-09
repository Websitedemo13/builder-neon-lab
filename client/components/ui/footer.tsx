import React from "react";
import { Link } from "react-router-dom";
import { Coffee, MapPin, Phone, Mail, Clock, Facebook } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-coffee-900 text-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-cream-100 rounded-lg">
                <Coffee className="w-6 h-6 text-coffee-900" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif">Sống KOFFI</h3>
                <p className="text-sm text-cream-300">{t("hero.slogan1")}</p>
              </div>
            </div>
            <p className="text-cream-200 text-sm leading-relaxed">
              {t("about.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-cream-100">
              {t("nav.home")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-cream-200 hover:text-cream-100 transition-colors text-sm"
                >
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/menu"
                  className="text-cream-200 hover:text-cream-100 transition-colors text-sm"
                >
                  {t("nav.menu")}
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-cream-200 hover:text-cream-100 transition-colors text-sm"
                >
                  {t("nav.blog")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-cream-200 hover:text-cream-100 transition-colors text-sm"
                >
                  {t("nav.contact")}
                </Link>
              </li>
              <li>
                <Link
                  to="/booking"
                  className="text-cream-200 hover:text-cream-100 transition-colors text-sm"
                >
                  {t("nav.booking")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-cream-100">
              {t("contact.title")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-1 text-cream-300 flex-shrink-0" />
                <span className="text-cream-200 text-sm leading-relaxed">
                  {t("contact.address")}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-cream-300 flex-shrink-0" />
                <a
                  href="tel:0867950728"
                  className="text-cream-200 hover:text-cream-100 transition-colors text-sm"
                >
                  0867 950 728
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-cream-300 flex-shrink-0" />
                <a
                  href="mailto:songkoffi.1706@gmail.com"
                  className="text-cream-200 hover:text-cream-100 transition-colors text-sm"
                >
                  songkoffi.1706@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-4 h-4 mt-1 text-cream-300 flex-shrink-0" />
                <span className="text-cream-200 text-sm">
                  {t("contact.hours.value")}
                </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-cream-100">
              Social Media
            </h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/SongKOFFI166"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-coffee-800 rounded-lg hover:bg-coffee-700 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <p className="text-cream-200 text-sm leading-relaxed">
              {t("hero.slogan2")}
            </p>
          </div>
        </div>

        <div className="border-t border-coffee-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-cream-300 text-sm">
              © 2024 Sống KOFFI. All rights reserved.
            </p>
            <p className="text-cream-300 text-sm mt-2 md:mt-0">
              Made with ☕ and ❤️ in Ho Chi Minh City
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
