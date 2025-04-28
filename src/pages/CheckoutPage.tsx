
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { Check, MapPin, Clock } from "lucide-react";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { getCartTotal, clearCart } = useCart();
  
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);
  
  const subtotal = getCartTotal();
  const deliveryFee = 3.99;
  const serviceFee = 1.99;
  const total = subtotal + deliveryFee + serviceFee;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      clearCart();
      
      // Redirect to home after order confirmation
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }, 2000);
  };
  
  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Placed!</h1>
          <p className="text-gray-600 mb-8">
            Your order has been successfully placed. You will receive a confirmation email shortly.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Order Number:</span>
              <span>#FE{Math.floor(Math.random() * 100000)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Total Amount:</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Estimated Delivery:</span>
              <span>30-45 minutes</span>
            </div>
          </div>
          <Button 
            className="bg-food-orange hover:bg-food-red text-white"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit}>
            {/* Delivery Address */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-food-orange" />
                    Delivery Address
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="(123) 456-7890"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St, Apt 4B"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="New York"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      placeholder="NY"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zip">Zip Code</Label>
                    <Input
                      id="zip"
                      placeholder="10001"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Delivery Time */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold flex items-center mb-4">
                  <Clock className="h-5 w-5 mr-2 text-food-orange" />
                  Delivery Time
                </h2>
                
                <RadioGroup defaultValue="asap">
                  <div className="flex items-center space-x-2 border rounded p-3 mb-2">
                    <RadioGroupItem value="asap" id="asap" />
                    <Label htmlFor="asap">As soon as possible (30-45 min)</Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded p-3">
                    <RadioGroupItem value="scheduled" id="scheduled" />
                    <Label htmlFor="scheduled">Schedule for later</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
            
            {/* Payment Method */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 border rounded p-3 mb-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center">
                      <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                        <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="2" />
                      </svg>
                      Credit / Debit Card
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 border rounded p-3 mb-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex items-center">
                      <svg className="h-6 w-6 mr-2 text-blue-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.5 20.5H7L8 13.5H10.5C12.5 13.5 13 11.5 13 11.5C13 9.5 11 9.5 10.5 9.5H6.5L7.5 3.5H11.5C14.5 3.5 16.5 5 16.5 7.5C16.5 10 15 13.5 13 13.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      PayPal
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 border rounded p-3">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex items-center">
                      <svg className="h-6 w-6 mr-2 text-green-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4 5C2.89543 5 2 5.89543 2 7V17C2 18.1046 2.89543 19 4 19H20C21.1046 19 22 18.1046 22 17V7C22 5.89543 21.1046 5 20 5H4ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"/>
                      </svg>
                      Cash on Delivery
                    </Label>
                  </div>
                </RadioGroup>
                
                {/* Card Details - Show only when Card payment method is selected */}
                {paymentMethod === "card" && (
                  <div className="mt-4 p-4 border rounded-lg">
                    <div className="mb-4">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Additional Instructions */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Additional Instructions</h2>
                <Textarea 
                  placeholder="Special instructions for delivery, food preparation, etc."
                  className="resize-none"
                />
              </CardContent>
            </Card>
            
            <div className="lg:hidden">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>{formatCurrency(deliveryFee)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Service Fee</span>
                  <span>{formatCurrency(serviceFee)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full py-6 bg-food-orange hover:bg-food-red text-white"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2">◌</span>
                  Processing...
                </span>
              ) : (
                <span>Place Order • {formatCurrency(total)}</span>
              )}
            </Button>
          </form>
        </div>
        
        {/* Order Summary - Desktop */}
        <div className="lg:w-1/3 hidden lg:block">
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
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
