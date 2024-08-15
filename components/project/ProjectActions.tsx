import { Button } from "@/components/ui/button";
import { BsThreeDotsVertical } from "react-icons/bs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Project } from "@/lib/types/Project";
import { useRef } from "react";
import ProjectDialog from "./ProjectDialog";
import ProjectDeleteAlertDialog from "./ProjectDeleteAlertDialog";
import { DialogRef } from "../ui/dialog";

const ProjectActions = ({ project }: { project: Project }) => {
  const editDialogRef = useRef<DialogRef>(null);
  const deleteDialogRef = useRef<DialogRef>(null);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <BsThreeDotsVertical size={24} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => editDialogRef.current?.open()}>
            Edit Project
          </DropdownMenuItem>
          <DropdownMenuItem
            errorStyle
            onClick={() => deleteDialogRef.current?.open()}
          >
            Delete Project
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ProjectDialog project={project} ref={editDialogRef} />
      <ProjectDeleteAlertDialog project={project} ref={deleteDialogRef} />
    </>
  );
};

export default ProjectActions;

const EditDialog = () => {
  return;
};
