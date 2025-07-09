import React, { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogOverlay } from "./dialog";
import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";
import { cn } from "@/lib/utils";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = "login",
}) => {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);

  const handleClose = () => {
    onClose();
    // Reset mode after a delay to avoid flickering
    setTimeout(() => setMode("login"), 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogOverlay className="bg-black/60 backdrop-blur-sm" />
      <DialogContent
        className={cn(
          "max-w-md p-0 border-0 shadow-2xl bg-transparent",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        )}
      >
        <div className="relative">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute -top-4 -right-4 z-10 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-coffee-600 hover:text-coffee-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Form content */}
          <div className="transform transition-all duration-300 ease-in-out">
            {mode === "login" ? (
              <LoginForm
                onSwitchToSignup={() => setMode("signup")}
                onClose={handleClose}
              />
            ) : (
              <SignupForm
                onSwitchToLogin={() => setMode("login")}
                onClose={handleClose}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
