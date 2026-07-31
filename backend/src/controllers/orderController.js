import {
    getOrdersByUser,
    getOrderStats,
    createOrder as createOrderModel,
    cancelOrder as cancelOrderModel
} from "../models/Order.js";

// Here we AS which means "rename this while importing". As in this controller I have a function names "createOrder", I would have 2 variables with the same name which is not allowed. So we need to rename the imported one. This means: take createOrder -> call it createOrderModel inside this file. 

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
        console.error("Get my orders error:", error.message);
        res.status(500).json({ message: "Server error fetching orders" });
    }
};

// This controller gets all oders belonging to the logged-in user. 
// req.query:
// There are different places data can come from. 
// req.body - comes from { "email": "..."}, usually POST request.
// req.params - comes from URL: /orders/15, then req.params.id which is 15.
// req.query - comes after the question mark, for example, /orders/me?status=pending, everything after ? is the query. Express creates req.query ={ status: "pending"}. So const { status } = req.query means status = "pending". If the URL is /orders/me then status is undefined.
// req.user.id - comes from your authentication middleware. We create a JWT. Inside JWT: { id:7 }. Later user requests GET /orders/me. Browser sends cookie -> Middleware verifies JWT -> Middleware does req.user = { id:7, name:"Alex" }. Now the controller use req.user.id which is 7. 


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
        console.error("Get my stats error:", error.message);
        res.status(500).json({ message: "Server error fetching stats" });
    }
};

export const createOrder = async (req, res) => {
    try {
        const { items, total } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "No items provided" });
        }

        if (!total || total <= 0) {
            return res.status(400).json({ message: "Invalid total" });
        }

        const order = await createOrderModel(req.user.id, total, items);

        res.status(201).json({ order, message: "Order placed successfully" });
    } catch (error) {
        console.error("Create order error:", error.message);
        res.status(500).json({ message: "Server error creating order" });
    }
};

export const cancelOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const cancelled = await cancelOrderModel(id, req.user.id);

        if (!cancelled) {
            return res.status(400).json({
                message: "Order cannot be cancelled (not found, not yours, or no longer pending)",
            });
        }

        res.json({ order: cancelled, message: "Order cancelled successfully" });
    } catch (error) {
        console.error("Cancel order error:", error.message);
        res.status(500).json({ message: "Server error cancelling order" });
    }
};