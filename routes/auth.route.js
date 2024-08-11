import express from "express";
import { login, logout, register,verifyOtp  } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-otp", verifyOtp); 
// router.post('/forgot-password', sendOtp);
// router.post('/reset-password', resetPassword);

export default router;
