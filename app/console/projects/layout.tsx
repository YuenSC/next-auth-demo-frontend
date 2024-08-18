import ConsolePageLayout from "@/components/ConsolePageLayout";
import ProjectDialog from "@/components/project/ProjectDialog";
import SearchFilterBar from "@/components/searchbar/SearchFilterBar";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <ConsolePageLayout title="Projects" rightComponent={<ProjectDialog />}>
      <SearchFilterBar searchTextPlaceholder="Search by name" />
      <div className="w-full bg-white">{children}</div>
    </ConsolePageLayout>
  );
};

export default Layout;
