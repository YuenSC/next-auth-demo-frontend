import ConsolePageLayout from "@/components/ConsolePageLayout";
import { DataTable } from "@/components/DataTable";
import SearchFilterBar from "@/components/searchbar/SearchFilterBar";
import { fetchUsers } from "@/lib/data";
import PageProps from "@/lib/types/PageProps";
import { BackendUser } from "@/lib/types/User";
import { ColumnDef } from "@tanstack/react-table";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import ErrorComponent from "./ErrorComponent";

export const userColumns: ColumnDef<BackendUser>[] = [
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

const Page = async ({ params, searchParams }: PageProps) => {
  return (
    <ConsolePageLayout title="Users">
      <SearchFilterBar searchTextPlaceholder="Search by name or email" />

      <div className="bg-white">
        <ErrorBoundary errorComponent={ErrorComponent}>
          <Suspense fallback={<div>Loading...</div>}>
            <UserDataTable searchParams={searchParams} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </ConsolePageLayout>
  );
};

export default Page;

const UserDataTable = async ({
  searchParams,
}: {
  searchParams: PageProps["searchParams"];
}) => {
  const { data: users } = await fetchUsers(searchParams);

  return <DataTable columns={userColumns} data={users} />;
};
