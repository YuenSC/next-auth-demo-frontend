import clsx from "clsx";
import React from "react";

const Center = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={clsx("flex flex-col items-center justify-center", className)}
    />
  );
};

const HStack = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={clsx("flex flex-row items-center", className)} />
  );
};

const VStack = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} className={clsx("flex flex-col", className)} />;
};

export { Center, HStack, VStack };
