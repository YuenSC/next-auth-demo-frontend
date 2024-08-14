import ConsolePageLayout from "@/components/ConsolePageLayout";
import { DataTable } from "@/components/DataTable";
import SearchFilterBar from "@/components/searchbar/SearchFilterBar";
import { ProjectColumns } from "@/lib/constants/table/ProjectColumns";
import { fetchProjects } from "@/lib/data";
import PageProps from "@/lib/types/PageProps";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import ErrorComponent from "./ErrorComponent";
import ProjectDialog from "./ProjectDialog";

const Page = async ({ searchParams }: PageProps) => {
  return (
    <ConsolePageLayout title="Projects" rightComponent={<ProjectDialog />}>
      <SearchFilterBar searchTextPlaceholder="Search by name" />

      <div className="w-full bg-white">
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
    data: { items: projects },
  } = await fetchProjects(searchParams);

  return <DataTable columns={ProjectColumns} data={projects} />;
};
