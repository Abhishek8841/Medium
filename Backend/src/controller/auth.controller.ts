import type { NextFunction, Request, Response } from "express";
import { signInSchema, signUpSchema } from "@kehsihba_dev/medium-common";
import { meService, signInService, signUpService } from "../services/user.services.js";

export const signUpController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const signUpPayload = signUpSchema.parse(req.body);
        await signUpService(signUpPayload);
        res.status(201).json({
            success: true,
            message: "Successfully created a user",
        });
    } catch (error) {
        next(error);
    }
}

export const signInController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const signInPayload = signInSchema.parse(req.body);
        const result = await signInService(signInPayload);
        return res.status(201).json(
            {
                success: true,
                message: "Successfully loggedIn",
                existingUser: result.existingUser,
                token: result.token,
            }
        )
    } catch (error) {
        next(error);
    }
}

export const meController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.userId);
        if (!userId || typeof userId !== "number") {
            throw { message: "Unauthorized", statusCode: 401 };
        }
        const result = await meService(userId);
        return res.status(201).json(
            {
                success: true,
                message: "Successfully fetched the details of the user",
                result
            }
        )

    } catch (error) {
        next(error);
    }
}