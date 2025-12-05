import express from "express";
import { verifyToken } from "../middlewear/auth.js";
import { createProject } from "../controller/project.controller.js";
const projectRouter = express.Router();
projectRouter.post("/create", verifyToken, createProject);
export default projectRouter;
