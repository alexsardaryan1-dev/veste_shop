import express from 'express';
import { protect } from '../middleware/protect.js';
import { getMyOrders, createOrder } from '../controllers/orderController.js';

const router = express.Router();

router.get('/me', protect, getMyOrders);
router.post('/', protect, createOrder);

export default router;