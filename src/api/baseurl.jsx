// import axios from "axios";

// axios.axi;

import axios from "axios";
import Cookies from "js-cookie";

export const baseUrl = "http://localhost:4044";
// Create an axios instance
const apiClient = axios.create({
  baseURL: `${baseUrl}/api`, // Your API base URL
});

// Add a request interceptor to include the token in the headers
apiClient.interceptors.request.use(
  (config) => {
    // const token = Cookies.get("token");
    const token = localStorage.getItem("token");
    console.log("token from intercept", token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
