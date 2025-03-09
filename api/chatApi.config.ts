import axios from "axios";
import AuthController from "./AuthController";
// export const API_BASE_URL = "http://127.0.0.1:3000/api";
// console.log(API_BASE_URL, "@apiBaseUrl");
export const chatApiClient = axios.create({
  baseURL: "http://127.0.0.1:3000/chat",
  validateStatus: function (status) {
    // Allow handling all HTTP status codes in the `then` block
    return true;
  },
});
chatApiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = AuthController.getSession();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.log(err, "@apiConfig");
    }
    return config;
  },
  (err) => Promise.reject(err)
);
