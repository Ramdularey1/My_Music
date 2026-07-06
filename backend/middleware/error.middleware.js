import { ApiError } from "../utils/ApiError.js";
import { getAllowedOrigins } from "../constant.js";

export const errorHandler = (err, req, res, next) => {
    let error = err;

    if (!(error instanceof ApiError)) {
        error = new ApiError(500, error?.message || "Something went wrong");
    }

    // Attach CORS headers if the request origin is allowed
    const origin = req.headers.origin;
    if (origin) {
        const allowedOrigins = getAllowedOrigins();
        const cleanOrigin = origin.replace(/\/$/, "");
        if (allowedOrigins.includes(cleanOrigin)) {
            res.setHeader("Access-Control-Allow-Origin", origin);
            res.setHeader("Access-Control-Allow-Credentials", "true");
        }
    }

    return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        errors: error.errors,
        data: error.data
    });
};
