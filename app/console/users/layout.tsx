import ConsolePageLayout from "@/components/ConsolePageLayout";
import SearchFilterBar from "@/components/searchbar/SearchFilterBar";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <ConsolePageLayout title="Users">
      <SearchFilterBar searchTextPlaceholder="Search by name or email" />
      <div className="bg-white">{children}</div>
    </ConsolePageLayout>
  );
};

export default Layout;
