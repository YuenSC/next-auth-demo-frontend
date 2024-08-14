"use client";

import { DataTable } from "@/components/DataTable";
import { ProjectColumns } from "@/lib/constants/table/ProjectColumns";

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
