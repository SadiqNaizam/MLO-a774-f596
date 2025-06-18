import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, Package, CookingPot, Bike, Home } from 'lucide-react'; // Example icons

interface Step {
  id: string;
  name: string;
  icon: React.ElementType;
  description?: string; // Optional description for each step
}

const defaultSteps: Step[] = [
  { id: 'confirmed', name: 'Order Confirmed', icon: CheckCircle, description: 'Your order has been received.' },
  { id: 'preparing', name: 'Preparing Food', icon: CookingPot, description: 'The restaurant is preparing your meal.' },
  { id: 'out_for_delivery', name: 'Out for Delivery', icon: Bike, description: 'Your food is on its way.' },
  { id: 'delivered', name: 'Delivered', icon: Home, description: 'Enjoy your meal!' },
];

interface OrderTrackerStepperProps {
  currentStepId: string; // ID of the current active step
  steps?: Step[]; // Allow custom steps
  className?: string;
}

const OrderTrackerStepper: React.FC<OrderTrackerStepperProps> = ({
  currentStepId,
  steps = defaultSteps,
  className,
}) => {
  console.log("Rendering OrderTrackerStepper, current step:", currentStepId);

  const currentStepIndex = steps.findIndex(step => step.id === currentStepId);

  if (currentStepIndex === -1) {
    console.warn("OrderTrackerStepper: currentStepId not found in steps array.");
    // Optionally render a default state or nothing
  }

  return (
    <div className={cn("w-full px-4 py-6", className)}>
      <div className="flex items-start justify-between">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;
          const IconComponent = step.icon;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center text-center w-1/4">
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 transition-all duration-300",
                    isActive ? "bg-primary border-primary text-primary-foreground scale-110" :
                    isCompleted ? "bg-green-500 border-green-500 text-white" :
                    "bg-muted border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <p
                  className={cn(
                    "mt-2 text-xs md:text-sm font-medium transition-colors duration-300",
                    isActive ? "text-primary" :
                    isCompleted ? "text-green-600" :
                    "text-muted-foreground"
                  )}
                >
                  {step.name}
                </p>
                {isActive && step.description && (
                  <p className="mt-1 text-xs text-muted-foreground hidden sm:block">{step.description}</p>
                )}
              </div>

              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-1 md:h-1.5 mt-5 md:mt-6 rounded-full transition-all duration-500 ease-in-out",
                    isCompleted || (isActive && index < currentStepIndex) ? "bg-green-500" :
                    (isActive && index === currentStepIndex) ? "bg-primary/30" : // For the current active step's upcoming line
                    "bg-muted-foreground/30"
                  )}
                  style={{
                    // Dynamic width for the line of the active step
                    // This is a bit tricky without JS knowing the next step's state.
                    // A simpler approach might be to just have it partially filled or fully if next is also done.
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTrackerStepper;