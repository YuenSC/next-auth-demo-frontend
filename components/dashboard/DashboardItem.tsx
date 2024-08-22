import React from "react";
import { VStack } from "../Stack";
import { cn } from "@/lib/utils";

const DashboardItem = ({
  title,
  value,
  className,
}: {
  title: string;
  value: string;
  className?: string;
}) => {
  return (
    <VStack
      className={cn("flex-1 border bg-gray-200 p-4 text-center", className)}
    >
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-lg">{value}</div>
    </VStack>
  );
};

export default DashboardItem;
