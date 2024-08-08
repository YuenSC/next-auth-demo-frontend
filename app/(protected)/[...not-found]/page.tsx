"use client";

import { Center, VStack } from "@/components/Stack";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <Center className="h-full w-full gap-4">
      <h2 className="text-2xl">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/dashboard">
        <Button>Return Dashboard</Button>
      </Link>
    </Center>
  );
}
