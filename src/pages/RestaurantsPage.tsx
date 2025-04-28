
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { restaurants, categories } from "@/data/mockData";
import { Restaurant } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const RestaurantsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(restaurants);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");

  // Filter restaurants based on search term and category
  useEffect(() => {
    let results = restaurants;
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory && selectedCategory !== "all") {
      results = results.filter(restaurant => 
        restaurant.cuisine.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    setFilteredRestaurants(results);
  }, [searchTerm, selectedCategory]);
  
  // Update URL search params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    setSearchParams(params);
  }, [searchTerm, selectedCategory, setSearchParams]);
  
  // Handle category selection
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Already updating via the useEffect
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Restaurants</h1>
      
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        {/* Search Form */}
        <form onSubmit={handleSearch} className="w-full md:w-1/2">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search restaurants or cuisines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 w-full"
            />
            <Button 
              type="submit" 
              size="icon" 
              className="absolute right-0 top-0 bg-food-orange hover:bg-food-red text-white"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>
        
        {/* Categories - Desktop */}
        <div className="hidden md:flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={
                selectedCategory === category.id
                  ? "bg-food-orange hover:bg-food-red text-white"
                  : "border-gray-200 hover:border-food-orange hover:text-food-orange"
              }
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        
        {/* Filter Button - Mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <Button className="md:hidden flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[60vh]">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={
                    selectedCategory === category.id
                      ? "bg-food-orange hover:bg-food-red text-white"
                      : "border-gray-200 hover:border-food-orange hover:text-food-orange"
                  }
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Results */}
      {filteredRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <h3 className="text-xl font-semibold mb-2">No restaurants found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <Button 
            className="mt-4 bg-food-orange hover:bg-food-red text-white"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default RestaurantsPage;
