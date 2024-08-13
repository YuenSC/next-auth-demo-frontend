"use client";

import { DataTable } from "@/components/DataTable";
import { userColumns } from "./page";

const ErrorComponent = ({ error }: { error: Error }) => {
  return (
    <DataTable columns={userColumns} data={[]} errorMessage={error.message} />
  );
};

export default ErrorComponent;
