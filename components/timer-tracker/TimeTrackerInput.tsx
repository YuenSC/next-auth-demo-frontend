import { HStack } from "../Stack";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import TimeTrackerActionButton from "./TimeTrackerActionButton";
import { TimeTrackerProvider } from "./TimeTrackerContext";
import TimeTrackerDurationInput from "./TimeTrackerDurationInput";
import TimeTrackerProjectSelect from "./TimeTrackerProjectSelect";

const TimeTrackerInput = async () => {
  // const currentTimeEntry = await fetch("/api/time-entries/current"); // should call api to load current time entry if any

  return (
    <TimeTrackerProvider
      timeEntry={{
        id: "1",
        projectId: "1",
        startTime: new Date("2024-08-17T05:10:31+0800"),
        endTime: undefined,
        name: "Test",
        userId: "",
      }}
    >
      <HStack className="gap-4 border bg-white p-4 shadow-lg">
        <Input placeholder="What are you working on?" autoFocus />
        <Separator orientation="vertical" className="h-auto self-stretch" />
        <TimeTrackerProjectSelect />
        <Separator orientation="vertical" className="h-auto self-stretch" />
        <TimeTrackerDurationInput />
        <Separator orientation="vertical" className="h-auto self-stretch" />
        <TimeTrackerActionButton />
      </HStack>
    </TimeTrackerProvider>
  );
};

export default TimeTrackerInput;
