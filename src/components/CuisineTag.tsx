import React from 'react';
import { Badge, BadgeProps } from "@/components/ui/badge"; // Can use Badge as a base
import { cn } from "@/lib/utils";

interface CuisineTagProps extends React.HTMLAttributes<HTMLDivElement> {
  cuisineName: string;
  isActive?: boolean;
  onClick?: (cuisineName: string) => void;
  variant?: BadgeProps['variant'];
  size?: 'sm' | 'md' | 'lg'; // Custom size prop
}

const CuisineTag: React.FC<CuisineTagProps> = ({
  cuisineName,
  isActive = false,
  onClick,
  className,
  variant = "secondary",
  size = 'md',
  ...props
}) => {
  console.log("Rendering CuisineTag:", cuisineName, "Active:", isActive);

  const handleClick = () => {
    if (onClick) {
      onClick(cuisineName);
    }
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-sm",
    lg: "px-3 py-1 text-base",
  };

  return (
    <Badge
      variant={isActive ? "default" : variant}
      className={cn(
        "cursor-pointer transition-colors hover:bg-primary/80 hover:text-primary-foreground",
        isActive && "bg-primary text-primary-foreground",
        sizeClasses[size],
        className
      )}
      onClick={handleClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => (e.key === 'Enter' || e.key === ' ') && handleClick() : undefined}
      {...props}
    >
      {cuisineName}
    </Badge>
  );
};

export default CuisineTag;