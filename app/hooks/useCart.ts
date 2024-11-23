import { useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addItemToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
      if (itemIndex === -1) {
        return [...prevCart, item];
      } else {
        const updatedCart = [...prevCart];
        updatedCart[itemIndex].quantity += item.quantity;
        return updatedCart;
      }
    });
  };

  const removeItemFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return {
    cart,
    addItemToCart,
    removeItemFromCart,
    clearCart,
    getTotalPrice
  };
}
