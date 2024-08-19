"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationMeta } from "@/lib/types/ApiResponse";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useMemo } from "react";

const LIMIT_OPTIONS = [10, 25, 50, 100];

const getPaginationQuery = (
  searchParams: ReadonlyURLSearchParams,
  query: {
    page: number;
    limit: number;
  },
) => {
  if (query.page < 1) return undefined;

  const params = new URLSearchParams(searchParams);
  params.set("page", query.page.toString());
  params.set("limit", query.limit.toString());

  return params.toString();
};

const PaginationGroup = ({
  paginationMeta,
}: {
  paginationMeta: PaginationMeta;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const limit = searchParams.get("limit") || 10;
  const { totalPages, currentPage } = paginationMeta;

  const { previousPageLink, nextPageLink } = useMemo(() => {
    if (!paginationMeta) return {};

    const { currentPage, itemsPerPage, totalPages } = paginationMeta;
    const createPageLink = (page: number) =>
      `${pathname}?${getPaginationQuery(searchParams, { page, limit: itemsPerPage })}`;

    return {
      previousPageLink:
        currentPage > 1 ? createPageLink(currentPage - 1) : undefined,
      nextPageLink:
        currentPage < totalPages ? createPageLink(currentPage + 1) : undefined,
    };
  }, [paginationMeta, pathname, searchParams]);

  const handleLimitChange = (newLimit: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("limit", newLimit.toString());
    params.set("page", "1");

    replace(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={previousPageLink || ""}
            disabled={!Boolean(previousPageLink)}
          />
        </PaginationItem>

        <DropdownMenu>
          <span className="font-mono text-sm">
            <DropdownMenuTrigger className="mr-1 border px-4 py-2">
              {paginationMeta.currentPage}
            </DropdownMenuTrigger>
            of {paginationMeta.totalPages}
          </span>

          <DropdownMenuContent>
            <DropdownMenuLabel>Items Per Page</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Array.from(Array(totalPages).keys()).map((index) => {
              const page = index + 1;
              return (
                <DropdownMenuCheckboxItem
                  key={page}
                  checked={page === currentPage}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <PaginationItem>
          <PaginationNext
            href={nextPageLink || ""}
            disabled={!Boolean(nextPageLink)}
          />
        </PaginationItem>

        <DropdownMenu>
          <DropdownMenuTrigger className="mr-1 border px-4 py-2">
            {limit}
          </DropdownMenuTrigger>{" "}
          items per page
          <DropdownMenuContent>
            <DropdownMenuLabel>Items Per Page</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {LIMIT_OPTIONS.map((option) => (
              <DropdownMenuCheckboxItem
                key={option}
                checked={limit === option}
                onClick={() => handleLimitChange(option)}
              >
                {option}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationGroup;
