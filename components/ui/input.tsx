import * as React from "react";

import { cn } from "@/lib/utils";
import { HStack } from "../Stack";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  iconLeft: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, iconLeft, ...props }, ref) => {
    return (
      <HStack
        className={cn(
          "flex h-10 w-full border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      >
        {iconLeft && <div className="pl-2">{iconLeft}</div>}
        <input
          type={type}
          className={cn("h-full w-full px-3 py-2 outline-none", {
            "pl-2": iconLeft,
          })}
          ref={ref}
          {...props}
        />
      </HStack>
    );
  },
);
Input.displayName = "Input";

export { Input };
