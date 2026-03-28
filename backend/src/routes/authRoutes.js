import express from "express";
import { login, me, signup } from "../controllers/authController.js";
import { googleAuth } from "../controllers/googleAuthController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/google", googleAuth);
router.post("/login", login);
router.get("/me", protect, me);

export default router;