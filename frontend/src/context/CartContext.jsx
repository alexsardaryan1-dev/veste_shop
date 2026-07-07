import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const getInitialCart = () => {
    try {
        const stored = localStorage.getItem('cartItems');
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(getInitialCart);
    const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1, size = null) => {
        setCartItems((prev) => {
            const existing = prev.find(
                (item) => item.id === product.id && item.size === size
            );
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id && item.size === size
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity, size }];
        });
        setIsMiniCartOpen(true);
    };

    const removeFromCart = (id, size = null) => {
        setCartItems((prev) =>
            prev.filter((item) => !(item.id === id && item.size === size))
        );
    };

    const updateQuantity = (id, size, quantity) => {
        if (quantity < 1) return;
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id && item.size === size ? { ...item, quantity } : item
            )
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