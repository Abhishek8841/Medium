import type { NextFunction, Request, Response } from "express";
import { bulkBlogService, editBlogService, getBlogService, newBlogService } from "../services/blog.services.js";
import { editBlogSchema, newBlogSchema } from "@kehsihba_dev/medium-common";

export const bulkBlogController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await bulkBlogService();
        return res.status(201).json(
            {
                success: true,
                message: "Successfully fetched the blogs of all the people",
                result,
            }
        )
    } catch (error) {
        next(error);
    }
}

export const newBlogController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newBlogPayload = newBlogSchema.parse(req.body);
        const userId = Number(req.userId);
        if (!userId) {
            throw { message: "Unauthorized", statusCode: 401 };
        }
        const result = await newBlogService(newBlogPayload, userId);
        return res.status(201).json(
            {
                success: true,
                message: "Successfully created a new blog",
                result,
            }
        )
    } catch (error) {
        next(error);
    }
}

export const editBlogController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const editBlogPayload = editBlogSchema.parse(req.body);
        const userId = Number(req.userId);
        if (!userId) {
            throw { message: "Unauthorized", statusCode: 401 };
        }
        const blogId = Number(req.query.blogId);
        if (!blogId || isNaN(blogId)) {
            throw { message: "Invalid blogId", statusCode: 400 };
        }
        const result = await editBlogService(editBlogPayload, userId, blogId);
        return res.status(201).json(
            {
                success: true,
                message: "Successfully edited the blog",
                result,
            }
        )
    } catch (error) {
        next(error);
    }
}

export const getBlogController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blogId = Number(req.params.blogId);
        if (!blogId || isNaN(blogId)) {
            throw { message: "Invalid blogId", statusCode: 400 };
        }
        const result = await getBlogService(blogId);
        return res.status(201).json(
            {
                success: true,
                message: "Successfully fetched the blog",
                result,
            }
        )
    } catch (error) {
        next(error);
    }
}