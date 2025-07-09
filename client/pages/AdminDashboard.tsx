import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  Users,
  ShoppingBag,
  Coffee,
  Calendar,
  MessageSquare,
  Settings,
  TrendingUp,
  DollarSign,
  Package,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";

const AdminDashboard: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  const stats = [
    {
      title: language === "vi" ? "Tổng Doanh Thu" : "Total Revenue",
      value: "₫15,420,000",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: language === "vi" ? "Đơn Hàng Hôm Nay" : "Today's Orders",
      value: "47",
      change: "+8.2%",
      icon: ShoppingBag,
      color: "text-blue-600",
    },
    {
      title: language === "vi" ? "Khách Hàng Mới" : "New Customers",
      value: "23",
      change: "+15.3%",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: language === "vi" ? "Sản Phẩm Bán Chạy" : "Popular Products",
      value: "12",
      change: "+5.7%",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ];

  const quickActions = [
    {
      title: language === "vi" ? "Quản Lý Menu" : "Manage Menu",
      description:
        language === "vi"
          ? "Thêm, sửa, xóa sản phẩm"
          : "Add, edit, delete products",
      icon: Coffee,
      color: "bg-coffee-100 text-coffee-700",
    },
    {
      title: language === "vi" ? "Đặt Bàn" : "Reservations",
      description:
        language === "vi"
          ? "Xem và quản lý đặt bàn"
          : "View and manage bookings",
      icon: Calendar,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: language === "vi" ? "Đơn Hàng" : "Orders",
      description:
        language === "vi" ? "Theo dõi đơn hàng" : "Track customer orders",
      icon: Package,
      color: "bg-green-100 text-green-700",
    },
    {
      title: language === "vi" ? "Tin Tức" : "Blog Posts",
      description:
        language === "vi" ? "Quản lý bài viết blog" : "Manage blog articles",
      icon: MessageSquare,
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: language === "vi" ? "Thống Kê" : "Analytics",
      description:
        language === "vi" ? "Xem báo cáo chi tiết" : "View detailed reports",
      icon: BarChart3,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: language === "vi" ? "Cài Đặt" : "Settings",
      description:
        language === "vi" ? "Cấu hình hệ thống" : "System configuration",
      icon: Settings,
      color: "bg-gray-100 text-gray-700",
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-coffee-900 font-serif">
            {language === "vi" ? "Trang Quản Trị" : "Admin Dashboard"}
          </h1>
          <p className="text-coffee-600 mt-2">
            {language === "vi"
              ? `Chào mừng trở lại, ${user?.name}!`
              : `Welcome back, ${user?.name}!`}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-coffee-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-coffee-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-coffee-900">
                      {stat.value}
                    </p>
                    <p className={`text-sm ${stat.color}`}>
                      {stat.change}{" "}
                      {language === "vi"
                        ? "so với tháng trước"
                        : "from last month"}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-full ${stat.color} bg-opacity-10`}
                  >
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="border-coffee-200 mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-coffee-900">
              {language === "vi" ? "Thao Tác Nhanh" : "Quick Actions"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="h-auto p-4 justify-start hover:bg-coffee-50"
                  onClick={() => {
                    // Handle navigation to specific admin sections
                    console.log(`Navigate to ${action.title}`);
                  }}
                >
                  <div className="flex items-center space-x-4 w-full">
                    <div className={`p-3 rounded-lg ${action.color}`}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-coffee-900">
                        {action.title}
                      </p>
                      <p className="text-sm text-coffee-600">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-coffee-200">
            <CardHeader>
              <CardTitle className="text-lg font-serif text-coffee-900">
                {language === "vi" ? "Đơn Hàng Gần Đây" : "Recent Orders"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((order) => (
                  <div
                    key={order}
                    className="flex items-center justify-between p-3 bg-coffee-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-coffee-900">
                        #{language === "vi" ? "ĐH" : "ORD"}00{order}
                      </p>
                      <p className="text-sm text-coffee-600">
                        {language === "vi" ? "Khách hàng" : "Customer"} #{order}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-coffee-900">
                        ₫{(Math.random() * 500000 + 100000).toLocaleString()}
                      </p>
                      <p className="text-sm text-green-600">
                        {language === "vi" ? "Hoàn thành" : "Completed"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-coffee-200">
            <CardHeader>
              <CardTitle className="text-lg font-serif text-coffee-900">
                {language === "vi" ? "Đặt Bàn Hôm Nay" : "Today's Reservations"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: "08:00", name: "Nguyễn Văn A", guests: 2 },
                  { time: "10:30", name: "Trần Thị B", guests: 4 },
                  { time: "14:00", name: "Lê Văn C", guests: 1 },
                  { time: "16:30", name: "Phạm Thị D", guests: 3 },
                ].map((booking, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-coffee-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-coffee-900">
                        {booking.time}
                      </p>
                      <p className="text-sm text-coffee-600">{booking.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-coffee-600">
                        {booking.guests}{" "}
                        {language === "vi" ? "người" : "guests"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-8 text-center p-8 bg-coffee-50 rounded-2xl">
          <Coffee className="w-12 h-12 mx-auto mb-4 text-coffee-600" />
          <h3 className="text-2xl font-bold text-coffee-900 font-serif mb-2">
            {language === "vi" ? "Đang Phát Triển" : "Under Development"}
          </h3>
          <p className="text-coffee-600 max-w-2xl mx-auto">
            {language === "vi"
              ? "Các tính năng quản lý chi tiết đang được phát triển. Bạn có thể sử dụng các chức năng cơ bản hiện tại và chờ cập nhật trong tương lai."
              : "Detailed management features are under development. You can use the current basic functions and wait for future updates."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
