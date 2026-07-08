import { getOrdersByUser, getOrderStats, createOrder as createOrderModel } from '../models/Order.js';

export const getMyOrders = async (req, res) => {
    try {
        const { status } = req.query;
        const result = await getOrdersByUser(req.user.id, status);

        const orders = result.rows.map((order) => ({
            id: order.id,
            createdAt: order.created_at,
            items: order.items || [],
            total: Number(order.total),
            status: order.status,
        }));

        res.json(orders);
    } catch (error) {
        console.error('Get my orders error:', error.message);
        res.status(500).json({ message: 'Server error fetching orders' });
    }
};

export const getMyStats = async (req, res) => {
    try {
        const stats = await getOrderStats(req.user.id);

        res.json({
            totalOrders: Number(stats.totalOrders),
            confirmedOrders: Number(stats.confirmedOrders),
            pendingOrders: Number(stats.pendingOrders),
            totalSpent: Number(stats.totalSpent),
        });
    } catch (error) {
        console.error('Get my stats error:', error.message);
        res.status(500).json({ message: 'Server error fetching stats' });
    }
};

export const createOrder = async (req, res) => {
    try {
        const { items, total } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'No items provided' });
        }

        if (!total || total <= 0) {
            return res.status(400).json({ message: 'Invalid total' });
        }

        const order = await createOrderModel(req.user.id, total, items);

        res.status(201).json({ order, message: 'Order placed successfully' });
    } catch (error) {
        console.error('Create order error:', error.message);
        res.status(500).json({ message: 'Server error creating order' });
    }
};