import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Sidebar from '@/components/layout/Sidebar';
import RestaurantCard from '@/components/RestaurantCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Filter, Search, X } from 'lucide-react';
import { Label } from '@/components/ui/label';

const allRestaurants = [
  { id: '1', name: 'Bella Italia', imageUrl: 'https://source.unsplash.com/random/400x300/?italian,dining', cuisineTypes: ['Italian', 'Pasta'], rating: 4.7, deliveryTimeEstimate: '30-40 min', slug: 'bella-italia', priceRange: 2 },
  { id: '2', name: 'Curry Kingdom', imageUrl: 'https://source.unsplash.com/random/400x300/?indian,curry', cuisineTypes: ['Indian'], rating: 4.5, deliveryTimeEstimate: '35-45 min', slug: 'curry-kingdom', priceRange: 2 },
  { id: '3', name: 'Quick Bite Burgers', imageUrl: 'https://source.unsplash.com/random/400x300/?fastfood,burger', cuisineTypes: ['American', 'Burgers'], rating: 4.2, deliveryTimeEstimate: '20-30 min', slug: 'quick-bite-burgers', priceRange: 1 },
  { id: '4', name: 'Zen Garden Sushi', imageUrl: 'https://source.unsplash.com/random/400x300/?sushi,japanese', cuisineTypes: ['Japanese', 'Sushi'], rating: 4.8, deliveryTimeEstimate: '40-50 min', slug: 'zen-garden-sushi', priceRange: 3 },
  { id: '5', name: 'Taco Fiesta', imageUrl: 'https://source.unsplash.com/random/400x300/?mexican,tacos', cuisineTypes: ['Mexican'], rating: 4.4, deliveryTimeEstimate: '25-35 min', slug: 'taco-fiesta', priceRange: 1 },
  { id: '6', name: 'Pizzeria Roma', imageUrl: 'https://source.unsplash.com/random/400x300/?pizza,oven', cuisineTypes: ['Italian', 'Pizza'], rating: 4.6, deliveryTimeEstimate: '30-40 min', slug: 'pizzeria-roma', priceRange: 2 },
];

const cuisineOptions = ['All', 'Italian', 'Indian', 'American', 'Japanese', 'Mexican'];
const ratingOptions = [1, 2, 3, 4, 5]; // Min rating

const RestaurantListingPage = () => {
  console.log('RestaurantListingPage loaded');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [minRating, setMinRating] = useState(1);
  const [priceRange, setPriceRange] = useState<[number]>([3]); // Max price level (1-3 or 1-4)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Example value

  // Apply filters (example logic)
  const filteredRestaurants = allRestaurants.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCuisine === 'All' || r.cuisineTypes.includes(selectedCuisine)) &&
    r.rating >= minRating &&
    (r.priceRange ? r.priceRange <= priceRange[0] : true) // Assuming priceRange in data is 1,2,3
  );

  const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage);
  const paginatedRestaurants = filteredRestaurants.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 flex-grow">
        {/* Sidebar for Filters */}
        <Sidebar title="Filters" className="w-full md:w-1/4 lg:w-1/5 h-fit md:sticky md:top-20">
            <div className="space-y-6">
                <div>
                    <Label htmlFor="cuisine-select" className="text-sm font-medium">Cuisine</Label>
                    <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                        <SelectTrigger id="cuisine-select">
                            <SelectValue placeholder="Select Cuisine" />
                        </SelectTrigger>
                        <SelectContent>
                            {cuisineOptions.map(cuisine => (
                                <SelectItem key={cuisine} value={cuisine}>{cuisine}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="rating-select" className="text-sm font-medium">Minimum Rating</Label>
                     <Select value={String(minRating)} onValueChange={(val) => setMinRating(Number(val))}>
                        <SelectTrigger id="rating-select">
                            <SelectValue placeholder="Select Min Rating" />
                        </SelectTrigger>
                        <SelectContent>
                            {ratingOptions.map(rating => (
                                <SelectItem key={rating} value={String(rating)}>{rating} Star{rating > 1 ? 's' : ''} & Up</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label className="text-sm font-medium">Price Range (Max)</Label>
                    <div className="flex items-center space-x-2 pt-2">
                        <span>$</span>
                        <Slider
                            defaultValue={[3]}
                            value={priceRange}
                            max={4}
                            min={1}
                            step={1}
                            onValueChange={(value: number[]) => setPriceRange(value as [number])}
                        />
                        <span>$$$$</span>
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-1">Up to {'$'.repeat(priceRange[0])}</p>
                </div>
                 <div>
                    <Label className="text-sm font-medium">Dietary Options</Label>
                    <div className="space-y-2 mt-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="vegetarian" />
                            <Label htmlFor="vegetarian" className="text-sm font-normal">Vegetarian</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="vegan" />
                            <Label htmlFor="vegan" className="text-sm font-normal">Vegan</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="gluten-free" />
                            <Label htmlFor="gluten-free" className="text-sm font-normal">Gluten-Free</Label>
                        </div>
                    </div>
                </div>
                <Button className="w-full" onClick={() => console.log("Apply filters")}>Apply Filters</Button>
            </div>
        </Sidebar>

        {/* Main Content Area for Restaurant Listings */}
        <main className="w-full md:w-3/4 lg:w-4/5">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:max-w-md">
              <Input
                type="search"
                placeholder="Search restaurants by name..."
                className="w-full pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">{filteredRestaurants.length} results</p>
                {/* Example Sort By */}
                <Select defaultValue="rating">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="rating">Rating</SelectItem>
                        <SelectItem value="deliveryTime">Delivery Time</SelectItem>
                        <SelectItem value="name">Name (A-Z)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-250px)] pr-3"> {/* Adjust height as needed */}
            {paginatedRestaurants.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} {...restaurant} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-xl font-semibold">No Restaurants Found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters.</p>
              </div>
            )}
          </ScrollArea>

          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }} aria-disabled={currentPage === 1} />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink href="#" isActive={currentPage === i + 1} onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }}>
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {/* Add Ellipsis if many pages */}
                <PaginationItem>
                  <PaginationNext href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }} aria-disabled={currentPage === totalPages} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </main>
      </div>
       <footer className="py-6 bg-gray-100 border-t text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} FoodApp Listings. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RestaurantListingPage;