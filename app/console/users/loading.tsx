import { DataTable } from "@/components/data-table/DataTable";
import { UserColumns } from "./UserColumns";

const Loading = () => {
  return <DataTable columns={UserColumns} data={[]} isLoading />;
};

export default Loading;
