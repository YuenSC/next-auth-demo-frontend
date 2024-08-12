import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";
import ConsolePageLayout from "@/components/ConsolePageLayout";
import { NextPage } from "next";
import PageProps from "@/lib/types/PageProps";
import SearchFilterBar from "@/components/searchbar/SearchFilterBar";

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

const Page = ({ params, searchParams }: PageProps) => {
  return (
    <ConsolePageLayout title="Users">
      <SearchFilterBar searchTextPlaceholder="Search by name or email" />

      <div className="bg-white">
        <DataTable columns={columns} data={payments} />
      </div>
    </ConsolePageLayout>
  );
};

export default Page;
