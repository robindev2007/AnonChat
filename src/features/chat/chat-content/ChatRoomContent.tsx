"use client";
import React, { useContext } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ChatRoomVideos from "./ChatRoomVideos";
import LiveMessage from "../live-message/LiveMessage";
import { ChatContext } from "@/context/ChatContextProvider";
import { Button } from "@/components/ui/button";

function ChatRoomContent() {
  const { remtoteVideoStrem, sendCall } = useContext(ChatContext);

  if (!remtoteVideoStrem) {
    return <Button onClick={sendCall}>Add call</Button>;
  }
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="flex h-full w-full flex-col overflow-hidden md:hidden">
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel minSize={20} defaultSize={40}>
            <ChatRoomVideos />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={40} defaultSize={50}>
            <LiveMessage />
          </ResizablePanel>
        </ResizablePanelGroup>
        {/* <ChatRoomVideos />
        <LiveMessage /> */}
      </div>
      <div className="hidden h-full w-full flex-col overflow-hidden md:flex">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel minSize={40} defaultSize={40}>
            <ChatRoomVideos />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={30} defaultSize={30}>
            <LiveMessage />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default ChatRoomContent;
