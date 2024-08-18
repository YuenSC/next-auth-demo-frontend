import { HStack } from "../Stack";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import TimeTrackerActionButton from "./TimeTrackerActionButton";
import TimeTrackerDurationInput from "./TimeTrackerDurationInput";
import TimeTrackerProjectSelect from "./TimeTrackerProjectSelect";

const TimeTrackerInput = async () => {
  return (
    <HStack className="gap-4 border bg-white p-4 shadow-lg" asChild>
      <form>
        <Input placeholder="What are you working on?" autoFocus />
        <Separator orientation="vertical" className="h-auto self-stretch" />
        <TimeTrackerProjectSelect />
        <Separator orientation="vertical" className="h-auto self-stretch" />
        <TimeTrackerDurationInput />
        <Separator orientation="vertical" className="h-auto self-stretch" />
        <TimeTrackerActionButton />
      </form>
    </HStack>
  );
};

export default TimeTrackerInput;
