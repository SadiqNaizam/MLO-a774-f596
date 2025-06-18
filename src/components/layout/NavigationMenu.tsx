import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // For mobile menu
import { Menu, Search, ShoppingCart, UserCircle2 } from 'lucide-react';

// Define props for navigation links if they are dynamic
interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/restaurants', label: 'Restaurants' },
  { href: '/offers', label: 'Offers' },
];

const NavigationMenu: React.FC = () => {
  console.log("Rendering NavigationMenu");
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search submitted:", searchQuery);
    // Implement search navigation/logic
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo/Brand Name */}
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-lg">FoodApp</span> {/* Replace with actual logo if available */}
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
          {/* Desktop Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative w-full max-w-xs">
            <Input
              type="search"
              placeholder="Search restaurants..."
              className="pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-full">
              <Search className="h-4 w-4" />
            </Button>
          </form>

          {/* Icons */}
          <Link to="/cart">
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              {/* Add badge for cart item count if needed */}
            </Button>
          </Link>
          <Link to="/account">
            <Button variant="ghost" size="icon" aria-label="Account">
              <UserCircle2 className="h-5 w-5" />
            </Button>
          </Link>

          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <div className="flex flex-col space-y-4 p-4">
                <Link to="/" className="font-bold text-lg mb-4" onClick={() => setIsMobileMenuOpen(false)}>FoodApp</Link>
                <form onSubmit={handleSearchSubmit} className="flex items-center relative w-full">
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pr-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-full">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block py-2 text-sm transition-colors hover:text-foreground/80 text-foreground/60"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default NavigationMenu;