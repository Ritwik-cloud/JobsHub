
import axios from "axios";
import { Cookies } from "react-cookie";

export const baseURL = "http://localhost:3005/api";

export const AxiosInstance = axios.create({
  baseURL,
});

const cookie = new Cookies();
AxiosInstance.interceptors.request.use(
  async function (config) {
    const token = cookie.get("token") 
    if (token !== null && token !== undefined) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;

  },
  function (err) {
    return Promise.reject(err);
  }
);


