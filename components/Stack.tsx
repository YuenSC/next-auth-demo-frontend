// eslint-disable-next-line no-restricted-imports
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import React from "react";

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const Center = ({ className, asChild, ...props }: StackProps) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      {...props}
      className={cn("flex flex-col items-center justify-center", className)}
    />
  );
};

const HStack = ({ className, asChild, ...props }: StackProps) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp {...props} className={cn("flex flex-row items-center", className)} />
  );
};

const VStack = ({ className, asChild, ...props }: StackProps) => {
  const Comp = asChild ? Slot : "div";
  return <Comp {...props} className={cn("flex flex-col", className)} />;
};

export { Center, HStack, VStack };
