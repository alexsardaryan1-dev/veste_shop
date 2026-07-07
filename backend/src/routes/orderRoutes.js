import express from 'express';
import { protect } from '../middleware/protect.js';
import { getMyOrders } from '../controllers/orderController.js';

const router = express.Router();

router.get('/me', protect, getMyOrders);

export default router;