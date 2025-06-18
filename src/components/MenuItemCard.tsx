import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlusCircle, Info } from 'lucide-react';

interface MenuItemCardProps {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  onAddToCart: (item: Pick<MenuItemCardProps, 'id' | 'name' | 'price'>) => void;
  onViewDetails?: (itemId: string | number) => void; // Optional: for opening a dialog with more info/customization
  // currencySymbol?: string; // e.g. "$"
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddToCart,
  onViewDetails,
  // currencySymbol = "$",
}) => {
  console.log("Rendering MenuItemCard:", name, id);

  const handleAddToCart = () => {
    onAddToCart({ id, name, price });
    // Potentially show toast notification: toast({ title: `${name} added to cart` })
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(id);
    }
  };

  return (
    <Card className="w-full flex flex-col md:flex-row overflow-hidden transition-shadow duration-200 hover:shadow-md">
      {imageUrl && (
        <div className="md:w-1/3">
          <AspectRatio ratio={4/3} className="md:h-full">
            <img
              src={imageUrl}
              alt={`Image of ${name}`}
              className="object-cover w-full h-full"
              onError={(e) => (e.currentTarget.style.display = 'none')} // Hide if image fails to load
            />
          </AspectRatio>
        </div>
      )}
      <div className={cn("flex flex-col justify-between p-4", imageUrl ? "md:w-2/3" : "w-full")}>
        <div>
          <CardTitle className="text-base md:text-lg font-semibold">{name}</CardTitle>
          {description && (
            <CardDescription className="mt-1 text-xs md:text-sm text-muted-foreground line-clamp-2">
              {description}
            </CardDescription>
          )}
        </div>
        <div className="mt-2 md:mt-3 flex items-center justify-between">
          <span className="text-base md:text-lg font-bold text-primary">
            ${price.toFixed(2)} {/* Assuming currencySymbol is $ */}
          </span>
          <div className="flex items-center gap-2">
            {onViewDetails && (
              <Button variant="outline" size="sm" onClick={handleViewDetails} aria-label="View details">
                <Info className="h-4 w-4 mr-1 md:hidden" />
                <span className="hidden md:inline">Details</span>
              </Button>
            )}
            <Button size="sm" onClick={handleAddToCart} aria-label={`Add ${name} to cart`}>
              <PlusCircle className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MenuItemCard;