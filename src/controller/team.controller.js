import { Role } from "@prisma/client";
import prisma from "../utils/prisma.js";

export const createTeam = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, role } = req.body;
    console.log(req.body);
    if (!name) {
      return res.status(404).json({
        sucess: false,
        message: "team does not exist",
      });
    }
    const userExist = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    console.log(userExist);
    if (!userExist) {
      return res.status(404).json({
        sucess: false,
        message: "user not found",
      });
    }
    const createTeam = await prisma.team.create({
      data: {
        name,
        members: {
          create: {
            role: role || Role.OWNER,
            userId: userId,
          },
        },
      },
      include: {
        members: true,
      },
    });
    console.log(createTeam);
    res.status(200).json({
      sucess: true,
      message: "Team Created Successfully",
      team: createTeam,
    });
  } catch (error) {
    res.status(500).json({
      sucesss: false,
      message: "Internal serveeer error",
    });
  }
};
