"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  addDays,
  addMonths,
  addYears,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  isEqual,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { VStack } from "../Stack";
// eslint-disable-next-line no-restricted-imports
import { PopoverClose } from "@radix-ui/react-popover";

const getValidDay = (value: string | null) => {
  if (!value) return undefined;
  const date = new Date(value);
  return isNaN(date.getTime()) ? undefined : date;
};

const DateRangeOptions = [
  {
    label: "Today",
    value: { from: new Date(), to: new Date() },
  },
  {
    label: "This week",
    value: {
      from: startOfWeek(new Date()),
      to: endOfWeek(new Date()),
    },
  },
  {
    label: "Last week",
    value: {
      from: startOfWeek(addDays(new Date(), -7)),
      to: endOfWeek(addDays(new Date(), -7)),
    },
  },
  {
    label: "Past two week",
    value: {
      from: startOfWeek(addDays(new Date(), -14)),
      to: endOfWeek(addDays(new Date(), -7)),
    },
  },
  {
    label: "This month",
    value: {
      from: startOfMonth(new Date()),
      to: endOfMonth(new Date()),
    },
  },
  {
    label: "Last month",
    value: {
      from: startOfMonth(addMonths(new Date(), -1)),
      to: endOfMonth(addMonths(new Date(), -1)),
    },
  },
  {
    label: "This year",
    value: {
      from: startOfYear(new Date()),
      to: endOfYear(new Date()),
    },
  },
  {
    label: "Last year",
    value: {
      from: startOfYear(addYears(new Date(), -1)),
      to: endOfYear(addYears(new Date(), -1)),
    },
  },
];

const defaultDateRange = DateRangeOptions.find(
  ({ label }) => label === "This week",
)?.value;

const DashboardDateRangePicker = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const dateFromSearchParams = {
    from: getValidDay(searchParams.get("from")),
    to: getValidDay(searchParams.get("to")),
  } satisfies DateRange;
  const hasParams = !!dateFromSearchParams.from && !!dateFromSearchParams.to;
  const [date, setDate] = useState<DateRange | undefined>(
    hasParams ? dateFromSearchParams : defaultDateRange,
  );
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState("");

  const handleDateChange = (payload?: DateRange) => {
    const params = new URLSearchParams(searchParams);

    if (payload) {
      const { from, to } = payload;
      //   use date-fns to check if the date is same from searchParams in terms of day
      if (
        dateFromSearchParams.from &&
        dateFromSearchParams.to &&
        from?.getDay() === dateFromSearchParams.from?.getDay() &&
        to?.getDay() === dateFromSearchParams.to?.getDay()
      )
        return;

      from ? params.set("from", from.toISOString()) : params.delete("from");
      to ? params.set("to", to.toISOString()) : params.delete("to");
    } else {
      params.delete("from");
      params.delete("to");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={cn("grid gap-2")}>
      <Popover
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          !open && handleDateChange(date);
        }}
      >
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="flex w-auto flex-col p-0 md:flex-row"
          align="end"
        >
          <VStack>
            {DateRangeOptions.map(({ label, value }) => {
              return (
                <PopoverClose key={label} asChild>
                  <Button
                    className="justify-start rounded-none text-left"
                    variant={range === label ? "default" : "ghost"}
                    onClick={() => {
                      setDate(value);
                      setRange(label);
                    }}
                  >
                    {label}
                  </Button>
                </PopoverClose>
              );
            })}
          </VStack>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DashboardDateRangePicker;
