import { signIn } from "@/auth";
import { VStack } from "@/components/Stack";
import { Separator } from "@/components/ui/separator";
import GoogleLoginButton from "./components/GoogleLoginButton";
import SignInForm from "./components/SignInForm";

// TODO: search params kind of not make sense here. it make the page render dynamically
export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const redirectTo =
    typeof searchParams?.callbackUrl === "string"
      ? searchParams.callbackUrl
      : "/console";

  return (
    <main className="m-4 flex h-full flex-1 flex-col items-center justify-center md:m-24 md:mt-0">
      <VStack className="w-full max-w-[400px] rounded-lg bg-white p-4 shadow-md">
        <p className="mb-4 text-center text-lg font-bold">Log In</p>
        <SignInForm redirectTo={redirectTo} />

        <Separator className="my-4" />

        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo });
          }}
        >
          <VStack className="items-center">
            <GoogleLoginButton />
          </VStack>
        </form>
      </VStack>
    </main>
  );
}
