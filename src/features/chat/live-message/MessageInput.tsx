import { Input } from "@/components/ui/input";
import React from "react";
import { GoPaperAirplane } from "react-icons/go";

function MessageInput() {
  return (
    <div className="flex items-center gap-2 p-3">
      <div className="flex h-10 w-full overflow-hidden rounded-md border bg-secondary transition-all focus-within:border-primary">
        <Input
          type="text"
          placeholder="Type a messae"
          className="h-full w-full rounded-none border-none shadow-none focus-within:outline-none"
        />
      </div>
      <button className="px-1">
        <GoPaperAirplane />
      </button>
    </div>
  );
}

export default MessageInput;
