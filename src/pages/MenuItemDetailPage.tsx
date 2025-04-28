
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { menuItems, restaurants } from "@/data/mockData";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Minus, Plus, ArrowLeft, Heart } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const MenuItemDetailPage = () => {
  const { restaurantId, itemId } = useParams<{ restaurantId: string; itemId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // Find the menu item
  const menuItem = menuItems.find(item => item.id === itemId && item.restaurantId === restaurantId);
  
  // Find the restaurant
  const restaurant = restaurants.find(r => r.id === restaurantId);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, { id: string; name: string; price: number }>>({});
  
  if (!menuItem || !restaurant) {
    // If item or restaurant not found, redirect to restaurant page
    navigate(`/restaurant/${restaurantId}`);
    return null;
  }
  
  // Calculate total price based on base price, quantity, and options
  const calculateTotalPrice = () => {
    let basePrice = menuItem.price;
    
    // Add option prices
    Object.values(selectedOptions).forEach(option => {
      basePrice += option.price;
    });
    
    return basePrice * quantity;
  };
  
  const handleOptionChange = (optionName: string, choice: { id: string; name: string; price: number }) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: choice
    }));
  };
  
  const handleAddToCart = () => {
    // Convert selectedOptions from object to array format expected by addToCart
    const optionsArray = menuItem.options ? 
      menuItem.options.map(option => ({
        name: option.name,
        choice: selectedOptions[option.name] || option.choices[0]
      })) : 
      undefined;
    
    addToCart(menuItem, quantity, optionsArray);
    navigate(`/restaurant/${restaurantId}`);
  };
  
  // Format the selected options for display
  const formatSelectedOptions = () => {
    return Object.entries(selectedOptions).map(([optionName, choice]) => (
      `${optionName}: ${choice.name}${choice.price > 0 ? ` (+${formatCurrency(choice.price)})` : ''}`
    )).join(', ');
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <Button 
        variant="ghost" 
        className="mb-4 flex items-center"
        onClick={() => navigate(`/restaurant/${restaurantId}`)}
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to {restaurant.name}
      </Button>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image and Description */}
        <div className="lg:w-1/2">
          <div className="relative">
            <img 
              src={menuItem.image} 
              alt={menuItem.name} 
              className="w-full h-auto rounded-lg object-cover aspect-video"
            />
            <Button 
              size="icon" 
              variant="outline" 
              className="absolute top-4 right-4 bg-white hover:bg-gray-100 text-food-red border-gray-200"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="mt-6">
            <h1 className="text-3xl font-bold mb-2">{menuItem.name}</h1>
            <p className="text-gray-600 mb-4">{menuItem.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-food-red">
                {formatCurrency(menuItem.price)}
              </span>
            </div>
          </div>
        </div>
        
        {/* Options and Quantity */}
        <div className="lg:w-1/2">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Menu Item Options */}
                {menuItem.options && menuItem.options.map((option) => (
                  <div key={option.name} className="mb-6">
                    <h3 className="font-semibold text-lg mb-2">{option.name}</h3>
                    <RadioGroup 
                      defaultValue={option.choices[0].id}
                      onValueChange={(value) => {
                        const selectedChoice = option.choices.find(c => c.id === value);
                        if (selectedChoice) {
                          handleOptionChange(option.name, selectedChoice);
                        }
                      }}
                    >
                      {option.choices.map((choice) => (
                        <div key={choice.id} className="flex items-center justify-between space-x-2 border rounded p-3 mb-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value={choice.id} id={choice.id} />
                            <Label htmlFor={choice.id}>{choice.name}</Label>
                          </div>
                          {choice.price > 0 && <span className="font-medium">+{formatCurrency(choice.price)}</span>}
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
                
                {/* Quantity Selector */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Quantity</h3>
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      disabled={quantity <= 1}
                      className="border-gray-300"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="border-gray-300"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Selected Options Summary */}
                {Object.keys(selectedOptions).length > 0 && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-1">Selected Options:</h4>
                    <p className="text-sm text-gray-600">{formatSelectedOptions()}</p>
                  </div>
                )}
                
                {/* Total and Add to Cart */}
                <div className="pt-4 border-t mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg">Total Price:</span>
                    <span className="text-xl font-bold text-food-red">{formatCurrency(calculateTotalPrice())}</span>
                  </div>
                  
                  <Button 
                    className="w-full py-6 bg-food-orange hover:bg-food-red text-white text-lg"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetailPage;
