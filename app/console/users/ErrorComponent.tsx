"use client";

import { DataTable } from "@/components/data-table/DataTable";
import { UserColumns } from "@/lib/constants/table/UserColumns";

const ErrorComponent = ({ error }: { error: Error }) => {
  return (
    <DataTable columns={UserColumns} data={[]} errorMessage={error.message} />
  );
};

export default ErrorComponent;
