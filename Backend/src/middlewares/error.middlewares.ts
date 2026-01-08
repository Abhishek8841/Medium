import { Prisma } from "@prisma/client";
import { type Request, type Response, type NextFunction } from "express";
import { ZodError } from "zod";
import jwt from "jsonwebtoken";

export function globalErrorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): Response {
    console.error(err);
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002":
                return res.status(409).json({
                    success: false,
                    message: "Duplicate value. Resource already exists.",
                });

            case "P2025":
                return res.status(404).json({
                    success: false,
                    message: "Resource not found."
                });

            case "P2003":
                return res.status(400).json({
                    success: false,
                    message: "Invalid reference (foreign key)."
                });

            default:
                return res.status(400).json({
                    success: false,
                    message: "Database error",
                });
        }
    }


    if (err instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({
            message: "Invalid token",
            success: false,
        });
    }

    if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
            message: "Token expired",
            success: false,
        });
    }

    if (err instanceof Prisma.PrismaClientValidationError) {
        return res.status(400).json({
            success: false,
            message: "Invalid query or schema mismatch"
        });
    }

    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: "Invalid input data",
        });
    }

    if (
        typeof err === "object" &&
        err !== null &&
        "statusCode" in err &&
        "message" in err
    ) {
        const customErr = err as {
            statusCode: number;
            message: string;
        };

        return res.status(customErr.statusCode).json({
            success: false,
            message: customErr.message,
        });
    }
    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
}