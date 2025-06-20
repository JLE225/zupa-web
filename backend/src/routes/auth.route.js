import express from "express";
import {
  login,
  register,
  logout,
  completeRegistration,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.post("/complete-registration", protectRoute, completeRegistration);
router.get("/myprofile", protectRoute, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

export default router;
