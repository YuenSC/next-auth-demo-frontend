"use client";

import { DataTable } from "@/components/data-table/DataTable";
import { ProjectColumns } from "./ProjectColumns";

const ErrorComponent = ({ error }: { error: Error }) => {
  return (
    <DataTable
      columns={ProjectColumns}
      data={[]}
      errorMessage={error.message}
    />
  );
};

export default ErrorComponent;
