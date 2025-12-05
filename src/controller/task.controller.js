import { use, useOptimistic } from "react";
import prisma from "../utils/prisma.js";

export const createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, assignId, priority, duedate, status } =
      req.body;
    console.log(req.body, "kkkkkkkkkkkk");
    if (
      !title ||
      !description ||
      !assignId ||
      !priority ||
      !duedate ||
      !status
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields is required",
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).json({
        sucess: false,
        message: "user not found",
      });
    }
    let assignUser = null;
    if (assignId) {
      assignUser = await prisma.user.findUnique({
        where: {
          id: assignId,
        },
      });
    }
    if (!assignUser) {
      return res.status(404).json({
        sucess: false,
        message: "assign user is not found",
      });
    }
    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId,
        assignId: assignId || null,
        status,
        priority,
        duedate: new Date(duedate),
      },
    });
    res.status(200).json({
      success: true,
      message: "Task created Successfully",
      Task: task,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Internal Sereever Error",
    });
  }
};

export const getAllTask = async (req, res) => {
  try {
    const task = await prisma.task.findMany();
    if (!task) {
      return res.status(404).json({
        sucess: false,
        message: "task not found",
      });
    }
    res.status(200).json({
      sucess: true,
      message: "task get successfully",
      task: task,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "internal server error",
    });
  }
};

export const getSingleTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    console.log(taskId, "taskId");
    const getSingleTask = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    console.log(getSingleTask);
    if (!getSingleTask) {
      return res.status(404).json({
        sucess: false,
        message: "task not get",
      });
    }
    return res.status(200).json({
      sucess: true,
      message: "task get sucessfulyy",
      task: getSingleTask,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Internal server error ",
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, assignId, status, priority, duedate } =
      req.body;
    if (assignId) {
      const userExist = await prisma.user.findUnique({
        where: {
          id: assignId,
        },
      });
      if (!userExist) {
        return res.status(404).json({
          succes: false,
          message: "user not found",
        });
      }
    }
    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title,
        description,
        status,
        priority,
        duedate: duedate ? new Date(duedate) : undefined,
      },
    });
    res.status(200).json({
      sucess: true,
      message: "task updated succesfully",
      updatedTask: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "internal server error",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deleteTask = await prisma.task.delete({
      where: {
        id: taskId,
      },
    });
    res.status(200).json({
      sucess: true,
      message: "Task Deleted SuccessFully",
      deleteTask,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "internal server errror",
    });
  }
};
