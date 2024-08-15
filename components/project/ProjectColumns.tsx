"use client";

import { Project } from "@/lib/types/Project";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import ProjectActions from "./ProjectActions";

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
  columnHelper.display({
    id: "actions",
    cell: (props) => <ProjectActions project={props.row.original} />,
  }),
];
