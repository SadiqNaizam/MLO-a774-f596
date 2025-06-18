import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Carousel from '@/components/Carousel';
import RestaurantCard from '@/components/RestaurantCard';
import CuisineTag from '@/components/CuisineTag';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';

const placeholderCarouselSlides = [
  { id: 1, content: 'https://source.unsplash.com/random/1200x500/?food,promotion', altText: 'Special food promotion' },
  { id: 2, content: 'https://source.unsplash.com/random/1200x500/?restaurant,offer', altText: 'Restaurant special offer' },
  { id: 3, content: 'https://source.unsplash.com/random/1200x500/?cuisine,deal', altText: 'Cuisine of the week deal' },
];

const placeholderRestaurants = [
  { id: '1', name: 'The Gourmet Place', imageUrl: 'https://source.unsplash.com/random/400x300/?modern,restaurant', cuisineTypes: ['Italian', 'Pizza'], rating: 4.5, deliveryTimeEstimate: '25-35 min', slug: 'the-gourmet-place' },
  { id: '2', name: 'Spicy Corner', imageUrl: 'https://source.unsplash.com/random/400x300/?indian,food', cuisineTypes: ['Indian', 'Curry'], rating: 4.2, deliveryTimeEstimate: '30-40 min', slug: 'spicy-corner' },
  { id: '3', name: 'Burger Hub', imageUrl: 'https://source.unsplash.com/random/400x300/?burger,meal', cuisineTypes: ['American', 'Burgers'], rating: 4.7, deliveryTimeEstimate: '20-30 min', slug: 'burger-hub' },
  { id: '4', name: 'Sushi World', imageUrl: 'https://source.unsplash.com/random/400x300/?sushi,rolls', cuisineTypes: ['Japanese', 'Sushi'], rating: 4.6, deliveryTimeEstimate: '35-45 min', slug: 'sushi-world' },
];

const placeholderCuisines = ['Italian', 'Indian', 'Burgers', 'Sushi', 'Mexican', 'Chinese', 'Vegan'];

const HomePage = () => {
  console.log('HomePage loaded');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeCuisine, setActiveCuisine] = React.useState<string | null>(null);

  const handleCuisineClick = (cuisineName: string) => {
    setActiveCuisine(activeCuisine === cuisineName ? null : cuisineName);
    // In a real app, this would trigger filtering of restaurants
    console.log('Selected cuisine:', cuisineName);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu />
      <main className="flex-grow">
        {/* Hero/Search Section */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Discover Your Next Favorite Meal</h1>
            <p className="text-lg md:text-xl mb-8">Search for restaurants, cuisines, or dishes near you.</p>
            <form className="max-w-2xl mx-auto relative" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="search"
                placeholder="Enter restaurant, cuisine, or dish..."
                className="w-full p-4 pr-16 rounded-lg text-lg text-gray-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="icon" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600">
                <Search className="h-6 w-6" />
              </Button>
            </form>
          </div>
        </section>

        {/* Carousel for Promotions */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Carousel slides={placeholderCarouselSlides} options={{ loop: true }} autoplayDelay={5000} />
          </div>
        </section>

        {/* Cuisine Tags Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Popular Cuisines</h2>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-3 pb-4">
                {placeholderCuisines.map((cuisine) => (
                  <CuisineTag
                    key={cuisine}
                    cuisineName={cuisine}
                    isActive={activeCuisine === cuisine}
                    onClick={handleCuisineClick}
                    size="md"
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </section>

        {/* Featured Restaurants Section */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Featured Restaurants</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {placeholderRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" size="lg" onClick={() => console.log('View all restaurants')}>
                View All Restaurants
              </Button>
            </div>
          </div>
        </section>
      </main>
      {/* A simple footer example, replace or enhance as needed */}
      <footer className="py-6 bg-gray-800 text-white text-center">
        <p>&copy; {new Date().getFullYear()} FoodApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;