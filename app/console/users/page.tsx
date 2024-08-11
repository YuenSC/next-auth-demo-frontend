import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  // ...
];

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];

const Page = () => {
  return (
    <div className="h-full w-full p-4">
      <div className="bg-white">
        <DataTable columns={columns} data={payments} />
      </div>
    </div>
  );
};

export default Page;
