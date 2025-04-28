import { createContext, useContext, useState, ReactNode } from "react";
import { CartItem, MenuItem } from "../types";
import { toast } from "sonner";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (menuItem: MenuItem, quantity: number, selectedOptions?: CartItem["selectedOptions"]) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (menuItem: MenuItem, quantity: number, selectedOptions?: CartItem["selectedOptions"]) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.menuItem.id === menuItem.id && 
                JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
    );

    if (existingItemIndex !== -1) {
      // If item already exists with the same options, update quantity
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
      setCartItems(updatedCart);
    } else {
      // Otherwise add new item
      setCartItems([...cartItems, { menuItem, quantity, selectedOptions }]);
    }
    
    toast(`Added ${quantity} ${menuItem.name} to cart`);
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.menuItem.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems(
      cartItems.map((item) =>
        item.menuItem.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      // Base price of the menu item times quantity
      let itemTotal = item.menuItem.price * item.quantity;
      
      // Add any additional costs from selected options
      if (item.selectedOptions) {
        item.selectedOptions.forEach(option => {
          if (option.choice.price > 0) {
            itemTotal += option.choice.price * item.quantity;
          }
        });
      }
      
      return total + itemTotal;
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
