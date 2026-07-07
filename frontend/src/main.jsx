import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext.jsx";

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <WishlistProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </WishlistProvider>
  </CartProvider>,
);
