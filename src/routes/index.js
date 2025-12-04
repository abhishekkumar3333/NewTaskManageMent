import express from "express";
import userRouter from "./user.routes.js";
import taskRouter from "./task.routes.js";
const router = express.Router();
router.use("/api/v1/user", userRouter)
router.use("/api/v1/task", taskRouter)

export default router;