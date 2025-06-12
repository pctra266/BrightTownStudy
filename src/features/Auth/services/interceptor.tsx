import api from "../../../api/api";
import { getCookie, eraseCookie } from "../../../utils/cookieUtils";

api.interceptors.request.use(
  (config) => {
    const token = getCookie("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getCookie("refreshToken");
        if (refreshToken) {
          const { authService } = await import("./authService");
          const refreshResult = await authService.refreshToken();

          if (refreshResult.success && refreshResult.token) {
            originalRequest.headers.Authorization = `Bearer ${refreshResult.token}`;
            return api(originalRequest);
          }
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
      }

      eraseCookie("accessToken");
      eraseCookie("refreshToken");
      eraseCookie("user");
      eraseCookie("rememberMe");

      sessionStorage.setItem("sessionExpired", "true");

      const protectedRoutes = ["/user", "/admin"];
      const currentPath = window.location.pathname;

      if (protectedRoutes.some((route) => currentPath.startsWith(route))) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
