import express from "express";
import { createTeam } from "../controller/team.controller.js";
import { verifyToken } from "../middlewear/auth.js";
const teamRouter = express.Router();
teamRouter.post("/create", verifyToken, createTeam);
export default teamRouter;
