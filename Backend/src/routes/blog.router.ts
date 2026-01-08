import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { bulkBlogController, editBlogController, getBlogController, newBlogController } from "../controller/blog.controller.js";
const router1 = express.Router();

router1.get("/bulk", auth, bulkBlogController);
router1.post("/new", auth, newBlogController);
router1.put("/edit", auth, editBlogController);
router1.get("/single/:blogId", auth, getBlogController);

export default router1;