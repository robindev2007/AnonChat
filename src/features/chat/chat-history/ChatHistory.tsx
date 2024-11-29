import React from "react";
import SingleChatHistory from "./SingleChatHistory";
import { ScrollArea } from "@/components/ui/scroll-area";

function ChatHistory() {
  return (
    <ScrollArea className="h-full px-3">
      <div>
        <ChatHistoryLable text="Rigth Now" />
        <SingleChatHistory isActive />
      </div>
      <div>
        <ChatHistoryLable text="Today" />

        <div>
          <SingleChatHistory />
          <SingleChatHistory />
          <SingleChatHistory />
          <SingleChatHistory />
          <SingleChatHistory />
        </div>
      </div>
      <div>
        <ChatHistoryLable text="Yesterday" />

        <div>
          <SingleChatHistory />
          <SingleChatHistory />
          <SingleChatHistory />
          <SingleChatHistory />
          <SingleChatHistory />
          <SingleChatHistory />
          <SingleChatHistory />
          <SingleChatHistory />
          <SingleChatHistory />
          <SingleChatHistory />
          <SingleChatHistory />
          <SingleChatHistory />
          <SingleChatHistory />
          <SingleChatHistory />
          <SingleChatHistory />
        </div>
      </div>
    </ScrollArea>
  );
}

export default ChatHistory;

const ChatHistoryLable = ({ text }: { text: string }) => {
  return (
    <p className="sticky top-0 bg-background-sidebar pb-1 pt-3 text-sm font-medium text-accent-700">
      {text}
    </p>
  );
};
