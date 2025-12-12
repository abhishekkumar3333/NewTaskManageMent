import express from "express";
import { verifyToken } from "../middlewear/auth.js";
import {
  addMemberToProject,
  createProject,
  getAllProjectsOfTeam,
  updateProject,
  getAllProjects,
} from "../controller/project.controller.js";
const projectRouter = express.Router();
projectRouter.post("/create", verifyToken, createProject);
projectRouter.put("/update/:id", verifyToken, updateProject);
projectRouter.post("/:id/addmember", verifyToken, addMemberToProject);
projectRouter.get("/:id/getspecificproject", verifyToken, getAllProjectsOfTeam);
projectRouter.get("/getallprojects", verifyToken, getAllProjects);
export default projectRouter;
