
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, X, ArrowRight, ShoppingCart } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const subtotal = getCartTotal();
  const deliveryFee = cartItems.length > 0 ? 3.99 : 0;
  const serviceFee = cartItems.length > 0 ? 1.99 : 0;
  const total = subtotal + deliveryFee + serviceFee;
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      navigate("/checkout");
    }, 1000);
  };

  // Group cart items by restaurant
  const itemsByRestaurant: Record<string, typeof cartItems> = {};
  cartItems.forEach(cartItem => {
    const { restaurantId } = cartItem.menuItem;
    if (!itemsByRestaurant[restaurantId]) {
      itemsByRestaurant[restaurantId] = [];
    }
    itemsByRestaurant[restaurantId].push(cartItem);
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      
      {cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            {Object.entries(itemsByRestaurant).map(([restaurantId, items]) => (
              <Card key={restaurantId} className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">
                      {items[0].menuItem.restaurantId}
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => {
                        items.forEach(item => removeFromCart(item.menuItem.id));
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove All
                    </Button>
                  </div>
                  
                  <Separator className="mb-4" />
                  
                  {items.map((cartItem) => {
                    const { menuItem, quantity, selectedOptions } = cartItem;
                    
                    // Calculate item total price including options
                    let itemPrice = menuItem.price;
                    if (selectedOptions) {
                      selectedOptions.forEach(option => {
                        itemPrice += option.choice.price;
                      });
                    }
                    
                    return (
                      <div key={menuItem.id} className="flex py-4 border-b last:border-none">
                        {/* Item Image */}
                        <div className="w-24 h-24 rounded overflow-hidden mr-4">
                          <img
                            src={menuItem.image}
                            alt={menuItem.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Item Details */}
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{menuItem.name}</h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                              onClick={() => removeFromCart(menuItem.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          {selectedOptions && selectedOptions.length > 0 && (
                            <div className="text-sm text-gray-600 mt-1">
                              {selectedOptions.map((option, i) => (
                                <div key={i}>
                                  {option.name}: {option.choice.name}
                                  {option.choice.price > 0 && ` (+${formatCurrency(option.choice.price)})`}
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border rounded-md">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                                onClick={() => updateQuantity(menuItem.id, quantity - 1)}
                                disabled={quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="px-3">{quantity}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                                onClick={() => updateQuantity(menuItem.id, quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <div className="font-medium">
                              {formatCurrency(itemPrice * quantity)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            ))}
            
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={() => navigate("/restaurants")}
              >
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                Continue Shopping
              </Button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span>{formatCurrency(deliveryFee)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee</span>
                    <span>{formatCurrency(serviceFee)}</span>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                  
                  <Button
                    className="w-full py-6 mt-4 bg-food-orange hover:bg-food-red text-white"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? (
                      <span className="flex items-center">
                        <span className="animate-spin mr-2">◌</span>
                        Processing...
                      </span>
                    ) : (
                      <span>Checkout</span>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingCart className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button 
            className="bg-food-orange hover:bg-food-red text-white"
            onClick={() => navigate("/restaurants")}
          >
            Browse Restaurants
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
