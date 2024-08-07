"use client";

import { HStack, VStack } from "@/components/Stack";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "../actions";
import { FaSpinner, FaTruckLoading } from "react-icons/fa";

const SignInForm = () => {
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
        <ButtonWithLoading />
      </VStack>
    </form>
  );
};

const ButtonWithLoading = () => {
  const { pending } = useFormStatus();

  return (
    <Button>
      <HStack className="gap-2">
        Sign In
        {pending && <FaSpinner className="animate-spin" />}
      </HStack>
    </Button>
  );
};

export default SignInForm;
