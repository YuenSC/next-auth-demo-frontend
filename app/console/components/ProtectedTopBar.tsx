import AppLogoLink from "@/components/AppLogoLink";
import { HStack } from "@/components/Stack";
import { Button } from "@/components/ui/button";
import React from "react";
import { IoMdMenu } from "react-icons/io";

const ProtectedTopBar = () => {
  return (
    <HStack className="border-b bg-white pl-4">
      <Button variant="outline" size="icon">
        <IoMdMenu size={24} />
      </Button>
      <div className="p-4">
        <AppLogoLink size="lg" />
      </div>
    </HStack>
  );
};

export default ProtectedTopBar;
