import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import OrderTrackerStepper from '@/components/OrderTrackerStepper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, CookingPot, Bike, Home, ShoppingBag } from 'lucide-react';

// Example Order Data (in real app, fetch this based on orderId or from state)
const mockOrderDetails = {
  orderId: 'FP12345XYZ',
  items: [
    { name: 'Margherita Pizza', quantity: 2, price: 12.99 },
    { name: 'Chicken Tikka Masala', quantity: 1, price: 16.00 },
  ],
  totalCost: 46.98, // (12.99*2) + 16.00 + 5.00 delivery
  estimatedDeliveryTime: '30-40 minutes',
  deliveryAddress: '123 Main St, Anytown, 12345',
};

const orderSteps = [
  { id: 'confirmed', name: 'Order Confirmed', icon: CheckCircle, description: 'Your order has been received.' },
  { id: 'preparing', name: 'Preparing Food', icon: CookingPot, description: 'The restaurant is preparing your meal.' },
  { id: 'out_for_delivery', name: 'Out for Delivery', icon: Bike, description: 'Your food is on its way.' },
  { id: 'delivered', name: 'Delivered', icon: Home, description: 'Enjoy your meal!' },
];


const OrderSuccessAndTrackingPage = () => {
  console.log('OrderSuccessAndTrackingPage loaded');
  const { orderId } = useParams<{ orderId?: string }>(); // Optional orderId from route
  const [currentStepId, setCurrentStepId] = useState('confirmed'); // Initial state

  // Simulate order progress
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    if (currentStepId === 'confirmed') {
      timeouts.push(setTimeout(() => setCurrentStepId('preparing'), 5000)); // 5s to preparing
    }
    if (currentStepId === 'preparing') {
      timeouts.push(setTimeout(() => setCurrentStepId('out_for_delivery'), 10000)); // 10s to out for delivery
    }
    // 'delivered' state would typically be set by another event/confirmation
    return () => timeouts.forEach(clearTimeout);
  }, [currentStepId]);

  const order = mockOrderDetails; // Use mock data for now

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center">
        <Card className="w-full max-w-2xl shadow-xl">
          <CardHeader className="text-center bg-green-500 text-white p-6 rounded-t-lg">
            <CheckCircle className="h-16 w-16 mx-auto mb-4 text-white" />
            <CardTitle className="text-3xl font-bold">Order Placed Successfully!</CardTitle>
            <CardDescription className="text-green-100 text-base">
              Thank you for your order. Your food is being prepared.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Order Summary</h3>
              <p className="text-sm text-muted-foreground">Order ID: <span className="font-medium text-gray-700">{order.orderId || 'N/A'}</span></p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                {order.items.map(item => (
                  <li key={item.name}>{item.quantity}x {item.name} - ${(item.price * item.quantity).toFixed(2)}</li>
                ))}
              </ul>
              <p className="mt-2 font-semibold text-gray-800">Total Cost: <span className="text-primary">${order.totalCost.toFixed(2)}</span></p>
              <p className="text-sm text-muted-foreground mt-1">Estimated Delivery: {order.estimatedDeliveryTime}</p>
              <p className="text-sm text-muted-foreground">Delivering to: {order.deliveryAddress}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Track Your Order</h3>
              <OrderTrackerStepper currentStepId={currentStepId} steps={orderSteps} />
            </div>
          </CardContent>
          <CardFooter className="p-6 flex flex-col sm:flex-row justify-center items-center gap-4 border-t">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/">
                <ShoppingBag className="mr-2 h-5 w-5" /> Continue Shopping
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link to="/my-orders"> {/* Assuming a future "My Orders" page */}
                View All Orders
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>Need help? <Link to="/contact" className="text-primary hover:underline">Contact Support</Link></p>
      </footer>
    </div>
  );
};

export default OrderSuccessAndTrackingPage;