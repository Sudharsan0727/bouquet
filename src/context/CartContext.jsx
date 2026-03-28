import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [orders, setOrders] = useState([]);
  
  // Shared Sidebar State
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarTab, setSidebarTab] = useState('cart');

  const addOrder = (order) => {
    setOrders(prev => [order, ...prev]);
  };

  const openSidebar = (tab) => {
    setSidebarTab(tab);
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Cart operations
  const addToCart = (product, options = {}) => {
    setCartItems(prev => {
      const existing = prev.find(item => 
        item.id === product.id && 
        JSON.stringify(item.options) === JSON.stringify(options)
      );
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && JSON.stringify(item.options) === JSON.stringify(options))
            ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Use timestamp-based cartKey for items with different options
      const cartKey = `${product.id}-${Date.now()}`;
      return [...prev, { ...product, options, quantity: 1, cartKey }];
    });
    openSidebar('cart');
  };

  const removeFromCart = (cartKey) => {
    setCartItems(prev => prev.filter(item => item.cartKey !== cartKey && item.id !== cartKey));
  };

  const updateCartQuantity = (cartKey, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cartKey);
      return;
    }
    setCartItems(prev => 
      prev.map(item => (item.cartKey === cartKey || item.id === cartKey) ? { ...item, quantity: newQuantity } : item)
    );
  };

  const updateCartItemOptions = (cartKey, newOptions) => {
    setCartItems(prev => 
      prev.map(item => (item.cartKey === cartKey || item.id === cartKey) ? { ...item, options: newOptions } : item)
    );
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const isWished = prev.some(item => item.id === product.id);
      if (isWished) {
        return prev.filter(item => item.id !== product.id);
      } else {
        openSidebar('wishlist');
        return [...prev, product];
      }
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      wishlistItems,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      updateCartItemOptions,
      toggleWishlist,
      removeFromWishlist,
      sidebarOpen,
      sidebarTab,
      openSidebar,
      closeSidebar,
      setSidebarTab,
      clearCart,
      orders,
      addOrder
    }}>
      {children}
    </CartContext.Provider>
  );
}
