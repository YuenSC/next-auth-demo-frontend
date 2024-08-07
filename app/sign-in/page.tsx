import { signIn } from "@/auth";
import { VStack } from "@/components/Stack";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SignInForm from "./SignInForm";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <VStack className="w-[400px] rounded-lg bg-white p-4 shadow-md">
        <p className="mb-4 text-center text-lg font-bold">Log In</p>
        <SignInForm />

        <Separator className="my-4" />

        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/dashboard" });
          }}
        >
          <Button className="w-full">Google Sign In</Button>
        </form>
      </VStack>
    </main>
  );
}
