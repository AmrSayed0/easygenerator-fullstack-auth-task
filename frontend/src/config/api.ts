// Development configuration for API debugging
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

export const DEBUG_MODE = import.meta.env.DEV;

export const logApiError = (operation: string, error: any) => {
  if (DEBUG_MODE) {
    console.group(`API Error - ${operation}`);
    console.error("Error details:", error);
    console.error("Error message:", error.message);
    console.error("Error response:", error.response);
    console.error("Error code:", error.code);
    console.groupEnd();
  }
};
