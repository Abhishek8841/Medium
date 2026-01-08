import jwt from "jsonwebtoken";

export const authService = (token: string) => {
    if (!process.env.JWT_SECRET) {
        throw { statusCode: 400, message: "JWT secret not found" };
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof payload == "string") { throw { statusCode: 400, message: "Payload is of invalid type = string" } }
    return payload as { userId: number };
}