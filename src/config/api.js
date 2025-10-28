const isLocal = window.location.hostname === "localhost";

export const API_URL = isLocal
  ? import.meta.env.VITE_API_URL_LOCAL
  : import.meta.env.VITE_API_URL_PROD;