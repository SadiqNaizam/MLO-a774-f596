import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import MenuItemCard from '@/components/MenuItemCard'; // Using for display, could be a more compact version
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Trash2, PlusCircle, MinusCircle, CreditCard, Landmark, Truck } from 'lucide-react';
// Assuming useToast is available for notifications
// import { useToast } from "@/components/ui/use-toast";

// Mock cart items (in a real app, this would come from a global state/context)
const initialCartItems = [
  { id: 'm1', name: 'Margherita Pizza', price: 12.99, quantity: 2, imageUrl: 'https://source.unsplash.com/random/100x100/?margherita,pizza', description: "Classic" },
  { id: 'm4', name: 'Chicken Tikka Masala', price: 16.00, quantity: 1, imageUrl: 'https://source.unsplash.com/random/100x100/?tikka,masala', description: "Spicy" },
];

interface CartItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  description?: string;
}

const checkoutFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  postalCode: z.string().min(5, { message: "Postal code must be valid." }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number." }),
  paymentMethod: z.enum(["card", "paypal", "cod"], { required_error: "Please select a payment method." }),
  promoCode: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const CartCheckoutPage = () => {
  console.log('CartCheckoutPage loaded');
  const navigate = useNavigate();
  // const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItemType[]>(initialCartItems);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      phone: "",
      paymentMethod: undefined,
      promoCode: "",
    },
  });

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== itemId));
    } else {
      setCartItems(prev => prev.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item));
    }
  };

  const removeItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    // toast({ title: "Item removed from cart." });
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 5.00; // Example fee
  const total = subtotal + deliveryFee;

  function onSubmit(data: CheckoutFormValues) {
    console.log("Checkout data:", data);
    // toast({
    //   title: "Order Submitted!",
    //   description: "Redirecting to order success page...",
    // });
    // Simulate API call
    setTimeout(() => {
      // Clear cart or pass order ID
      navigate("/order-success"); // Or /order-success/orderId
    }, 1500);
  }
  
  const handleDummyAddToCart = (item: any) => {
      console.log("Dummy add to cart from MenuItemCard (not functional in cart view):", item);
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Cart & Checkout</h1>

        {cartItems.length === 0 ? (
          <Card className="text-center py-10">
            <CardHeader><CardTitle>Your Cart is Empty</CardTitle></CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Looks like you haven't added anything to your cart yet.</p>
              <Button asChild><Link to="/restaurants">Start Shopping</Link></Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Review - Left Column */}
            <section className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader><CardTitle>Review Your Order ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</CardTitle></CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px] hidden sm:table-cell">Image</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map(item => (
                        <TableRow key={item.id}>
                          <TableCell className="hidden sm:table-cell">
                            <img src={item.imageUrl || 'https://via.placeholder.com/64'} alt={item.name} className="w-16 h-16 object-cover rounded" />
                          </TableCell>
                          <TableCell>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center space-x-1">
                              <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                <MinusCircle className="h-4 w-4" />
                              </Button>
                              <span>{item.quantity}</span>
                              <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                <PlusCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                          <TableCell className="text-center">
                            <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              {/* Maybe display some "You might also like" MenuItemCards here as upsell */}
              {/* <Card>
                <CardHeader><CardTitle>You might also like</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <MenuItemCard id="promo1" name="Garlic Bread" price={5.99} onAddToCart={handleDummyAddToCart} imageUrl="https://source.unsplash.com/random/200x150/?garlic,bread" />
                   <MenuItemCard id="promo2" name="Coke" price={2.00} onAddToCart={handleDummyAddToCart} imageUrl="https://source.unsplash.com/random/200x150/?coke,can" />
                </CardContent>
              </Card> */}
            </section>

            {/* Checkout Form & Summary - Right Column */}
            <aside className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span></div>
                  <hr/>
                  <div className="flex justify-between font-bold text-lg"><span>Total</span><span>${total.toFixed(2)}</span></div>
                </CardContent>
                <CardFooter>
                    <Input type="text" placeholder="Promo Code" className="mr-2"/>
                    <Button variant="outline">Apply</Button>
                </CardFooter>
              </Card>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <Accordion type="single" collapsible defaultValue="delivery" className="w-full">
                    <AccordionItem value="delivery">
                      <AccordionTrigger className="text-lg font-semibold">
                        <div className="flex items-center gap-2"><Truck className="h-5 w-5" /> Delivery Details</div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4 space-y-4">
                        <FormField control={form.control} name="fullName" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="address" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Street Address</FormLabel>
                                <FormControl><Input placeholder="123 Main St" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="city" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl><Input placeholder="Anytown" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <FormField control={form.control} name="postalCode" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Postal Code</FormLabel>
                                    <FormControl><Input placeholder="12345" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        </div>
                        <FormField control={form.control} name="phone" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl><Input type="tel" placeholder="+1 555 123 4567" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="payment">
                      <AccordionTrigger className="text-lg font-semibold">
                        <div className="flex items-center gap-2"><CreditCard className="h-5 w-5" /> Payment Method</div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Select Payment Method</FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl><RadioGroupItem value="card" /></FormControl>
                                            <FormLabel className="font-normal flex items-center gap-2"><CreditCard className="h-4 w-4" /> Credit/Debit Card</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl><RadioGroupItem value="paypal" /></FormControl>
                                            <FormLabel className="font-normal flex items-center gap-2"><Landmark className="h-4 w-4" /> PayPal</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl><RadioGroupItem value="cod" /></FormControl>
                                            <FormLabel className="font-normal flex items-center gap-2"><Truck className="h-4 w-4" /> Cash on Delivery</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        {/* Conditional fields for card details could go here */}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <Button type="submit" className="w-full text-lg py-6" size="lg" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Placing Order..." : `Place Order ($${total.toFixed(2)})`}
                  </Button>
                </form>
              </Form>
            </aside>
          </div>
        )}
      </main>
      <footer className="py-6 bg-gray-100 border-t text-center text-sm text-muted-foreground">
        <p>Secure Checkout &copy; {new Date().getFullYear()} FoodApp</p>
      </footer>
    </div>
  );
};

export default CartCheckoutPage;