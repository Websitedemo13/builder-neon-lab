import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  avatar?: string;
  phone?: string;
  joinedDate: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data on app load
    const storedUser = localStorage.getItem("song-koffi-user");
    const storedToken = localStorage.getItem("song-koffi-token");

    if (storedUser && storedToken) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        localStorage.removeItem("song-koffi-user");
        localStorage.removeItem("song-koffi-token");
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock authentication logic
      let userData: User;

      if (email === "admin@songkoffi.com" && password === "admin123") {
        userData = {
          id: "admin-1",
          name: "Admin KOFFI",
          email: "admin@songkoffi.com",
          role: "admin",
          avatar:
            "https://ui-avatars.com/api/?name=Admin+KOFFI&background=5D3A00&color=fff",
          joinedDate: "2023-01-01",
        };
      } else if (email === "user@songkoffi.com" && password === "user123") {
        userData = {
          id: "user-1",
          name: "Coffee Lover",
          email: "user@songkoffi.com",
          role: "user",
          avatar:
            "https://ui-avatars.com/api/?name=Coffee+Lover&background=8B5A2B&color=fff",
          joinedDate: new Date().toISOString().split("T")[0],
        };
      } else {
        // For demo purposes, any email with valid format can login as user
        if (email.includes("@") && password.length >= 6) {
          userData = {
            id: `user-${Date.now()}`,
            name: email.split("@")[0],
            email: email,
            role: "user",
            avatar: `https://ui-avatars.com/api/?name=${email.split("@")[0]}&background=8B5A2B&color=fff`,
            joinedDate: new Date().toISOString().split("T")[0],
          };
        } else {
          throw new Error("Invalid credentials");
        }
      }

      // Store auth data
      const token = "mock-jwt-token-" + Date.now();
      localStorage.setItem("song-koffi-user", JSON.stringify(userData));
      localStorage.setItem("song-koffi-token", token);

      setUser(userData);
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (data: SignupData): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userData: User = {
        id: `user-${Date.now()}`,
        name: data.name,
        email: data.email,
        role: "user",
        phone: data.phone,
        avatar: `https://ui-avatars.com/api/?name=${data.name}&background=8B5A2B&color=fff`,
        joinedDate: new Date().toISOString().split("T")[0],
      };

      // Store auth data
      const token = "mock-jwt-token-" + Date.now();
      localStorage.setItem("song-koffi-user", JSON.stringify(userData));
      localStorage.setItem("song-koffi-token", token);

      setUser(userData);
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("song-koffi-user");
    localStorage.removeItem("song-koffi-token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
