import { fetchProjects } from "@/lib/data";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const data = await fetchProjects(Object.fromEntries(searchParams));
  return Response.json(data);
}
