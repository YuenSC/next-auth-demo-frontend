import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import React from "react";

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const Center = ({ className, asChild, ...props }: StackProps) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      {...props}
      className={clsx("flex flex-col items-center justify-center", className)}
    />
  );
};

const HStack = ({ className, asChild, ...props }: StackProps) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      {...props}
      className={clsx("flex flex-row items-center", className)}
    />
  );
};

const VStack = ({ className, asChild, ...props }: StackProps) => {
  const Comp = asChild ? Slot : "div";
  return <Comp {...props} className={clsx("flex flex-col", className)} />;
};

export { Center, HStack, VStack };
