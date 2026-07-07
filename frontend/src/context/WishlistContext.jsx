import { createContext, useState } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);

    const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);

    const toggleWishlist = (product) => {
        setWishlistItems((prev) =>
            prev.some((item) => item.id === product.id)
                ? prev.filter((item) => item.id !== product.id)
                : [...prev, product]
        );
    };

    const removeFromWishlist = (id) => {
        setWishlistItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <WishlistContext.Provider
            value={{ wishlistItems, toggleWishlist, removeFromWishlist, isInWishlist }}
        >
            {children}
        </WishlistContext.Provider>
    );
};