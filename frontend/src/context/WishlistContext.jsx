import { createContext, useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "./AuthContext";

export const WishlistContext = createContext();

const getWishlistKey = (userId) => `wishlistItems_${userId ?? "guest"}`;

const loadWishlist = (userId) => {
  try {
    const stored = localStorage.getItem(getWishlistKey(userId));
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const prevUserId = useRef(undefined);

  useEffect(() => {
    const currentUserId = user?.id ?? null;
    if (prevUserId.current !== currentUserId) {
      setWishlistItems(loadWishlist(currentUserId));
      prevUserId.current = currentUserId;
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(getWishlistKey(user?.id ?? null), JSON.stringify(wishlistItems));
  }, [wishlistItems, user]);

  const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);

  const toggleWishlist = (product) => {
    setWishlistItems((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product],
    );
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};