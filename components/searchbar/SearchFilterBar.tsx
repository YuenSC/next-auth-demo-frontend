"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoMdSearch } from "react-icons/io";
import { useDebouncedCallback } from "use-debounce";
import { HStack } from "../Stack";
import { Input } from "../ui/input";
import SearchDropDown from "./SearchDropdown";

enum QueryName {
  searchText = "searchText",
  status = "status",
}

const SearchFilterBar = ({
  searchTextPlaceholder,
}: {
  searchTextPlaceholder: string;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <HStack className="gap-4">
      <SearchDropDown
        handleSearch={handleSearch}
        queryKey="status"
        defaultValue={searchParams.get(QueryName.status)?.toString()}
        items={[
          { label: "Show All", key: "all" },
          { label: "Show Active", key: "active" },
          { label: "Show Inactive", key: "inactive" },
        ]}
      />

      <Input
        className="md:max-w-lg"
        placeholder={searchTextPlaceholder}
        onChange={(e) => handleSearch(QueryName.searchText, e.target.value)}
        defaultValue={searchParams.get(QueryName.searchText)?.toString()}
        iconLeft={<IoMdSearch size={24} />}
      />
    </HStack>
  );
};

export default SearchFilterBar;
