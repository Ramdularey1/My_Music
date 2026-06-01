export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://my-music-bice.vercel.app";

export const apiUrl = (path) => `${API_BASE_URL}${path}`;
