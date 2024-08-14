import React from "react";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { Skeleton } from "../ui/skeleton";

const DataTableSkeleton = ({ columnCount }: { columnCount: number }) => {
  return (
    <TableBody>
      {Array.from({ length: 3 }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columnCount }).map((_, cellIndex) => (
            <TableCell key={cellIndex} className="h-12 text-center">
              <Skeleton className="h-12 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default DataTableSkeleton;
