"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { HStack } from "./Stack";
import { Input } from "./ui/input";
import { IoMdSearch } from "react-icons/io";

enum QueryName {
  searchText = "searchText",
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
    <HStack>
      <Input
        className="max-w-lg"
        placeholder={searchTextPlaceholder}
        onChange={(e) => handleSearch(QueryName.searchText, e.target.value)}
        defaultValue={searchParams.get(QueryName.searchText)?.toString()}
        iconLeft={<IoMdSearch size={24} />}
      />
    </HStack>
  );
};

export default SearchFilterBar;
