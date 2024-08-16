import ConsolePageLayout from "@/components/ConsolePageLayout";
import TimeTrackerInput from "@/components/timer-tracker/TimeTrackerInput";
import TimeTrackerList from "@/components/timer-tracker/TimeTrackerList";
import React from "react";

const Page = () => {
  return (
    <ConsolePageLayout title="Trace your time now">
      <div className="sticky top-16 bg-slate-200 pt-4">
        <TimeTrackerInput />
      </div>
      <TimeTrackerList />
    </ConsolePageLayout>
  );
};

export default Page;
