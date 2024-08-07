import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex  min-h-screen flex-col items-center justify-between p-24">
      <h1>Dashboard</h1>
      <div className="flex flex-col bg-gray-100 rounded-md">
        <div className="p-4 font-bold bg-gray-200 rounded-t-md">
          Current Session
        </div>
        <pre className="py-6 px-4 whitespace-pre-wrap break-all">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </main>
  );
}
