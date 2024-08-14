"use client";

import { postProjectCreate } from "@/app/actions";
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
import { useCallback, useState } from "react";
import { useFormState } from "react-dom";

const ProjectDialog = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const clientAction = useCallback(
    async (state: string | undefined, payload: FormData) => {
      const result = await postProjectCreate(payload);
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
    [],
  );
  const [errorMessage, formAction] = useFormState(clientAction, "");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new project.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name">Name*</Label>
              <Input
                id="name"
                name="name"
                className="col-span-3"
                required
                aria-required="true"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="clientName">Client</Label>
              <Input id="clientName" name="clientName" className="col-span-3" />
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
};

export default ProjectDialog;
