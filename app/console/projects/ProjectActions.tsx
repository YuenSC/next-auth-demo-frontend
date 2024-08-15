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
import ProjectDialog, { ProjectDialogRef } from "./ProjectDialog";
import { useRef } from "react";

const ProjectActions = ({ project }: { project: Project }) => {
  const editDialogRef = useRef<ProjectDialogRef>(null);

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
          <DropdownMenuItem>Disable Project</DropdownMenuItem>
          <DropdownMenuItem className="text-red-500">
            Delete Project
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ProjectDialog project={project} ref={editDialogRef} />
    </>
  );
};

export default ProjectActions;

const EditDialog = () => {
  return;
};
