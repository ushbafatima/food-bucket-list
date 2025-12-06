import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

import { cn } from "@/lib/utils";

const ToggleGroup = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ToggleGroupPrimitive.Root ref={ref} className={cn("toggle-group", className)} {...props} />
  ),
);
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

export { ToggleGroup };

