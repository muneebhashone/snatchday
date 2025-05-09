import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, 
  withCredentials: true, 
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = coo 
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// ... existing code ...

axiosInstance.interceptors.request.use(
  (config) => {
    // Check if window is defined (browser environment)
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem("snatchday_user");
      // console.log(user,"user")
      if (user) {
        // Ensure the header is properly set
        config.headers['X-User-Data'] = JSON.stringify(user);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (window.location.pathname.startsWith('/admin')) {
        localStorage.removeItem("snatchday_user")
        window.location.href = '/admin/login';
      }else{
        localStorage.removeItem("snatchday_user")
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;