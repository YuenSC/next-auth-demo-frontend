import ConsolePageLayout from "@/components/ConsolePageLayout";
import { DataTable } from "@/components/DataTable";
import SearchFilterBar from "@/components/searchbar/SearchFilterBar";
import { UserColumns } from "@/lib/constants/table/UserColumns";
import { fetchUsers } from "@/lib/data";
import PageProps from "@/lib/types/PageProps";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import ErrorComponent from "./ErrorComponent";

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
  const {
    data: { items },
  } = await fetchUsers(searchParams);

  return <DataTable columns={UserColumns} data={items} />;
};
