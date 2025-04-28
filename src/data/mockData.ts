
import { MenuItem, Restaurant } from "../types";

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Burger Palace",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=500&auto=format&fit=crop",
    cuisine: "American",
    rating: 4.5,
    deliveryTime: "15-25 min",
    deliveryFee: 2.99,
    featured: true,
  },
  {
    id: "2",
    name: "Pizza Heaven",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500&auto=format&fit=crop",
    cuisine: "Italian",
    rating: 4.7,
    deliveryTime: "20-30 min",
    deliveryFee: 1.99,
    featured: true,
  },
  {
    id: "3",
    name: "Sushi Express",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=500&auto=format&fit=crop",
    cuisine: "Japanese",
    rating: 4.8,
    deliveryTime: "25-35 min",
    deliveryFee: 3.99,
    featured: true,
  },
  {
    id: "4",
    name: "Taco Town",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=500&auto=format&fit=crop",
    cuisine: "Mexican",
    rating: 4.2,
    deliveryTime: "15-25 min",
    deliveryFee: 2.49,
  },
  {
    id: "5",
    name: "Pasta Paradise",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=500&auto=format&fit=crop",
    cuisine: "Italian",
    rating: 4.6,
    deliveryTime: "20-30 min",
    deliveryFee: 2.99,
  },
  {
    id: "6",
    name: "Curry House",
    image: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?q=80&w=500&auto=format&fit=crop",
    cuisine: "Indian",
    rating: 4.4,
    deliveryTime: "25-35 min",
    deliveryFee: 3.49,
  },
];

export const menuItems: MenuItem[] = [
  // Burger Palace Menu
  {
    id: "b1",
    restaurantId: "1",
    name: "Classic Cheeseburger",
    description: "Beef patty with cheese, lettuce, tomato, and special sauce",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop",
    price: 9.99,
    category: "Burgers",
    popular: true,
    options: [
      {
        name: "Size",
        choices: [
          { id: "s1", name: "Regular", price: 0 },
          { id: "s2", name: "Double Patty", price: 3.00 },
        ],
      },
      {
        name: "Sides",
        choices: [
          { id: "side1", name: "French Fries", price: 2.99 },
          { id: "side2", name: "Onion Rings", price: 3.99 },
        ],
      },
    ],
  },
  {
    id: "b2",
    restaurantId: "1",
    name: "BBQ Bacon Burger",
    description: "Beef patty with bacon, cheddar, BBQ sauce, and onion rings",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=500&auto=format&fit=crop",
    price: 12.99,
    category: "Burgers",
    popular: true,
  },
  {
    id: "b3",
    restaurantId: "1",
    name: "Veggie Burger",
    description: "Plant-based patty with lettuce, tomato, and vegan mayo",
    image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?q=80&w=500&auto=format&fit=crop",
    price: 10.99,
    category: "Burgers",
  },
  
  // Pizza Heaven Menu
  {
    id: "p1",
    restaurantId: "2",
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=500&auto=format&fit=crop",
    price: 12.99,
    category: "Pizzas",
    popular: true,
    options: [
      {
        name: "Size",
        choices: [
          { id: "ps1", name: "Medium (12\")", price: 0 },
          { id: "ps2", name: "Large (16\")", price: 4.00 },
        ],
      },
      {
        name: "Crust",
        choices: [
          { id: "pc1", name: "Regular", price: 0 },
          { id: "pc2", name: "Thin Crust", price: 0 },
          { id: "pc3", name: "Stuffed Crust", price: 2.00 },
        ],
      },
    ],
  },
  {
    id: "p2",
    restaurantId: "2",
    name: "Pepperoni Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and pepperoni",
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=500&auto=format&fit=crop",
    price: 14.99,
    category: "Pizzas",
    popular: true,
  },
  {
    id: "p3",
    restaurantId: "2",
    name: "Supreme Pizza",
    description: "Loaded with pepperoni, sausage, peppers, onions, olives, and mushrooms",
    image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=500&auto=format&fit=crop",
    price: 16.99,
    category: "Pizzas",
  },
  
  // Sushi Express Menu
  {
    id: "s1",
    restaurantId: "3",
    name: "California Roll",
    description: "Crab, avocado, and cucumber wrapped in seaweed and rice",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=500&auto=format&fit=crop",
    price: 8.99,
    category: "Rolls",
    popular: true,
    options: [
      {
        name: "Size",
        choices: [
          { id: "ss1", name: "6 pieces", price: 0 },
          { id: "ss2", name: "12 pieces", price: 7.99 },
        ],
      },
      {
        name: "Sides",
        choices: [
          { id: "sa1", name: "Miso Soup", price: 2.49 },
          { id: "sa2", name: "Edamame", price: 3.49 },
        ],
      },
    ],
  },
  {
    id: "s2",
    restaurantId: "3",
    name: "Spicy Tuna Roll",
    description: "Fresh tuna with spicy mayo, wrapped in seaweed and rice",
    image: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?q=80&w=500&auto=format&fit=crop",
    price: 10.99,
    category: "Rolls",
    popular: true,
  },
];

export const categories = [
  { id: "all", name: "All" },
  { id: "american", name: "American" },
  { id: "italian", name: "Italian" },
  { id: "japanese", name: "Japanese" },
  { id: "mexican", name: "Mexican" },
  { id: "indian", name: "Indian" },
];
