"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Project } from "../../types/Project";

const columnHelper = createColumnHelper<Project>();

export const ProjectColumns: ColumnDef<Project, any>[] = [
  columnHelper.accessor("id", {
    header: "ID",
  }),
  {
    accessorKey: "name",
    header: "Name",
  },
  columnHelper.accessor("description", {
    header: "Description",
    cell: ({ getValue }) => getValue() || "-",
  }),
  {
    accessorKey: "clientName",
    header: "Client Name",
    cell: ({ getValue }) => getValue() || "-",
  },
  {
    accessorKey: "owner.name",
    header: "Owner",
  },
];
