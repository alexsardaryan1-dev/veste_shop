import express from "express";
import { protect } from "../middleware/protect.js";
import { getMyStats } from "../controllers/orderController.js";

const router = express.Router();

router.get("/me/stats", protect, getMyStats);

export default router;