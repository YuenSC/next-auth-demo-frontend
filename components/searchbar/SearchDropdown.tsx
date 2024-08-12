"use client ";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const SearchDropDown = ({
  defaultValue,
  handleSearch,
  queryKey,
  items,
}: {
  defaultValue?: string;
  queryKey: string;
  handleSearch: (queryKey: string, itemKey: string) => void;
  items: Array<{ label: string; key: string }>;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {items.find((item) => item.key === defaultValue)?.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="" align="start">
        <DropdownMenuRadioGroup
          value={defaultValue}
          onValueChange={(itemKey) => handleSearch(queryKey, itemKey)}
        >
          {items.map((item) => (
            <DropdownMenuRadioItem value={item.key} key={item.key}>
              {item.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SearchDropDown;
