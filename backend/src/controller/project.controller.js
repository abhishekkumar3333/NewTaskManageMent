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

export const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    console.log(projectId);
    const { userId, title, description } = req.body;
    console.log(req.body);
    if (!userId) {
      res.status(404).json({
        sucess: false,
        message: "user not found",
      });
    }
    const project = await prisma.projects.findUnique({
      where: {
        id: projectId,
      },
      include: {
        team: {
          include: {
            members: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
    if (!project) {
      return res.status(404).json({
        sucess: false,
        message: "project not found",
      });
    }
    const teamOwner = project.team.members.find((m) => m.role === "OWNER");
    if (!teamOwner) {
      return res.status(403).json({
        sucess: false,
        message: "user is not team owner",
      });
    }
    if (teamOwner.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Only the TEAM OWNER can update this project",
      });
    }
    const updateProject = await prisma.projects.update({
      where: {
        id: projectId,
      },
      data: {
        title: title || project.title,
        description: description || project.description,
      },
    });
    console.log(updateProject, "uuuuuu");
    res.status(200).json({
      sucess: true,
      message: "project updated succesFully",
      updateProject: updateProject,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "internal server error",
    });
  }
};

export const addMemberToProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    console.log(projectId, "projjj");
    const OwnerId = req.user.id;
    console.log(OwnerId, "owner");
    const { userId, role } = req.body;
    console.log(req.body);
    if (!userId) {
      return res.status(403).json({
        sucess: false,
        message: "user is required",
      });
    }
    const project = await prisma.projects.findUnique({
      where: {
        id: projectId,
      },
      include: {
        team: {
          include: {
            members: true,
          },
        },
      },
    });
    console.log(project);
    if (!project) {
      return res.status(404).json({
        sucess: false,
        message: "project not found",
      });
    }
    const team = project.team;
    console.log(team, "team");
    const isOwner = team.members.find((m) => m.role === "OWNER");
    console.log(isOwner, "owner");
    if (!isOwner || isOwner.userId !== OwnerId) {
      return res.status(400).json({
        sucess: false,
        message: "user is not Owner",
      });
    }
    const createMember = await prisma.teamMember.create({
      data: {
        userId: userId,
        teamId: team.id,
        role: role || "MEMBER",
      },
    });
    await prisma.projects.update({
      where: {
        id: projectId,
      },
      data: {
        projects: {
          connect: {
            id: createMember.id,
          },
        },
      },
    });
    res.status(200).json({
      sucess: true,
      message: "user added to project succesfully",
      member: createMember,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "internal serveeer error",
    });
  }
};

export const getAllProjectsOfTeam = async (req, res) => {
  try {
    const teamId = req.params.id; // Route uses :id

    const projects = await prisma.projects.findMany({
      where: {
        teamId: teamId,
      },
    });

    res.status(200).json({
      sucess: true,
      message: "Projects Fetched SuccessFully",
      projects: projects,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.projects.findMany({});
    if (!projects) {
      return res.status(404).json({
        sucess: false,
        message: "Projects Not Found",
      });
    }
    res.status(200).json({
      sucess: true,
      message: "projects Fetched successfullly",
      projects: projects,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
