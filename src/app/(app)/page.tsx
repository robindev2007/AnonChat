"use client";
import { Button } from "@/components/ui/button";
import { ChatContext } from "@/context/ChatContextProvider";
import React, { useContext } from "react";

function Page() {
  const { sendCall } = useContext(ChatContext);

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <div className="space-y-5">
        <h1 className="text-4xl font-semibold">
          From stranger to friends, <br /> the journey just got easy.
        </h1>
        <div>
          <p className="text-lg font-medium">Start cating</p>
          <div>
            <Button onClick={() => sendCall()}>Start Video</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
