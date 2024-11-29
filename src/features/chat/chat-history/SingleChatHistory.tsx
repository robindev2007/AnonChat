import { cn } from "@/lib/utils";
import React from "react";

function SingleChatHistory({ isActive = false }: { isActive?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-md py-1 text-sm",
        isActive && "bg-accent-100 px-2",
      )}
    >
      <div className="text-accent-900 flex flex-row items-center gap-2">
        <p className="font-medium">Georgia, USA </p>{" "}
        <span className="">(00:34:07)</span>
      </div>
      <p className="text-accent-900">12.223.34.5</p>
    </div>
  );
}

export default SingleChatHistory;
