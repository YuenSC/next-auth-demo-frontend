"use client";

import { BackendUser } from "@/lib/types/User";
import { ColumnDef } from "@tanstack/react-table";

export const UserColumns: ColumnDef<BackendUser, any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "provider",
    header: "Provider",
  },
];
