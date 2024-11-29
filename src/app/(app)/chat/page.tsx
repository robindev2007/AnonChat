import React from "react";
import ChatRoomHeader from "@/features/chat/chat-room/ChatRoomHeader";
import ChatRoomContent from "@/features/chat/chat-content/ChatRoomContent";

function ChatPage() {
  return (
    <div className="flex flex-1 flex-col">
      <ChatRoomHeader />
      <ChatRoomContent />
    </div>
  );
}

export default ChatPage;
