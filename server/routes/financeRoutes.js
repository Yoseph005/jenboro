
import express from "express";
import { getFinanceStats } from "../controllers/financeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/dashboard").get(protect, getFinanceStats);

export default router;