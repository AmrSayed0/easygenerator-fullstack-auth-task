import React, { useState, useEffect, type ReactNode } from "react";
import { toast } from "react-toastify";
import { authService } from "../services/authService";
import type { User, AuthContextType } from "../types/auth";
import { AuthContext } from "./AuthContextProvider";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated on app start
    const token = localStorage.getItem("token");
    if (token) {
      // Verify token and get user profile
      authService
        .getProfile()
        .then((userData: User) => {
          setUser(userData);
        })
        .catch(() => {
          // Token is invalid, remove it
          localStorage.removeItem("token");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);
  const signIn = async (email: string, password: string): Promise<void> => {
    const response = await authService
      .signIn(email, password)
      .catch((error) => {
        throw error;
      });
    localStorage.setItem("token", response.accessToken);
    setUser(response.user);
    // console.log("Showing sign-in toast - should auto-close in 3 seconds");
    toast.success("Welcome back!", {
      autoClose: 3000,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      closeOnClick: true,
      toastId: "sign-in-success",
    });
  };
  const signUp = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    const response = await authService.signUp(name, email, password);
    localStorage.setItem("token", response.accessToken);
    setUser(response.user);
    toast.success("Account created successfully!", {
      autoClose: 3000,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      closeOnClick: true,
    });
  };
  const signOut = async (): Promise<void> => {
    try {
      await authService.signOut();
    } catch (error) {
      // Even if logout fails on server, clear local storage
      console.error("Logout error:", error);
    }

    localStorage.removeItem("token");
    setUser(null);
    toast.info("You have been signed out", {
      autoClose: 3000,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      closeOnClick: true,
    });
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children} </AuthContext.Provider>;
};
