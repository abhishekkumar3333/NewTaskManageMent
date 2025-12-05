import express from "express";
import { verifyToken } from "../middlewear/auth.js";
import {
  createProject,
  updateProject,
} from "../controller/project.controller.js";
const projectRouter = express.Router();
projectRouter.post("/create", verifyToken, createProject);
projectRouter.put("/update/:id", verifyToken, updateProject);
export default projectRouter;
