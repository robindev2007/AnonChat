import Image from "next/image";
import React from "react";
import ChatHistory from "../chat-history/ChatHistory";
import { FaGear } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

function SideBar() {
  return (
    <div className="hidden shrink-0 flex-col gap-2 bg-background-sidebar shadow-inner shadow-[#33190010] md:flex">
      <div className="flex h-header items-center px-3">
        <Image src={"/images/Logo-main.png"} height={30} width={129} alt="" />
      </div>
      <ChatHistory />
      <div className="px-3">
        <Button
          variant={"ghost"}
          className="text-accent-900 w-auto justify-start p-0"
        >
          <FaGear className="text-primary" />
          Settings
        </Button>
      </div>
    </div>
  );
}

export default SideBar;
