import express from "express";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddlewave.js";
import {
  activateUserProfile,
  changeUserPassword,
  deleteUserProfile,
  forgotPaswword,
  forgotPaswwordVerification,
  getNotificationsList,
  getTeamList,
  loginUser,
  logoutUser,
  markNotificationRead,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import {
  createTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/get-team", protectRoute, getTeamList);
router.get("/notifications", protectRoute, getNotificationsList);
router.post("/create", protectRoute, isAdminRoute, createTask);

router.put("/profile", protectRoute, updateUserProfile);
router.put("/read-noti", protectRoute, markNotificationRead);
router.put("/change-password", protectRoute, changeUserPassword);

router.post("/forgot-password", forgotPaswword);
router.post("/forgot-password-verifcation", forgotPaswwordVerification);



// //   FOR ADMIN ONLY - ADMIN ROUTES
router
  .route("/:id")
  .put(protectRoute, isAdminRoute, activateUserProfile)
  .delete(protectRoute, isAdminRoute, deleteUserProfile);

export default router;
