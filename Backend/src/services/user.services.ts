import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { type signInType, type signUpType, signInSchema, signUpSchema } from "@kehsihba_dev/medium-common";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUpService: (signUpPayload: signUpType) => Promise<void> = async (signUpPayload: signUpType) => {
    let hashedPassword: string;
    try {
        hashedPassword = await bcrypt.hash(signUpPayload.password, 10);
    } catch (error) {
        throw { message: "Error while hashing the password", statusCode: 400 }
    }
    await prisma.user.create({
        data: {
            userName: signUpPayload.userName,
            email: signUpPayload.email,
            password: hashedPassword,
        },
    });
}

export const signInService = async (signInPayload: signInType) => {
    const existingUser = await prisma.user.findFirstOrThrow({
        where: {
            email: signInPayload.email
        }
    })
    if (!await bcrypt.compare(signInPayload.password, existingUser.password)) {
        throw { message: "Password entered isn't correct", statusCode: 400 };
    }
    const payload = {
        userId: existingUser.id,
    }
    if (!process.env.JWT_SECRET) {
        throw { statusCode: 400, message: "JWT secret not found" };
    }
    existingUser.password = "";
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return {
        token, existingUser
    };
}

export const meService = async (userId: number) => {
    const existingUser = await prisma.user.findFirstOrThrow({
        where: { id: userId },
        select: {
            id: true,
            userName: true,
            email: true,
            blogs: {
                select: {
                    title: true,
                    description: true,
                    createdAt: true,
                    updatedAt: true,
                }
            }
        }
    })
    return existingUser;
}