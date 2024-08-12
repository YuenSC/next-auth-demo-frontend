import React, { PropsWithChildren } from "react";
import { HStack, VStack } from "./Stack";

const ConsolePageLayout = ({
  children,
  title,
}: PropsWithChildren<{ title: string }>) => {
  return (
    <VStack className="h-full w-full gap-6 px-8 py-12">
      <HStack>
        <h1 className="text-2xl">{title}</h1>
      </HStack>
      {children}
    </VStack>
  );
};

export default ConsolePageLayout;
