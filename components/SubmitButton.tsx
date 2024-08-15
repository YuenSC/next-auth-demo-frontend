import { useFormStatus } from "react-dom";
import { FaSpinner } from "react-icons/fa";
import { HStack } from "./Stack";
import { Button, buttonVariants } from "./ui/button";
import { VariantProps } from "class-variance-authority";

const SubmitButton = ({
  title,
  variant,
}: { title: string } & VariantProps<typeof buttonVariants>) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant={variant}>
      <HStack className="gap-2">
        {title}
        {pending && <FaSpinner className="animate-spin" />}
      </HStack>
    </Button>
  );
};

export default SubmitButton;
