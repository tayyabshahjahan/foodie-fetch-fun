
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { restaurants, menuItems, categories } from "@/data/mockData";
import { Star, Clock, DollarSign, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MenuItemCard from "@/components/restaurant/MenuItemCard";

const RestaurantDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Find the restaurant by ID
  const restaurant = restaurants.find(r => r.id === id);
  
  // Get the menu items for this restaurant
  const restaurantMenuItems = menuItems.filter(item => item.restaurantId === id);
  
  // Get unique categories from menu items
  const menuCategories = ["all", ...new Set(restaurantMenuItems.map(item => item.category))];
  
  // Filter menu items based on search and category
  const filteredMenuItems = restaurantMenuItems.filter(item => {
    // Filter by search term
    const matchesSearch = searchTerm === "" || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    // Filter by category
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // If restaurant not found, navigate back to restaurants page
  useEffect(() => {
    if (!restaurant) {
      navigate('/restaurants');
    }
  }, [restaurant, navigate]);
  
  if (!restaurant) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div>
      {/* Restaurant Header */}
      <div className="relative h-64 md:h-80">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
            <p className="text-lg text-white/90 mb-3">{restaurant.cuisine}</p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-1 fill-yellow-400 text-yellow-400" />
                <span>{restaurant.rating} (200+ ratings)</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-1" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-1" />
                <span>Delivery fee: ${restaurant.deliveryFee.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Menu</h2>
          
          {/* Search */}
          <div className="relative max-w-md mb-6">
            <Input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          
          {/* Category Tabs */}
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="mb-4 overflow-x-auto flex w-full border-b border-gray-200 pb-1">
              {menuCategories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:border-b-2 data-[state=active]:border-food-orange data-[state=active]:text-food-orange capitalize"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value={activeCategory} className="mt-2">
              {filteredMenuItems.length > 0 ? (
                <div className="grid gap-4">
                  {filteredMenuItems.map((menuItem) => (
                    <MenuItemCard 
                      key={menuItem.id} 
                      menuItem={menuItem} 
                      restaurantId={restaurant.id} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">No menu items found matching your search.</p>
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => {
                      setSearchTerm("");
                      setActiveCategory("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
