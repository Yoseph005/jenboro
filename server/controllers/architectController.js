import asyncHandler from "express-async-handler";
import Task from "../models/taskModel.js";

// @desc    Get architect dashboard stats
// @route   GET /api/architect/dashboard
// @access  Private
const getArchitectStats = asyncHandler(async (req, res) => {
  const totalProjects = await Task.countDocuments({ type: "project" });
  const completedTasks = await Task.countDocuments({ status: "completed" });
  const ongoingTasks = await Task.countDocuments({ status: "in_progress" });

  const recentTasks = await Task.find({})
    .sort({ date: -1 })
    .limit(10);

  res.json({
    totals: {
      projects: totalProjects,
      completedTasks,
      ongoingTasks,
    },
    recentTasks,
    graphData: [
      { name: "Projects", total: totalProjects },
      { name: "Completed Tasks", total: completedTasks },
      { name: "Ongoing Tasks", total: ongoingTasks },
    ],
  });
});

export { getArchitectStats };
