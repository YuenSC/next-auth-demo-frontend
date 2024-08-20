import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="flex max-w-[400px] flex-col rounded-md bg-gray-100 p-4 text-center">
        <h1 className="text-3xl">Welcome to Clockify Clone (WIP)</h1>
        <p>
          This is a clone of the Clockify app built with Next.js, TypeScript,
          and Tailwind CSS. You may click the sign in button to get started.
        </p>
        <p className="mt-4 text-left text-lg">Current Roadmap:</p>
        <ul className="list-disc pl-8 text-left">
          <li>Implementing authentication</li>
          <li>Building the timer</li>
          <li>Building the project</li>
          <li>Building the dashboard (WIP)</li>
          <li>Building the reports (WIP)</li>
          <li>Building the settings (WIP)</li>
          <li>Building the Public Page (WIP)</li>
        </ul>
      </div>
    </main>
  );
}
