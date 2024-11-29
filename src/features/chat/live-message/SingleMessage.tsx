import { cn } from "@/lib/utils";
import React from "react";

function SingleMessage({
  fromCurrentUser = false,
}: {
  text: string;
  fromCurrentUser?: boolean;
}) {
  return (
    <div
      className={cn(
        "mt-2 flex max-w-[80%] flex-col rounded-e-xl rounded-es-xl p-4 last:mb-2",
        fromCurrentUser
          ? "ml-auto bg-message-send-background text-message-send-foreground"
          : "border-2 bg-secondary",
      )}
    >
      <p>
        That&apos;s awesome. I think our users will really appreciate the
        improvements.
      </p>
    </div>
  );
}

export default SingleMessage;
