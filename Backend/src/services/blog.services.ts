import { prisma } from '../lib/prisma.js'
import type { editBlogType, newBlogType } from "@kehsihba_dev/medium-common";

export const bulkBlogService = async () => {
    return await prisma.blog.findMany({
        select: {
            userId: true,
            id: true,
            title: true,
            description: true,
            createdAt: true,
            updatedAt: true,
            user: {
                select: {
                    id: true,
                    userName: true,
                    email: true,
                }
            }
        },
        orderBy: {
            createdAt: "desc",
        }
    })
}

export const newBlogService = async (newBlogPayload: newBlogType, userId: number) => {
    return await prisma.blog.create(
        {
            data: {
                title: newBlogPayload.title,
                description: newBlogPayload.description,
                userId: userId,
            },
            select: {
                userId: true,
                id: true,
                title: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        id: true,
                        userName: true,
                        email: true,
                    }
                }
            }
        }
    )
}

export const editBlogService = async (editBlogPayload: editBlogType, userId: number, blogId: number) => {

    // const data: any = {};
    // if (editBlogPayload.title) data.title = editBlogPayload.title;
    // if (editBlogPayload.description) data.description = editBlogPayload.description;

    const blog = await prisma.blog.findFirstOrThrow({
        where: {
            id: blogId,
            userId: userId,
        },
    });

    return await prisma.blog.update(
        {
            where: {
                id: blogId,
            },
            data: {
                ...(editBlogPayload.title && { title: editBlogPayload.title }),
                ...(editBlogPayload.description && { description: editBlogPayload.description, })
            }
        }
    )
}

export const getBlogService = async (blogId: number) => {
    return await prisma.blog.findFirstOrThrow(
        {
            where: {
                id: blogId,
            },
            select: {
                userId: true,
                id: true,
                title: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        id: true,
                        userName: true,
                        email: true,
                    }
                }
            },
        }
    )
}