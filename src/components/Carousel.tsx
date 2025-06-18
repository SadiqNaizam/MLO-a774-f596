import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'; // Import autoplay plugin
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselSlide {
  id: string | number;
  content: React.ReactNode; // Could be an image, text, or a more complex component
  altText?: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  options?: Parameters<typeof useEmblaCarousel>[0];
  showArrows?: boolean;
  autoplayDelay?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  options = { loop: true },
  showArrows = true,
  autoplayDelay = 4000,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: autoplayDelay, stopOnInteraction: true }),
  ]);

  console.log("Rendering Carousel with", slides.length, "slides");

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!slides || slides.length === 0) {
    return <div className="text-center p-4">No slides to display.</div>;
  }

  return (
    <div className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div className="embla__slide flex-[0_0_100%] min-w-0" key={slide.id}>
              {/* Example: Using Card for consistent styling, adjust as needed */}
              <Card className="m-1 md:m-2 shadow-none border-none">
                <CardContent className="flex aspect-[16/7] items-center justify-center p-0 overflow-hidden">
                  {typeof slide.content === 'string' && slide.altText ? (
                     <img src={slide.content} alt={slide.altText} className="w-full h-full object-cover" />
                  ) : (
                    slide.content
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      {showArrows && emblaApi && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 sm:h-10 sm:w-10 bg-background/50 hover:bg-background/80"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 sm:h-10 sm:w-10 bg-background/50 hover:bg-background/80"
            onClick={scrollNext}
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="sr-only">Next slide</span>
          </Button>
        </>
      )}
    </div>
  );
};

export default Carousel;