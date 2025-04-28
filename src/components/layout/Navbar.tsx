
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Search, Map, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-food-orange font-bold text-2xl">
            Foodie<span className="text-food-red">Express</span>
          </span>
        </Link>
        
        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium hover:text-food-orange transition-colors">
            Home
          </Link>
          <Link to="/restaurants" className="font-medium hover:text-food-orange transition-colors">
            Restaurants
          </Link>
          <Link to="#" className="font-medium hover:text-food-orange transition-colors">
            Offers
          </Link>
          <Link to="#" className="font-medium hover:text-food-orange transition-colors">
            About
          </Link>
        </nav>
        
        {/* Action Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Map className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Link to="/cart">
            <Button variant="outline" className="flex items-center gap-2 border-food-orange text-food-orange hover:bg-food-orange hover:text-white">
              <ShoppingCart className="h-5 w-5" />
              <span className="font-medium">{getTotalItems()}</span>
            </Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-3 md:hidden">
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-food-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white p-4 shadow-lg">
          <nav className="flex flex-col space-y-3">
            <Link to="/" className="font-medium py-2 hover:text-food-orange transition-colors" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/restaurants" className="font-medium py-2 hover:text-food-orange transition-colors" onClick={toggleMenu}>
              Restaurants
            </Link>
            <Link to="#" className="font-medium py-2 hover:text-food-orange transition-colors" onClick={toggleMenu}>
              Offers
            </Link>
            <Link to="#" className="font-medium py-2 hover:text-food-orange transition-colors" onClick={toggleMenu}>
              About
            </Link>
            <div className="flex space-x-4 py-2">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Map className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
