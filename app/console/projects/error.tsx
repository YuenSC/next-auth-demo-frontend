"use client";

import { DataTable } from "@/components/data-table/DataTable";
import { ProjectColumns } from "@/components/project/ProjectColumns";

const Error = ({ error }: { error: Error }) => {
  return (
    <DataTable
      columns={ProjectColumns}
      data={[]}
      errorMessage={error.message}
    />
  );
};

export default Error;
