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
  useSearchParams,
} from "next/navigation";
import { useMemo } from "react";

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

const DataTablePagination = ({
  paginationMeta,
}: {
  paginationMeta: PaginationMeta;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

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

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={previousPageLink || ""}
            disabled={!Boolean(previousPageLink)}
          />
        </PaginationItem>

        <span className="font-mono text-sm">
          {paginationMeta.currentPage} of {paginationMeta.totalPages}
        </span>

        <PaginationItem>
          <PaginationNext
            href={nextPageLink || ""}
            disabled={!Boolean(nextPageLink)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default DataTablePagination;
