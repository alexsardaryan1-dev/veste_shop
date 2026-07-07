import { getOrdersByUser, getOrderStats } from '../models/Order.js';

export const getMyOrders = async (req, res) => {
    try {
        const { status } = req.query;
        const result = await getOrdersByUser(req.user.id, status);

        const orders = result.rows.map((order) => ({
            id: order.id,
            createdAt: order.created_at,
            itemsCount: Number(order.itemsCount),
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