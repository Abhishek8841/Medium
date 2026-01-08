import {z} from "zod";


export const signUpSchema = z.object(
    {
        userName: z.string(),
        email: z.email(),
        password: z.string(),
    }
)

export const signInSchema = z.object(
    {
        email: z.string(),
        password: z.string(),
    }
)

export const newBlogSchema = z.object(
    {
        title: z.string(),
        description: z.string(),
    }
)

export const editBlogSchema = z.object(
    {
        title: z.string().optional(),
        description: z.string().optional(),
    }
).refine((data) => data.title || data.description, {
    message: "At least one field must be provided",
});


export type editBlogType = z.infer<typeof editBlogSchema>;
export type newBlogType = z.infer<typeof newBlogSchema>;
export type signInType = z.infer<typeof signInSchema>;
export type signUpType = z.infer<typeof signUpSchema>;