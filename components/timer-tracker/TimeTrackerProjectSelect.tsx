"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFetchProjects } from "@/lib/api/useFetchProjects";
import { Project } from "@/lib/types/Project";
import { Fragment, useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { useDebounce } from "use-debounce";
import { HStack, VStack } from "../Stack";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const TimeTrackerProjectSelect = ({ projectId }: { projectId?: string }) => {
  const [open, setOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(projectId || "");
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 300);

  const { data, error } = useFetchProjects({
    searchText: debouncedSearchText || undefined,
    limit: 5,
  });
  const projects = data?.data?.items || [];

  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId,
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        {selectedProject ? (
          <ProjectDisplay project={selectedProject} />
        ) : (
          <HStack className="group cursor-pointer gap-1 text-primary">
            <GoPlusCircle size={20} />
            <span className="group-hover:underline">Project</span>
          </HStack>
        )}
        <input type="hidden" name="projectId" value={selectedProjectId} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[400px] py-4">
        <div className="px-2">
          <Input
            placeholder="Search Projects"
            containerClassName=""
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <VStack className="mt-2 items-start gap-4">
          {error?.message ? (
            <span className="ml-4 text-sm">{error?.message}</span>
          ) : (
            <Fragment>
              {projects.map((project) => (
                <Button
                  key={project.id}
                  variant="link"
                  onClick={() => {
                    setSelectedProjectId(project.id);
                    setOpen(false);
                  }}
                >
                  <ProjectDisplay project={project} hasDot />
                </Button>
              ))}
            </Fragment>
          )}
        </VStack>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TimeTrackerProjectSelect;

const ProjectDisplay = ({
  project,
  hasDot,
}: {
  project: Project;
  hasDot?: boolean;
}) => {
  return (
    <HStack className="gap-1 text-primary">
      {hasDot && <span className="h-2 w-2 rounded-full bg-blue-500" />}
      <span className="whitespace-nowrap">
        {project.name}
        {project.clientName && (
          <span className="text-gray-500"> - {project.clientName}</span>
        )}
      </span>
    </HStack>
  );
};
