import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Settings,
  ShoppingBag,
  Heart,
  LogOut,
  Shield,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";

export const UserMenu: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleAdminDashboard = () => {
    navigate("/admin");
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full hover:bg-coffee-100"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-coffee-900 text-cream-100">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 border-coffee-200 shadow-lg"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-coffee-900">
              {user.name}
            </p>
            <p className="text-xs leading-none text-coffee-500">{user.email}</p>
            {isAdmin && (
              <div className="flex items-center space-x-1 mt-1">
                <Shield className="w-3 h-3 text-coffee-700" />
                <span className="text-xs text-coffee-700 font-medium">
                  {language === "vi" ? "Quản trị viên" : "Administrator"}
                </span>
              </div>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-coffee-200" />

        {isAdmin && (
          <>
            <DropdownMenuItem
              onClick={handleAdminDashboard}
              className="text-coffee-900 hover:bg-coffee-50 cursor-pointer"
            >
              <Shield className="mr-2 h-4 w-4" />
              <span>
                {language === "vi" ? "Quản lý hệ thống" : "Admin Dashboard"}
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-coffee-200" />
          </>
        )}

        <DropdownMenuItem className="text-coffee-900 hover:bg-coffee-50 cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>{language === "vi" ? "Hồ sơ" : "Profile"}</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="text-coffee-900 hover:bg-coffee-50 cursor-pointer">
          <ShoppingBag className="mr-2 h-4 w-4" />
          <span>{language === "vi" ? "Đơn hàng" : "Orders"}</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="text-coffee-900 hover:bg-coffee-50 cursor-pointer">
          <Heart className="mr-2 h-4 w-4" />
          <span>{language === "vi" ? "Yêu thích" : "Favorites"}</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="text-coffee-900 hover:bg-coffee-50 cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>{language === "vi" ? "Cài đặt" : "Settings"}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-coffee-200" />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-600 hover:bg-red-50 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{language === "vi" ? "Đăng xuất" : "Sign out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
