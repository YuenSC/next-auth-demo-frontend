import { DataTable } from "@/components/data-table/DataTable";
import { fetchUsers } from "@/lib/data";
import PageProps from "@/lib/types/PageProps";
import { UserColumns } from "./UserColumns";

const Page = async ({ searchParams }: PageProps) => {
  const {
    data: { items, meta },
  } = await fetchUsers(searchParams);

  return <DataTable columns={UserColumns} data={items} paginationMeta={meta} />;
};

export default Page;
