import express from "express";
// we need EXPRESS as it provides routing.
// Express has some the methods: 
// - router.get()
// - router.post()
// - router.put()
// - router.delete()

import {
    register,
    verifyCode,
    login,
    forgotPassword,
    verifyResetCode,
    resetPassword,
    changePassword,
    getMe,
    logout
} from "../controllers/authController.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();
// express.Router() is for creating and organizing routes (URLs) in  Express backend.

router.post("/register", register);
router.post("/verify-code", verifyCode);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-code", verifyResetCode);
router.post("/reset-password", resetPassword);
router.post("/change-password", protect, changePassword);
router.get("/me", protect, getMe);
router.post("/logout", logout);

export default router;