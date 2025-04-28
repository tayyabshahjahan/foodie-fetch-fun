
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { restaurants, categories } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, Clock, ShoppingCart, Truck } from "lucide-react";
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import { Input } from "@/components/ui/input";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Get featured restaurants
  const featuredRestaurants = restaurants.filter(r => r.featured);
  
  // Get all restaurants for the bottom section
  const allRestaurants = restaurants;
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/restaurants?search=${encodeURIComponent(searchTerm)}`);
  };
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-food-light-orange to-food-orange bg-opacity-70 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Delicious Food Delivered To Your Doorstep
              </h1>
              <p className="text-lg mb-6 text-gray-800">
                Order from your favorite restaurants and get food delivered in minutes.
              </p>
              
              <form onSubmit={handleSearch} className="relative max-w-md">
                <Input
                  type="text"
                  placeholder="Enter your address to find restaurants"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 pl-4 py-3 w-full rounded-lg shadow-sm"
                />
                <Button 
                  type="submit" 
                  className="absolute right-1 top-1/2 -translate-y-1/2 bg-food-red hover:bg-food-orange"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </form>
            </div>
            <div className="md:w-1/2 relative">
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop" 
                alt="Delicious Food" 
                className="rounded-lg shadow-lg w-full h-auto animate-float"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="bg-food-orange p-2 rounded-full">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Delivery Time</p>
                    <p className="text-food-orange font-bold">15-30 min</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Food Categories</h2>
            <p className="text-gray-600">Explore restaurants by cuisine type</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                className="flex flex-col items-center justify-center h-24 border-gray-200 hover:border-food-orange hover:text-food-orange transition-colors"
                onClick={() => navigate(`/restaurants?category=${category.id}`)}
              >
                <span className="text-lg font-medium">{category.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Restaurants */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Restaurants</h2>
              <p className="text-gray-600">Explore our top-rated restaurants</p>
            </div>
            <Button 
              variant="ghost" 
              className="hidden md:flex items-center text-food-orange hover:text-food-red"
              onClick={() => navigate('/restaurants')}
            >
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Button 
              variant="outline" 
              className="border-food-orange text-food-orange hover:bg-food-orange hover:text-white"
              onClick={() => navigate('/restaurants')}
            >
              View All Restaurants
            </Button>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">How It Works</h2>
            <p className="text-gray-600 max-w-lg mx-auto">
              Getting your favorite food delivered is easy with FoodieExpress
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-food-light-orange h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-food-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Restaurants</h3>
              <p className="text-gray-600">
                Find your favorite restaurant or discover new ones nearby
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-food-light-orange h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-food-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Select Your Food</h3>
              <p className="text-gray-600">
                Choose from a variety of delicious meals and add them to your cart
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-food-light-orange h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-food-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Your food will be delivered to your doorstep in no time
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* All Restaurants */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">All Restaurants</h2>
            <p className="text-gray-600">Discover all available restaurants</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Download App Banner */}
      <section className="py-12 bg-food-orange text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Download the FoodieExpress App
              </h2>
              <p className="mb-6">
                Get exclusive deals and track your deliveries in real-time.
                Order from your favorite restaurants anytime, anywhere.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="inline-block">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                    alt="App Store" 
                    className="h-10"
                  />
                </a>
                <a href="#" className="inline-block">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Google Play" 
                    className="h-10"
                  />
                </a>
              </div>
            </div>
            <div className="md:w-1/3">
              <img 
                src="https://cdni.iconscout.com/illustration/premium/thumb/food-delivery-app-3464462-2918045.png" 
                alt="Mobile App" 
                className="w-full h-auto max-w-xs mx-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
