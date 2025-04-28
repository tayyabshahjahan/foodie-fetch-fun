
export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  featured?: boolean;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  popular?: boolean;
  options?: {
    name: string;
    choices: {
      id: string;
      name: string;
      price: number;
    }[];
  }[];
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedOptions?: {
    name: string;
    choice: {
      id: string;
      name: string;
      price: number;
    };
  }[];
}
