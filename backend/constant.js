export const DB_NAME = "MusicWeb"

export const defaultAllowedOrigins = [
    "https://my-music-bice.vercel.app",
    "http://localhost:5173"
];

const normalizeOrigin = (origin) => origin?.replace(/\/$/, "");

export const getAllowedOrigins = () => {
    const rawOrigins = (process.env.CORS_ORIGIN || "")
        .split(",")
        .map((origin) => origin.trim().replace(/^['"]|['"]$/g, ""))
        .filter(Boolean);
    return [
        ...defaultAllowedOrigins,
        ...rawOrigins
    ].map(normalizeOrigin);
};

export const isAllowedOrigin = (origin) => {
    const cleanOrigin = normalizeOrigin(origin);

    if (!cleanOrigin) {
        return true;
    }

    if (getAllowedOrigins().includes(cleanOrigin)) {
        return true;
    }

    return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(cleanOrigin);
};