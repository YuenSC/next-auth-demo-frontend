"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoMdSearch } from "react-icons/io";
import { useDebouncedCallback } from "use-debounce";
import { HStack } from "../Stack";
import { Input } from "../ui/input";
import SearchDropDown from "./SearchDropdown";
import { Button } from "../ui/button";

enum QueryName {
  searchText = "searchText",
  status = "status",
}

enum FilterActiveStatus {
  all = "all",
  active = "active",
  inactive = "inactive",
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
    <HStack className="flex-wrap gap-4">
      <SearchDropDown
        handleSearch={handleSearch}
        queryKey="status"
        defaultValue={
          searchParams.get(QueryName.status)?.toString() ||
          FilterActiveStatus.all
        }
        items={[
          { label: "Show All", key: FilterActiveStatus.all },
          { label: "Show Active", key: FilterActiveStatus.active },
          { label: "Show Inactive", key: FilterActiveStatus.inactive },
        ]}
      />

      <Input
        containerClassName="flex-grow-1 flex-basis-100 flex-shrink-0 md:max-w-lg"
        placeholder={searchTextPlaceholder}
        onChange={(e) => handleSearch(QueryName.searchText, e.target.value)}
        defaultValue={searchParams.get(QueryName.searchText)?.toString()}
        iconLeft={<IoMdSearch size={24} />}
      />
    </HStack>
  );
};

export default SearchFilterBar;
