import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star, Clock } from 'lucide-react';

interface RestaurantCardProps {
  id: string | number;
  name: string;
  imageUrl: string;
  cuisineTypes: string[]; // e.g., ["Italian", "Pizza"]
  rating: number; // e.g., 4.5
  deliveryTimeEstimate: string; // e.g., "25-35 min"
  // Optional: priceRange (e.g., "$$"), distance, specialOffers
  slug: string; // for linking: e.g., /restaurants/restaurant-name
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  cuisineTypes,
  rating,
  deliveryTimeEstimate,
  slug,
}) => {
  console.log("Rendering RestaurantCard:", name, id);

  return (
    <Link to={`/restaurants/${slug}`} className="block group">
      <Card className="w-full overflow-hidden transition-all duration-300 group-hover:shadow-xl">
        <CardHeader className="p-0">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl || '/placeholder.svg'}
              alt={`Image of ${name}`}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          <CardTitle className="text-lg font-semibold truncate group-hover:text-primary">{name}</CardTitle>
          {cuisineTypes && cuisineTypes.length > 0 && (
            <p className="text-sm text-muted-foreground truncate">
              {cuisineTypes.join(', ')}
            </p>
          )}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span>{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{deliveryTimeEstimate}</span>
            </div>
          </div>
        </CardContent>
        {/* Optional CardFooter for promotions or quick actions */}
        {/* <CardFooter className="p-4 pt-0">
          <Badge variant="destructive">15% OFF</Badge>
        </CardFooter> */}
      </Card>
    </Link>
  );
};

export default RestaurantCard;