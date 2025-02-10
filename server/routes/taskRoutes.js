import express from "express";
import {
  createSubTask,
  createTask,
  dashboardStatistics,
  deleteRestoreTask,
  duplicateTask,
  getTask,
  getTasks,
  postTaskActivity,
  trashTask,
  updateTask,
  getDashboardStats,
} from "../controllers/taskController.js";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddlewave.js";
import { uploadFile } from "../controllers/fileController.js";

const router = express.Router();

router.post("/upload", uploadFile);
router.post("/create", protectRoute, createTask);
router.post("/duplicate/:id", protectRoute, duplicateTask);
router.put("/activity/:id", protectRoute, postTaskActivity);

router.get("/dashboard", protectRoute, getDashboardStats); // Add the dashboard endpoint
router.get("/", protectRoute, getTasks);
router.get("/:id", protectRoute, getTask);

router.put("/create-subtask/:id", protectRoute,  createSubTask);
router.put("/update/:id", protectRoute, updateTask);
router.put("/:id", protectRoute,  trashTask);

router.delete(
  "/delete-restore/:id?",
  protectRoute,
  deleteRestoreTask
);

export default router;
