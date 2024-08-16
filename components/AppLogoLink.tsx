import Link from "next/link";
import { FaClock } from "react-icons/fa";
import { HStack } from "./Stack";
import clsx from "clsx";
import MainPageLink from "./MainPageLink";
import { cn } from "@/lib/utils";

const AppLogoLink = ({
  size = "md",
  containerClassName,
}: {
  size?: "md" | "lg";
  containerClassName?: string;
}) => {
  return (
    <MainPageLink>
      <HStack className={cn("gap-2", containerClassName)}>
        <FaClock
          className={clsx("text-primary", {
            "text-2xl": size === "lg",
          })}
        />
        <p
          className={clsx("font-bold", {
            "text-2xl": size === "lg",
          })}
        >
          Clockify
        </p>
      </HStack>
    </MainPageLink>
  );
};

export default AppLogoLink;
