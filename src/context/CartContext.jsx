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
  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Optional: automatically open sidebar when added
    openSidebar('cart');
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => 
      prev.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item)
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
