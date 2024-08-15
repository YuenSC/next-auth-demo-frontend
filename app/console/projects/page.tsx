import ConsolePageLayout from "@/components/ConsolePageLayout";
import { DataTable } from "@/components/data-table/DataTable";
import SearchFilterBar from "@/components/searchbar/SearchFilterBar";
import { fetchProjects } from "@/lib/data";
import PageProps from "@/lib/types/PageProps";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import { ProjectColumns } from "../../../components/project/ProjectColumns";
import ProjectDialog from "../../../components/project/ProjectDialog";
import ProjectListErrorComponent from "../../../components/project/ProjectListErrorComponent";

const Page = async ({ searchParams }: PageProps) => {
  return (
    <ConsolePageLayout title="Projects" rightComponent={<ProjectDialog />}>
      <SearchFilterBar searchTextPlaceholder="Search by name" />

      <div className="w-full bg-white">
        <ErrorBoundary errorComponent={ProjectListErrorComponent}>
          <Suspense
            fallback={
              <DataTable columns={ProjectColumns} data={[]} isLoading />
            }
          >
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
    data: { items: projects, meta },
  } = await fetchProjects(searchParams);

  return (
    <DataTable columns={ProjectColumns} data={projects} paginationMeta={meta} />
  );
};
