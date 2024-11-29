import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageInput from "./MessageInput";
import SingleMessage from "./SingleMessage";

function LiveMessage() {
  return (
    <div className="flex h-full flex-1 flex-col overflow-y-hidden">
      <ScrollArea className="flex w-full flex-grow flex-col overflow-y-auto px-3">
        <SingleMessage text={"Hello"} fromCurrentUser />
        <SingleMessage text={"Hello"} />
        <SingleMessage text={"Hello"} fromCurrentUser />
        <SingleMessage text={"Hello"} fromCurrentUser />
        <SingleMessage text={"Hello"} fromCurrentUser />
        <SingleMessage text={"Hello"} fromCurrentUser />
        <SingleMessage text={"Hello"} />
        <SingleMessage text={"Hello"} fromCurrentUser />
        <SingleMessage text={"Hello"} fromCurrentUser />
        <SingleMessage text={"Hello"} fromCurrentUser />
        <SingleMessage text={"Hello"} />
      </ScrollArea>
      <div className="h-fit border-t">
        <MessageInput />
      </div>
    </div>
  );
}

export default LiveMessage;
