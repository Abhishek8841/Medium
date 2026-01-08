import express from "express";
import { meController, signInController, signUpController } from "../controller/auth.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/signup", signUpController);
router.post("/signin", signInController);
router.get("/me", auth, meController);

export default router;