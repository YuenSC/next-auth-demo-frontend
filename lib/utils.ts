import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertSearchParamsToString(searchParams: {
  [key: string]: string | string[] | undefined;
}): string {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => params.append(key, val));
    } else if (value !== undefined) {
      params.append(key, value);
    }
  });
  return params.toString();
}
