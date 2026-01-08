import express from "express";
import router from "./routes/user.router.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { globalErrorHandler } from "./middlewares/error.middlewares.js";
import router1 from "./routes/blog.router.js";
const app = express();
app.use(cors());

app.use(express.json());
app.use("/api/v1", router);
app.use("/api/v1", router1);
app.use(globalErrorHandler);


app.listen(3000, () => {
    console.log("APP IS UP AND RUNNING")
})