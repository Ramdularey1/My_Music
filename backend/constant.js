export const DB_NAME = "MusicWeb"

export const defaultAllowedOrigins = [
    "https://my-music-bice.vercel.app",
    "http://localhost:5173"
];

export const getAllowedOrigins = () => {
    const rawOrigins = (process.env.CORS_ORIGIN || "")
        .split(",")
        .map((origin) => origin.trim().replace(/^['"]|['"]$/g, ""))
        .filter(Boolean);
    return [
        ...defaultAllowedOrigins,
        ...rawOrigins
    ].map(origin => origin.replace(/\/$/, ""));
};