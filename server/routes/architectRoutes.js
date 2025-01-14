
import express from "express";
import { getArchitectStats } from "../controllers/architectController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/dashboard").get(protect, getArchitectStats);

export default router;