import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (err, req, res, next) => {
    let error = err;

    if (!(error instanceof ApiError)) {
        error = new ApiError(500, error?.message || "Something went wrong");
    }

    return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        errors: error.errors,
        data: error.data
    });
};
