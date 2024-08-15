"use client";

import { postProjectCreate, postProjectUpdate } from "@/app/actions";
import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Project } from "@/lib/types/Project";
import React, {
  useCallback,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useFormState } from "react-dom";

const ProjectDialog = forwardRef(({ project }: { project?: Project }, ref) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const isEdit = Boolean(project);

  const clientAction = useCallback(
    async (state: string | undefined, payload: FormData) => {
      const mutate = isEdit ? postProjectUpdate : postProjectCreate;
      const result = await mutate(payload);
      if (result?.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
        return result.error;
      }
      toast({
        title: "Project created",
        description: `Project ${payload.get("name")} has been created successfully.`,
      });
      setOpen(false);
    },
    [isEdit, toast],
  );
  const [errorMessage, formAction] = useFormState(clientAction, "");

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!project && (
        <DialogTrigger asChild>
          <Button>Create New Project</Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new project.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {project && <input type="hidden" name="id" value={project.id} />}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name">Name*</Label>
              <Input
                id="name"
                name="name"
                className="col-span-3"
                required
                aria-required="true"
                defaultValue={project?.name}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                className="col-span-3"
                defaultValue={project?.description}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="clientName">Client</Label>
              <Input
                id="clientName"
                name="clientName"
                className="col-span-3"
                defaultValue={project?.clientName}
              />
            </div>
          </div>

          {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}

          <DialogFooter>
            <SubmitButton title="Save changes" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
});

ProjectDialog.displayName = "ProjectDialog";

export default ProjectDialog;
