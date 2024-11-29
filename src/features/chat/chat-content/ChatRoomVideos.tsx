"use client";
import { ChatContext } from "@/context/ChatContextProvider";
import React, { useContext, useEffect, useRef } from "react";

function ChatRoomVideos() {
  const { currentVideoStreem, remtoteVideoStrem } = useContext(ChatContext);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const currentVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (remoteVideoRef.current && remtoteVideoStrem) {
      remoteVideoRef.current.srcObject = remtoteVideoStrem;
    }
  }, [remoteVideoRef, remtoteVideoStrem]);

  useEffect(() => {
    if (currentVideoRef.current && currentVideoStreem) {
      currentVideoRef.current.srcObject = currentVideoStreem;
    }
  }, [currentVideoRef, currentVideoStreem]);

  return (
    <div className="relative h-full grid-rows-2 border-b p-3 md:grid md:h-full md:gap-2 md:border-none">
      <video
        ref={remoteVideoRef}
        autoPlay
        className="mx-auto aspect-video h-full w-full rounded-sm bg-secondary"
      />

      <video
        ref={currentVideoRef}
        autoPlay
        className="absolute right-6 top-6 z-30 mx-auto aspect-video h-32 w-20 rounded-sm border border-primary bg-secondary shadow-xl md:static md:h-full md:w-full md:border-none md:shadow-none"
      />
    </div>
  );
}

export default ChatRoomVideos;
