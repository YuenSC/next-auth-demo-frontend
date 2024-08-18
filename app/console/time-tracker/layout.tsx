import ConsolePageLayout from "@/components/ConsolePageLayout";
import TimeTrackerInput from "@/components/timer-tracker/TimeTrackerInput";
import React, { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <ConsolePageLayout title="Trace your time now">
      <div className="sticky top-16 bg-slate-200 pt-4">
        <TimeTrackerInput />
      </div>
      {children}
    </ConsolePageLayout>
  );
};

export default Layout;
