"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TimeEntry } from "@/lib/types/TimeEntry";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "../ui/button";
import { deleteTimeEntry } from "@/app/actions";
import { useToast } from "../ui/use-toast";

const TimeEntryMenu = ({ entry }: { entry: TimeEntry }) => {
  const { toast } = useToast();

  const onDelete = async () => {
    const result = await deleteTimeEntry(entry.id);
    if (result?.error) {
      return toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }

    toast({
      title: "Time Entry deleted",
      description: `Time Entry has been deleted successfully`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <BsThreeDotsVertical size={24} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem errorStyle onClick={onDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TimeEntryMenu;
