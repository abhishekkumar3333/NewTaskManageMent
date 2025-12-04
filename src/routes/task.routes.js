import express from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  getSingleTask,
  updateTask,
} from "../controller/task.controller.js";
import { verifyToken } from "../middlewear/auth.js";
const taskRouter = express.Router();
taskRouter.post("/createtask", verifyToken, createTask);
taskRouter.get("/getalltask", verifyToken, getAllTask);
taskRouter.get("/getsingle/:id", verifyToken, getSingleTask);
taskRouter.put("/update/:id", verifyToken, updateTask);
taskRouter.delete("/delete/:id", verifyToken, deleteTask);
export default taskRouter;
