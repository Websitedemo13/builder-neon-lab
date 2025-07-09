import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Coffee,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Card, CardContent, CardHeader } from "./card";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";

interface SignupFormProps {
  onSwitchToLogin: () => void;
  onClose: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({
  onSwitchToLogin,
  onClose,
}) => {
  const { signup, isLoading } = useAuth();
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");

    // Calculate password strength
    if (name === "password") {
      let strength = 0;
      if (value.length >= 8) strength++;
      if (/[A-Z]/.test(value)) strength++;
      if (/[a-z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^A-Za-z0-9]/.test(value)) strength++;
      setPasswordStrength(strength);
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return {
          text: language === "vi" ? "Yếu" : "Weak",
          color: "text-red-500",
        };
      case 2:
        return {
          text: language === "vi" ? "Trung bình" : "Fair",
          color: "text-yellow-500",
        };
      case 3:
        return {
          text: language === "vi" ? "Tốt" : "Good",
          color: "text-blue-500",
        };
      case 4:
      case 5:
        return {
          text: language === "vi" ? "Rất tốt" : "Strong",
          color: "text-green-500",
        };
      default:
        return { text: "", color: "" };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError(
        language === "vi"
          ? "Vui lòng điền đầy đủ thông tin bắt buộc"
          : "Please fill in all required fields",
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(
        language === "vi"
          ? "Mật khẩu xác nhận không khớp"
          : "Passwords do not match",
      );
      return;
    }

    if (formData.password.length < 6) {
      setError(
        language === "vi"
          ? "Mật khẩu phải có ít nhất 6 ký tự"
          : "Password must be at least 6 characters",
      );
      return;
    }

    const success = await signup({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });

    if (success) {
      onClose();
    } else {
      setError(
        language === "vi"
          ? "Có lỗi xảy ra, vui lòng thử lại"
          : "Something went wrong, please try again",
      );
    }
  };

  const strengthColor = getPasswordStrengthText();

  return (
    <Card className="w-full max-w-md mx-auto border-coffee-200 shadow-2xl">
      <CardHeader className="text-center pb-2">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-coffee-900 rounded-full">
            <Coffee className="w-8 h-8 text-cream-100" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-coffee-900 font-serif">
          {language === "vi" ? "Tạo Tài Khoản" : "Join Song KOFFI"}
        </h2>
        <p className="text-coffee-600">
          {language === "vi"
            ? "Tham gia cộng đồng yêu cà phê"
            : "Join our coffee community"}
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
              {language === "vi" ? "Họ và tên" : "Full Name"} *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-coffee-400" />
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={
                  language === "vi" ? "Nhập họ và tên" : "Enter your full name"
                }
                className="pl-10 border-coffee-300 focus:border-coffee-500 h-12"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-coffee-900">
              Email *
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
              {language === "vi" ? "Số điện thoại" : "Phone Number"}
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-coffee-400" />
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={
                  language === "vi" ? "Số điện thoại" : "Phone number"
                }
                className="pl-10 border-coffee-300 focus:border-coffee-500 h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-coffee-900">
              {language === "vi" ? "Mật khẩu" : "Password"} *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-coffee-400" />
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder={
                  language === "vi" ? "Tạo mật khẩu" : "Create password"
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
            {formData.password && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-1">
                    <div
                      className={cn(
                        "h-1 rounded-full transition-all duration-300",
                        passwordStrength === 1 && "w-1/5 bg-red-500",
                        passwordStrength === 2 && "w-2/5 bg-yellow-500",
                        passwordStrength === 3 && "w-3/5 bg-blue-500",
                        passwordStrength >= 4 && "w-full bg-green-500",
                      )}
                    ></div>
                  </div>
                  <span className={cn("text-xs", strengthColor.color)}>
                    {strengthColor.text}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-coffee-900">
              {language === "vi" ? "Xác nhận mật khẩu" : "Confirm Password"} *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-coffee-400" />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder={
                  language === "vi" ? "Nhập lại mật khẩu" : "Confirm password"
                }
                className="pl-10 pr-10 border-coffee-300 focus:border-coffee-500 h-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-coffee-400 hover:text-coffee-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
              {formData.confirmPassword &&
                formData.password === formData.confirmPassword && (
                  <CheckCircle className="absolute right-10 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                )}
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
                  {language === "vi" ? "Đang tạo tài khoản..." : "Creating..."}
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>
                  {language === "vi" ? "Tạo Tài Khoản" : "Create Account"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </Button>
        </form>

        {/* Login link */}
        <div className="text-center border-t border-coffee-200 pt-4">
          <p className="text-sm text-coffee-600">
            {language === "vi"
              ? "Đã có tài khoản?"
              : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-coffee-900 font-semibold hover:text-coffee-700 transition-colors"
            >
              {language === "vi" ? "Đăng nhập" : "Sign in"}
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
