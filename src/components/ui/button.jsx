import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import "./ui.css";

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const variantClass = variant === "default" ? "btn-default" :
                        variant === "destructive" ? "btn-destructive" :
                        variant === "outline" ? "btn-outline" :
                        variant === "secondary" ? "btn-secondary" :
                        variant === "ghost" ? "btn-ghost" :
                        variant === "link" ? "btn-link" : "btn-default";
    
    const sizeClass = size === "default" ? "btn-size-default" :
                     size === "sm" ? "btn-size-sm" :
                     size === "lg" ? "btn-size-lg" :
                     size === "icon" ? "btn-size-icon" : "btn-size-default";
    
    return (
      <Comp 
        className={cn("btn", variantClass, sizeClass, className)} 
        ref={ref} 
        {...props} 
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
