import express from "express";
import {
  forgotValidation,
  loginValidation,
  registerValidation,
  resetValidation,
} from "../validators/validators.js";

import {
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
} from "../controllers/authControllers.js";

import { validate } from "../middleware/validate.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// ================= AUTH =================
router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);
router.post("/forgot-password", forgotValidation, validate, forgotPassword);
router.post("/reset-password", resetValidation, validate, resetPassword);

// ================= LOGOUT =================
// logout from all devices
router.post("/logout-all", protect, logout);

// ================= PROTECTED ROUTES =================

// admin only route
router.get(
  "/admin",
  protect,
  allowRoles("admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Access granted to admin route",
      user: req.user, // useful for debugging
    });
  }
);

export default router;