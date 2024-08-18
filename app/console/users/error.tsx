"use client";

import { DataTable } from "@/components/data-table/DataTable";
import { UserColumns } from "./UserColumns";

const Error = ({ error }: { error: Error }) => {
  return (
    <DataTable columns={UserColumns} data={[]} errorMessage={error.message} />
  );
};

export default Error;
