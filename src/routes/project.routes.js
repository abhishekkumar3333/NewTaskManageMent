import express from "express";
import { verifyToken } from "../middlewear/auth.js";
import {
  addMemberToProject,
  createProject,
  getAllProjectsOfTeam,
  updateProject,
} from "../controller/project.controller.js";
const projectRouter = express.Router();
projectRouter.post("/create", verifyToken, createProject);
projectRouter.put("/update/:id", verifyToken, updateProject);
projectRouter.post("/:id/addmember", verifyToken, addMemberToProject);
projectRouter.get("/:id/getspecificproject", verifyToken, getAllProjectsOfTeam);
export default projectRouter;
