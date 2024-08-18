import { DataTable } from "@/components/data-table/DataTable";
import { ProjectColumns } from "@/components/project/ProjectColumns";

const Loading = () => {
  return <DataTable columns={ProjectColumns} data={[]} isLoading />;
};

export default Loading;
