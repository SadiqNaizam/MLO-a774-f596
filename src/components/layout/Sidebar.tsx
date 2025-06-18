import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from '@/lib/utils';

interface SidebarProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ children, title, className }) => {
  console.log("Rendering Sidebar with title:", title);

  return (
    <aside className={cn("hidden md:block w-64 lg:w-72 h-full border-r", className)}>
      <ScrollArea className="h-full p-4">
        {title && (
          <>
            <h2 className="text-xl font-semibold tracking-tight mb-4">{title}</h2>
            <Separator className="mb-6" />
          </>
        )}
        <div className="space-y-6">
          {children ? children : <p className="text-muted-foreground">Sidebar content goes here.</p>}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;