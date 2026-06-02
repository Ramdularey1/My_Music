export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://music-web-sqpk.onrender.com";

export const apiUrl = (path) => `${API_BASE_URL}${path}`;

export const parseApiResponse = async (response) => {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Server returned a non-JSON response (${response.status})`);
  }
};

export const getApiErrorMessage = (error) => {
  if (error instanceof TypeError) {
    return "Cannot reach the backend. Check Render deployment and CORS settings.";
  }

  return error.message || "Something went wrong";
};
