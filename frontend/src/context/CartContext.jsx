import { createContext, useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

const getCartKey = (userId) => `cartItems_${userId ?? "guest"}`;

const loadCart = (userId) => {
  try {
    const stored = localStorage.getItem(getCartKey(userId));
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const prevUserId = useRef(undefined);

  useEffect(() => {
    const currentUserId = user?.id ?? null;
    if (prevUserId.current !== currentUserId) {
      setCartItems(loadCart(currentUserId));
      prevUserId.current = currentUserId;
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(getCartKey(user?.id ?? null), JSON.stringify(cartItems));
  }, [cartItems, user]);

  const addToCart = (product, quantity = 1, size = null) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.size === size,
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { ...product, quantity, size }];
    });
    setIsMiniCartOpen(true);
  };

  const removeFromCart = (id, size = null) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size)),
    );
  };

  const updateQuantity = (id, size, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => setCartItems([]);

  const closeMiniCart = () => setIsMiniCartOpen(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        isMiniCartOpen,
        setIsMiniCartOpen,
        closeMiniCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};