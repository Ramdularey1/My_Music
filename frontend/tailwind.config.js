/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "spotify-black": "#121212",
        "spotify-dark": "#181818",
        "spotify-darker": "#0f0f0f",
        "spotify-green": "#1DB954",
        "spotify-green-light": "#1ed760",
        "spotify-gray": "#191919",
        "spotify-light-gray": "#282828",
        "spotify-text": "#ffffff",
        "spotify-text-secondary": "#b3b3b3",
      },
      backgroundImage: {
        "spotify-gradient": "linear-gradient(135deg, #1DB954 0%, #1aa34a 100%)",
        "spotify-dark-gradient": "linear-gradient(135deg, rgba(29, 185, 84, 0.1) 0%, rgba(29, 185, 84, 0) 100%)",
      },
      backdropBlur: {
        "spotify-blur": "10px",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}