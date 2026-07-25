import express from "express";
import { protect } from "../middleware/protect.js";
import {
    getMyOrders,
    getMyStats,
    createOrder,
    cancelOrder
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/me", protect, getMyOrders);
router.get("/stats", protect, getMyStats);
router.post("/", protect, createOrder);
router.patch("/:id/cancel", protect, cancelOrder);

export default router;