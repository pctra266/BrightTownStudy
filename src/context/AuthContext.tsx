import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { authService } from "../features/Auth/services/authService";

interface User {
  id: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (
    username: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<boolean>;
  register: (
    username: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const tokenCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const initializeAuth = () => {
      const token = authService.getToken();
      const storedUser = authService.getUser();

      if (token && storedUser) {
        const userData = authService.verifyToken(token);
        if (userData) {
          setUser(storedUser);
        } else {
          authService.logout();
          setUser(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();

    tokenCheckIntervalRef.current = setInterval(() => {
      const token = authService.getToken();
      const currentUser = authService.getUser();

      if (token && currentUser) {
        const userData = authService.verifyToken(token);
        if (!userData) {
          authService.logout();
          setUser(null);
          sessionStorage.setItem("sessionExpired", "true");

          const protectedRoutes = ["/user", "/admin"];
          const currentPath = window.location.pathname;

          if (protectedRoutes.some((route) => currentPath.startsWith(route))) {
            window.location.href = "/login";
          }
        }
      }
    }, 30000);

    return () => {
      if (tokenCheckIntervalRef.current) {
        clearInterval(tokenCheckIntervalRef.current);
      }
    };
  }, []);

  const login = async (
    username: string,
    password: string,
    rememberMe: boolean = false
  ): Promise<boolean> => {
    const result = await authService.login(username, password, rememberMe);

    if (result.success && result.user) {
      const userData: User = {
        id: result.user.id,
        username: result.user.username,
        role: result.user.role,
      };

      setUser(userData);
      return true;
    }

    return false;
  };

  const register = async (
    username: string,
    password: string
  ): Promise<{ success: boolean; message: string }> => {
    const result = await authService.register(username, password);
    return {
      success: result.success,
      message: result.message,
    };
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
