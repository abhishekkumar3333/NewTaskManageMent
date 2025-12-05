import prisma from "../utils/prisma.js";

export const createProject = async (req, res) => {
  try {
    const { title, description, teamId, projectId } = req.body;
    if (!title || !description || !teamId || !projectId) {
      return res.status(409).json({
        sucess: false,
        message: "All fields Required",
      });
    }
    const existTeam = await prisma.team.findUnique({
      where: {
        id: teamId,
      },
    });
    if (!existTeam) {
      return res.status(404).json({
        success: false,
        message: "team not found",
      });
    }
    const checkTeamMembers = await prisma.teamMember.findFirst({
      where: {
        id: projectId,
        teamId: teamId,
      },
    });
    if (!checkTeamMembers) {
      return res.status(404).json({
        sucess: false,
        message: "team member does not exist",
      });
    }
    const project = await prisma.projects.create({
      data: {
        title,
        description,
        teamId: teamId,
        projectId: projectId,
      },
    });
    res.status(200).json({
      sucess: true,
      message: "project created successfully",
      project: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
