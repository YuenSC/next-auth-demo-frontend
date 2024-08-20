"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFetchProjects } from "@/lib/api/useFetchProjects";
import { Project } from "@/lib/types/Project";
import { Fragment, useEffect, useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { useDebounce } from "use-debounce";
import { HStack, VStack } from "../Stack";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TimeEntry } from "@/lib/types/TimeEntry";
import { getFormData } from "@/lib/utils/getFormData";
import { updateTimeEntry } from "@/app/actions";
import { useToast } from "../ui/use-toast";
import { FaSpinner } from "react-icons/fa";
import { useFetchProject } from "@/lib/api/useFetchProject";

const TimeTrackerProjectSelect = ({ entry }: { entry?: TimeEntry | null }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(
    entry?.projectId || "",
  );
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 300);

  const {
    data: res,
    error,
    isLoading,
  } = useFetchProjects({
    searchText: debouncedSearchText || undefined,
    limit: 5,
  });

  const { data: projectRes } = useFetchProject(entry?.projectId);
  const currentProject = projectRes?.data;

  const projects = res?.data?.items || [];
  const hasMore = res?.data.meta
    ? res.data.meta.currentPage < res.data.meta.totalPages
    : false;

  const selectedProject = (
    currentProject ? [currentProject, ...projects] : projects
  ).find((project) => project.id === selectedProjectId);

  const onSelect = async (projectId: string) => {
    setSelectedProjectId(projectId);
    setOpen(false);
    if (!entry || entry.projectId === projectId) return;

    const result = await updateTimeEntry(
      getFormData({
        id: entry?.id,
        projectId,
      }),
    );

    if (result?.error) {
      return toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }

    toast({
      title: "Time Tracker updated",
      description: `Task project has been updated successfully.`,
    });
  };

  useEffect(() => {
    setSelectedProjectId(entry?.projectId || "");
  }, [entry]);

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
        {selectedProjectId && (
          <input type="hidden" name="projectId" value={selectedProjectId} />
        )}
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
        <VStack className="mt-2 items-start">
          {selectedProject && (
            <Button variant="ghost" onClick={() => onSelect("")}>
              No Project
            </Button>
          )}
          {error?.message ? (
            <span className="ml-4 text-sm">{error?.message}</span>
          ) : (
            <Fragment>
              {projects.map((project) => (
                <Button
                  key={project.id}
                  variant="link"
                  onClick={() => onSelect(project.id)}
                >
                  <ProjectDisplay project={project} hasDot />
                </Button>
              ))}
            </Fragment>
          )}
        </VStack>
        {isLoading && (
          <HStack className="mt-4 justify-center">
            <FaSpinner size={24} className="animate-spin" />
          </HStack>
        )}
        {hasMore && <span>Search more precisely for more result</span>}
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
