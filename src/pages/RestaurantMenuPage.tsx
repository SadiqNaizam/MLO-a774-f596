import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import MenuItemCard from '@/components/MenuItemCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Star, Clock, MapPin, Phone, Info, PlusCircle, MinusCircle, ShoppingCart } from 'lucide-react';

// Mock data - in a real app, this would come from an API based on `slug`
const mockRestaurantData: { [key: string]: any } = {
  'bella-italia': {
    name: 'Bella Italia',
    logoUrl: 'https://source.unsplash.com/random/100x100/?italian,logo',
    rating: 4.7,
    reviewsCount: 250,
    address: '123 Pasta Lane, Rome',
    phone: '555-1234',
    openingHours: '11:00 AM - 10:00 PM',
    cuisineTypes: ['Italian', 'Pizza', 'Pasta'],
    description: 'Authentic Italian cuisine with a modern twist. Fresh ingredients and a cozy atmosphere.',
    menu: [
      { id: 'm1', name: 'Margherita Pizza', description: 'Classic tomato, mozzarella, and basil.', price: 12.99, imageUrl: 'https://source.unsplash.com/random/300x200/?margherita,pizza' },
      { id: 'm2', name: 'Spaghetti Carbonara', description: 'Creamy pasta with pancetta and parmesan.', price: 15.50, imageUrl: 'https://source.unsplash.com/random/300x200/?carbonara,pasta' },
      { id: 'm3', name: 'Tiramisu', description: 'Delicious coffee-flavored Italian dessert.', price: 7.00, imageUrl: 'https://source.unsplash.com/random/300x200/?tiramisu,dessert' },
    ]
  },
  'curry-kingdom': {
    name: 'Curry Kingdom',
    logoUrl: 'https://source.unsplash.com/random/100x100/?indian,emblem',
    rating: 4.5,
    reviewsCount: 180,
    address: '456 Spice Route, New Delhi',
    phone: '555-5678',
    openingHours: '12:00 PM - 11:00 PM',
    cuisineTypes: ['Indian', 'Curry', 'Biryani'],
    description: 'Experience the rich flavors of traditional Indian cooking. Wide variety of vegetarian and non-vegetarian dishes.',
    menu: [
      { id: 'm4', name: 'Chicken Tikka Masala', description: 'Grilled chicken in a creamy tomato sauce.', price: 16.00, imageUrl: 'https://source.unsplash.com/random/300x200/?tikka,masala' },
      { id: 'm5', name: 'Vegetable Biryani', description: 'Aromatic basmati rice with mixed vegetables.', price: 13.50, imageUrl: 'https://source.unsplash.com/random/300x200/?veg,biryani' },
      { id: 'm6', name: 'Garlic Naan', description: 'Soft Indian bread with garlic and butter.', price: 4.00, imageUrl: 'https://source.unsplash.com/random/300x200/?garlic,naan' },
    ]
  },
   // Add more restaurants as needed by copying structure of 'bella-italia' or 'curry-kingdom'
    'quick-bite-burgers': {
    name: 'Quick Bite Burgers',
    logoUrl: 'https://source.unsplash.com/random/100x100/?burger,sign',
    rating: 4.2,
    reviewsCount: 320,
    address: '789 Fast Lane, NYC',
    phone: '555-BURGER',
    openingHours: '10:00 AM - 02:00 AM',
    cuisineTypes: ['American', 'Burgers', 'Fries'],
    description: 'Juicy burgers, crispy fries, and delicious milkshakes. Your go-to spot for a quick and satisfying meal.',
    menu: [
      { id: 'm7', name: 'Classic Cheeseburger', description: 'Beef patty, cheddar cheese, lettuce, tomato, onion, pickles.', price: 9.99, imageUrl: 'https://source.unsplash.com/random/300x200/?cheeseburger' },
      { id: 'm8', name: 'Spicy Chicken Burger', description: 'Crispy chicken, spicy mayo, lettuce.', price: 10.50, imageUrl: 'https://source.unsplash.com/random/300x200/?chicken,burger' },
      { id: 'm9', name: 'Loaded Fries', description: 'Fries topped with cheese, bacon bits, and sour cream.', price: 6.50, imageUrl: 'https://source.unsplash.com/random/300x200/?loaded,fries' },
    ]
  },
};


interface CartItem extends Pick<MenuItemCardProps, 'id' | 'name' | 'price'> {
  quantity: number;
}
interface MenuItemCardProps {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  onAddToCart: (item: Pick<MenuItemCardProps, 'id' | 'name' | 'price'>) => void;
  onViewDetails?: (itemId: string | number) => void;
}


const RestaurantMenuPage = () => {
  console.log('RestaurantMenuPage loaded');
  const { slug } = useParams<{ slug: string }>();
  const restaurant = slug ? mockRestaurantData[slug] : null;

  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemCardProps | null>(null);
  const [itemCustomizationNotes, setItemCustomizationNotes] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);


  const handleAddToCart = (item: Pick<MenuItemCardProps, 'id' | 'name' | 'price'>) => {
    // For simplicity, we'll use the dialog for customization if details are viewed
    // Or add directly if no customization dialog is triggered
    console.log('Adding to cart (from card):', item, "Quantity:", 1, "Notes:", "");
    setCart(prevCart => {
        const existingItem = prevCart.find(ci => ci.id === item.id);
        if (existingItem) {
            return prevCart.map(ci => ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci);
        }
        return [...prevCart, { ...item, quantity: 1 }];
    });
    // toast({ title: `${item.name} added to cart` }); // Assuming toast is globally available
  };

  const handleViewDetails = (itemId: string | number) => {
    const item = restaurant?.menu.find((mi: any) => mi.id === itemId);
    if (item) {
      setSelectedMenuItem(item);
      setItemQuantity(1); // Reset quantity for new item dialog
      setItemCustomizationNotes(''); // Reset notes
    }
  };
  
  const handleDialogAddToCart = () => {
    if (selectedMenuItem) {
      console.log('Adding to cart (from dialog):', selectedMenuItem.name, "Quantity:", itemQuantity, "Notes:", itemCustomizationNotes);
       setCart(prevCart => {
        const existingItem = prevCart.find(ci => ci.id === selectedMenuItem.id);
        if (existingItem) {
            return prevCart.map(ci => ci.id === selectedMenuItem.id ? { ...ci, quantity: ci.quantity + itemQuantity } : ci);
        }
        return [...prevCart, { ...selectedMenuItem, price: selectedMenuItem.price, quantity: itemQuantity }];
    });
      // toast({ title: `${itemQuantity}x ${selectedMenuItem.name} added to cart` });
      setSelectedMenuItem(null); // Close dialog
    }
  };


  if (!restaurant) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavigationMenu />
        <main className="flex-grow container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold">Restaurant not found</h1>
          <p className="text-muted-foreground">The restaurant you are looking for does not exist or the link is incorrect.</p>
          <Button asChild className="mt-4">
            <Link to="/restaurants">Back to Restaurants</Link>
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/restaurants">Restaurants</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{restaurant.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Restaurant Info Section */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-4 p-6">
            <Avatar className="h-24 w-24 border">
              <AvatarImage src={restaurant.logoUrl} alt={restaurant.name} />
              <AvatarFallback>{restaurant.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-3xl font-bold">{restaurant.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span>{restaurant.rating} ({restaurant.reviewsCount} reviews)</span>
                <span className="mx-1">·</span>
                <span>{restaurant.cuisineTypes.join(', ')}</span>
              </div>
              <CardDescription className="mt-2 text-base">{restaurant.description}</CardDescription>
            </div>
            <div className="text-sm space-y-1 mt-4 md:mt-0 md:text-right">
                <p className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-muted-foreground" /> {restaurant.address}</p>
                <p className="flex items-center gap-1.5"><Phone className="h-4 w-4 text-muted-foreground" /> {restaurant.phone}</p>
                <p className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-muted-foreground" /> {restaurant.openingHours}</p>
            </div>
          </CardHeader>
        </Card>

        {/* Menu Items Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Menu</h2>
          {restaurant.menu && restaurant.menu.length > 0 ? (
            <ScrollArea className="h-[calc(100vh-450px)]"> {/* Adjust height dynamically */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurant.menu.map((item: any) => (
                  <MenuItemCard
                    key={item.id}
                    {...item}
                    onAddToCart={handleAddToCart}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <p className="text-muted-foreground">No menu items available for this restaurant yet.</p>
          )}
        </section>

        {/* Item Customization Dialog */}
        {selectedMenuItem && (
          <Dialog open={!!selectedMenuItem} onOpenChange={() => setSelectedMenuItem(null)}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{selectedMenuItem.name}</DialogTitle>
                <DialogDescription>{selectedMenuItem.description}</DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                {selectedMenuItem.imageUrl && 
                    <img src={selectedMenuItem.imageUrl} alt={selectedMenuItem.name} className="w-full h-48 object-cover rounded-md" />
                }
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">Price: ${selectedMenuItem.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => setItemQuantity(q => Math.max(1, q - 1))}><MinusCircle className="h-4 w-4" /></Button>
                        <span className="w-10 text-center">{itemQuantity}</span>
                        <Button variant="outline" size="icon" onClick={() => setItemQuantity(q => q + 1)}><PlusCircle className="h-4 w-4" /></Button>
                    </div>
                </div>
                <div>
                  <label htmlFor="customization-notes" className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                  <Textarea
                    id="customization-notes"
                    placeholder="Any special requests? (e.g., no onions, extra spicy)"
                    value={itemCustomizationNotes}
                    onChange={(e) => setItemCustomizationNotes(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedMenuItem(null)}>Cancel</Button>
                <Button onClick={handleDialogAddToCart}>
                    Add {itemQuantity} to Cart (${(selectedMenuItem.price * itemQuantity).toFixed(2)})
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </main>
      {cart.length > 0 && (
        <footer className="sticky bottom-0 bg-gray-900 text-white p-4 shadow-md-top">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <p className="font-semibold">{cart.reduce((acc, item) => acc + item.quantity, 0)} items in cart</p>
                    <p className="text-sm">Total: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
                </div>
                <Button asChild variant="secondary" size="lg">
                    <Link to="/cart"><ShoppingCart className="mr-2 h-5 w-5" /> View Cart & Checkout</Link>
                </Button>
            </div>
        </footer>
      )}
    </div>
  );
};

export default RestaurantMenuPage;