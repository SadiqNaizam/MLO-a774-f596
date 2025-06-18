import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RestaurantListingPage from "./pages/RestaurantListingPage";
import RestaurantMenuPage from "./pages/RestaurantMenuPage";
import CartCheckoutPage from "./pages/CartCheckoutPage";
import OrderSuccessAndTrackingPage from "./pages/OrderSuccessAndTrackingPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster /> {/* For shadcn/ui toasts */}
      <Sonner /> {/* For sonner toasts */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurants" element={<RestaurantListingPage />} />
          <Route path="/restaurants/:slug" element={<RestaurantMenuPage />} />
          <Route path="/cart" element={<CartCheckoutPage />} />
          <Route path="/checkout" element={<CartCheckoutPage />} /> {/* Alias for cart */}
          <Route path="/order-success" element={<OrderSuccessAndTrackingPage />} />
          <Route path="/order-success/:orderId" element={<OrderSuccessAndTrackingPage />} /> {/* If tracking specific order by URL */}
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;