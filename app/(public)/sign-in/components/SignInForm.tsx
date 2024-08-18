"use client";

import { VStack } from "@/components/Stack";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import { authenticate } from "../../../actions";

const SignInForm = ({ redirectTo }: { redirectTo: string }) => {
  const [errorMessage, formAction] = useFormState(authenticate, "");

  return (
    <form action={formAction}>
      <VStack className="gap-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            required
            aria-required="true"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            aria-required="true"
          />
        </div>

        {errorMessage && (
          <>
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
        <SubmitButton title="Sign In" />
      </VStack>
    </form>
  );
};

export default SignInForm;
