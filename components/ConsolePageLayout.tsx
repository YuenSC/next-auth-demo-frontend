import React, { PropsWithChildren, ReactNode } from "react";
import { HStack, VStack } from "./Stack";

const ConsolePageLayout = ({
  children,
  rightComponent,
  title,
}: PropsWithChildren<{ title: string; rightComponent?: ReactNode }>) => {
  return (
    <VStack className="h-full w-full gap-6 px-8 py-12">
      <HStack className="justify-between">
        <h1 className="text-2xl">{title}</h1>
        {rightComponent}
      </HStack>
      {children}
    </VStack>
  );
};

export default ConsolePageLayout;
