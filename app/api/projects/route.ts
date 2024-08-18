import { fetchProjects } from "@/lib/data";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  try {
    const data = await fetchProjects(Object.fromEntries(searchParams));
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 });
  }
}
