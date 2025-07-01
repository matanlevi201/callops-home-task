import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const environment = import.meta.env.MODE;

export const api = axios.create({
  baseURL: environment === "development" ? BACKEND_URL : undefined,
  headers: { "Content-Type": "application/json" },
});
