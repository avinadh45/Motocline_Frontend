import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    const publicRoutes = [
      "/mechanic/login",
      "/service-center/login",
      "/admin/login",
      "/register",
      "/verify-otp",
      "/resend-otp",
     "/forgot-password",
      "/reset-password"
    ];

    if (
      token &&
      !publicRoutes.some(route => config.url?.includes(route))
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);          

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const publicRoutes = [
  "/mechanic/login",
  "/service-center/login",
  "/admin/login",
  "/register",
  "/verify-otp",
  "/resend-otp",
  "/forgot-password",
"/reset-password"
];

    
    if (publicRoutes.some((route) => originalRequest.url?.includes(route))) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 &&!originalRequest._retry &&!publicRoutes.some(route => originalRequest.url?.includes(route))) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      
      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          "http://localhost:5000/refresh-token",
          { refreshToken }
        );

        const newAccessToken = response.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosClient(originalRequest);

      } catch (err) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        const currentPath = window.location.pathname;

if (currentPath.startsWith("/admin")) {
  window.location.href = "/admin/login";
} else if (currentPath.startsWith("/service-center")) {
  window.location.href = "/service-center/login";
} else {
  window.location.href = "/login";
}

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;