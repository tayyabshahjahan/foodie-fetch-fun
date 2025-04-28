
import { MenuItem } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/lib/utils";

interface MenuItemCardProps {
  menuItem: MenuItem;
  restaurantId: string;
}

const MenuItemCard = ({ menuItem, restaurantId }: MenuItemCardProps) => {
  return (
    <Link to={`/restaurant/${restaurantId}/menu/${menuItem.id}`}>
      <Card className="overflow-hidden h-full hover:shadow-md transition-shadow duration-300 border-gray-100">
        <div className="flex flex-col md:flex-row h-full">
          <div className="md:w-1/3 h-32 md:h-auto overflow-hidden">
            <img
              src={menuItem.image}
              alt={menuItem.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
          <CardContent className="p-4 flex flex-col justify-between md:w-2/3 h-full">
            <div className="mb-2">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-lg">{menuItem.name}</h3>
                {menuItem.popular && (
                  <span className="bg-food-orange text-white text-xs px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm line-clamp-2">{menuItem.description}</p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="font-semibold">{formatCurrency(menuItem.price)}</span>
              <Button size="sm" className="bg-food-orange hover:bg-food-red text-white">
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

export default MenuItemCard;
