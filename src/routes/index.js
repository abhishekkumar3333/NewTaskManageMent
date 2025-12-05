import express from "express";
import userRouter from "./user.routes.js";
import taskRouter from "./task.routes.js";
import teamRouter from "./team.routes.js";
import projectRouter from "./project.routes.js";
const router = express.Router();
router.use("/api/v1/user", userRouter);
router.use("/api/v1/task", taskRouter);
router.use("/api/v1/team", teamRouter);
router.use("/api/v1/project", projectRouter);

export default router;
