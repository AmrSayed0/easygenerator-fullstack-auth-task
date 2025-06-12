import axios, { AxiosResponse } from "axios";
import type {
  SignInRequest,
  SignUpRequest,
  AuthResponse,
  User,
  ApiError,
} from "../types/auth";
import { API_CONFIG, logApiError } from "../config/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: API_CONFIG.TIMEOUT,
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error details for debugging
    logApiError("API Request", error);

    if (error.response?.status === 401) {
      // Token expired or invalid, remove it
      localStorage.removeItem("token");
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export const authService = {
  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<AuthResponse> = await api.post(
        "/auth/signin",
        {
          email,
          password,
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("SignIn Error:", error);

      // Check if it's a network error
      if (!error.response) {
        throw new Error(
          "Network error: Unable to connect to server. Please check if the backend is running on http://localhost:3000"
        );
      }

      const apiError: ApiError = error.response?.data || {
        message: "Network error occurred",
        error: "NetworkError",
        statusCode: 500,
      };
      throw new Error(
        Array.isArray(apiError.message) ? apiError.message[0] : apiError.message
      );
    }
  },

  async signUp(
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse> {
    try {
      const requestData: SignUpRequest = { email, password };
      if (name.trim()) {
        requestData.name = name.trim();
      }

      const response: AxiosResponse<AuthResponse> = await api.post(
        "/auth/signup",
        requestData
      );
      return response.data;
    } catch (error: any) {
      const apiError: ApiError = error.response?.data || {
        message: "Network error occurred",
        error: "NetworkError",
        statusCode: 500,
      };
      throw new Error(
        Array.isArray(apiError.message) ? apiError.message[0] : apiError.message
      );
    }
  },

  async signOut(): Promise<void> {
    try {
      await api.post("/auth/logout");
    } catch (error: any) {
      // Even if server logout fails, we'll clear local storage
      console.error("Server logout failed:", error);
      throw error;
    }
  },

  async getProfile(): Promise<User> {
    try {
      const response: AxiosResponse<User> = await api.get("/users/profile");
      return response.data;
    } catch (error: any) {
      const apiError: ApiError = error.response?.data || {
        message: "Network error occurred",
        error: "NetworkError",
        statusCode: 500,
      };
      throw new Error(
        Array.isArray(apiError.message) ? apiError.message[0] : apiError.message
      );
    }
  },
};
