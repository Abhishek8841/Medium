import type { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.services.js";


export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req.headers.authorization;
        if (!header) throw { statusCode: 400, message: "Token is missing" };
        const [, token] = header.split(" ");
        if (!token) throw { statusCode: 400, message: "Token is missing" };
        const payload = authService(token);
        req.userId = payload.userId;
        next();
    } catch (error) {
        next(error);
    }
}