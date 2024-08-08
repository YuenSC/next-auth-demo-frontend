import Link from "next/link";
import { FaClock } from "react-icons/fa";
import { HStack } from "./Stack";
import clsx from "clsx";

const AppLogoLink = ({ size = "md" }: { size?: "md" | "lg" }) => {
  return (
    <Link href="/">
      <HStack className="gap-2">
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
    </Link>
  );
};

export default AppLogoLink;
