import axios from "axios";
import { API_URL } from "@/lib/api";
import { getToken } from "@/lib/session";

export const http = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 60000,
});

http.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (res) => res,
  (error) => {
    const msg =
      error?.response?.data?.error || error?.message || "Erro de rede";
    return Promise.reject(new Error(msg));
  }
);
