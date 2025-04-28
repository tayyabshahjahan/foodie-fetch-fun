
import { Restaurant } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
        <div className="relative h-48 overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
          {restaurant.featured && (
            <div className="absolute top-2 right-2 bg-food-yellow text-gray-800 text-xs font-semibold px-2 py-1 rounded-full">
              Featured
            </div>
          )}
        </div>
        <CardContent className="pt-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg line-clamp-1">{restaurant.name}</h3>
            <div className="flex items-center bg-food-orange bg-opacity-10 px-2 py-1 rounded">
              <Star className="h-4 w-4 text-food-orange fill-food-orange mr-1" />
              <span className="text-sm font-medium">{restaurant.rating}</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-3">{restaurant.cuisine}</p>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              <span>{restaurant.deliveryFee.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;
