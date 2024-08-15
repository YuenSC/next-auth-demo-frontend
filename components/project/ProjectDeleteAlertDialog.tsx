import { deleteProject } from "@/app/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Project } from "@/lib/types/Project";
import {
  forwardRef,
  MouseEventHandler,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { useToast } from "../ui/use-toast";
import SubmitButton from "../SubmitButton";
import { useFormState } from "react-dom";

const ProjectDeleteAlertDialog = forwardRef(
  ({ project }: { project: Project }, ref) => {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    const handleDelete = useCallback(async () => {
      const result = await deleteProject(project.id);
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
        description: `Project ${project.name} has been created successfully.`,
      });
      setOpen(false);
    }, [project.id, project.name, toast]);

    const [_errorMessage, formAction] = useFormState(handleDelete, "");

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        {/* <AlertDialogTrigger asChild>Show Dialog</AlertDialogTrigger> */}
        <AlertDialogContent asChild>
          <form action={formAction}>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Your project and related time
                entry will be permanently deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <SubmitButton variant={"destructive"} title="Delete" />
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
);

ProjectDeleteAlertDialog.displayName = "ProjectDeleteAlertDialog";

export default ProjectDeleteAlertDialog;
