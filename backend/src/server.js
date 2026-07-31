import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// dotenv.config() reads the .env file and loads its values into process.env.
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import pool from "./config/database.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
// here it loads environment variables before using process.env

pool.query("SELECT NOW()", (err, result) => {
    if (err) {
        console.error("FAIL: Database connection failed:", err);
    } else {
        console.log("SUCCESS: Database connected:", result.rows[0]);
    }
});

// here we test database connection when the server starts.
// SELECT NOW() asks PostgreSQL for the current database time.
// If this query works, the database connection is successful.

const app = express();
// express is a function that comes from the Express library. It gives tools to create a backend server.
// when we write app = express(), we are executing the Express function. Express creates an application object and returns it. This object is stored in app. So app is my backend application. The app object has methods that control my server.

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    credentials: true,
}));

app.use(express.json());
// every request -> convert JSON body

app.use(cookieParser());
// it allows express to read cookies.

// routes:
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});
// it checks if the server is running.
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);


// Starting the server:
const PORT = process.env.PORT || 5001;
// use PORT from .env
// If PORT dies not exist, it uses 5001.

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// The server starts listening for incoming HTTP requests.

// Cleaning up the server:
process.on("SIGINT", async () => {
    console.log("Exiting...");
    await pool.end();
    process.exit(0);
    // Stop the Node.js process.
});
// When the server receives SIGINT (for example, pressing Ctrl + C), closes database connections before shutting down.