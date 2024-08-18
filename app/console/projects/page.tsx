import { DataTable } from "@/components/data-table/DataTable";
import { ProjectColumns } from "@/components/project/ProjectColumns";
import { fetchProjects } from "@/lib/data";
import PageProps from "@/lib/types/PageProps";

const Page = async ({ searchParams }: PageProps) => {
  const {
    data: { items: projects, meta },
  } = await fetchProjects(searchParams);

  return (
    <DataTable columns={ProjectColumns} data={projects} paginationMeta={meta} />
  );
};

export default Page;
