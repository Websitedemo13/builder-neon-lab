import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Coffee, ArrowRight } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Card, CardContent, CardHeader } from "./card";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onClose: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSwitchToSignup,
  onClose,
}) => {
  const { login, isLoading } = useAuth();
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError(
        language === "vi"
          ? "Vui lòng điền đầy đủ thông tin"
          : "Please fill in all fields",
      );
      return;
    }

    const success = await login(formData.email, formData.password);
    if (success) {
      onClose();
    } else {
      setError(
        language === "vi"
          ? "Email hoặc mật khẩu không đúng"
          : "Invalid email or password",
      );
    }
  };

  const handleDemoLogin = async (type: "admin" | "user") => {
    setError("");
    if (type === "admin") {
      await login("admin@songkoffi.com", "admin123");
    } else {
      await login("user@songkoffi.com", "user123");
    }
    onClose();
  };

  return (
    <Card className="w-full max-w-md mx-auto border-coffee-200 shadow-2xl">
      <CardHeader className="text-center pb-2">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-coffee-900 rounded-full">
            <Coffee className="w-8 h-8 text-cream-100" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-coffee-900 font-serif">
          {language === "vi" ? "Đăng Nhập" : "Welcome Back"}
        </h2>
        <p className="text-coffee-600">
          {language === "vi"
            ? "Chào mừng bạn trở lại Sống KOFFI"
            : "Sign in to your account"}
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-coffee-900">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-coffee-400" />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                className="pl-10 border-coffee-300 focus:border-coffee-500 h-12"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-coffee-900">
              {language === "vi" ? "Mật khẩu" : "Password"}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-coffee-400" />
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder={
                  language === "vi" ? "Nhập mật khẩu" : "Enter password"
                }
                className="pl-10 pr-10 border-coffee-300 focus:border-coffee-500 h-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-coffee-400 hover:text-coffee-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full h-12 bg-coffee-900 text-cream-100 hover:bg-coffee-800 font-semibold transition-all duration-300",
              isLoading && "opacity-50 cursor-not-allowed",
            )}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-cream-100 border-t-transparent rounded-full animate-spin"></div>
                <span>
                  {language === "vi" ? "Đang đăng nhập..." : "Signing in..."}
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>{language === "vi" ? "Đăng Nhập" : "Sign In"}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </Button>
        </form>

        {/* Demo Accounts */}
        <div className="border-t border-coffee-200 pt-4">
          <p className="text-xs text-coffee-500 text-center mb-3">
            {language === "vi" ? "Tài khoản demo:" : "Demo accounts:"}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDemoLogin("admin")}
              className="border-coffee-300 text-coffee-900 hover:bg-coffee-50 text-xs"
            >
              {language === "vi" ? "Admin Demo" : "Admin Demo"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDemoLogin("user")}
              className="border-coffee-300 text-coffee-900 hover:bg-coffee-50 text-xs"
            >
              {language === "vi" ? "User Demo" : "User Demo"}
            </Button>
          </div>
        </div>

        {/* Sign up link */}
        <div className="text-center border-t border-coffee-200 pt-4">
          <p className="text-sm text-coffee-600">
            {language === "vi"
              ? "Chưa có tài khoản?"
              : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-coffee-900 font-semibold hover:text-coffee-700 transition-colors"
            >
              {language === "vi" ? "Đăng ký ngay" : "Sign up"}
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
