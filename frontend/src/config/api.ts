// Development configuration for API debugging
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

export const DEBUG_MODE = import.meta.env.DEV;

export const logApiError = (operation: string, error: unknown) => {
  if (DEBUG_MODE) {
    console.group(`API Error - ${operation}`);
    console.error("Error details:", error);
    console.error("Error message:", (error as any)?.message);
    console.error("Error response:", (error as any)?.response);
    console.error("Error code:", (error as any)?.code);
    console.error("Backend URL:", API_CONFIG.BASE_URL);
    console.error("Check if backend server is running");
    console.error("Check browser console for CORS errors");
    console.error("Verify CORS is configured correctly");
    console.groupEnd();
  }
};
