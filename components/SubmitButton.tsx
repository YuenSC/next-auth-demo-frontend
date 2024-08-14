import { useFormStatus } from "react-dom";
import { FaSpinner } from "react-icons/fa";
import { HStack } from "./Stack";
import { Button } from "./ui/button";

const SubmitButton = ({ title }: { title: string }) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit">
      <HStack className="gap-2">
        {title}
        {pending && <FaSpinner className="animate-spin" />}
      </HStack>
    </Button>
  );
};

export default SubmitButton;
