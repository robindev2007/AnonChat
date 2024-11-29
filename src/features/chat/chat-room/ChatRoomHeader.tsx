import { Button } from "@/components/ui/button";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

function ChatRoomHeader() {
  return (
    <div className="flex h-header w-full items-center justify-between border-b px-3">
      <h2 className="text-xl font-semibold">Chatroom</h2>
      <div>
        <Button size={"sm"} className="shadow-none">
          Next Room
          <span className="text-primary-foreground/90">(spacebar)</span>
          <FaArrowRight />
        </Button>
      </div>
    </div>
  );
}

export default ChatRoomHeader;
