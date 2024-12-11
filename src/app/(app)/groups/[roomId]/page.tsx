"use client";

import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import Peer from "peerjs";
import React, { useEffect, useRef, useState } from "react";

type PresenceState = {
  [key: string]: ActiveUserT[];
};

type ActiveUserT = {
  online_at: string;
  peer_id: string;
  presence_ref: string;
  isInCall: boolean;
};

function GroupPage() {
  const { roomId } = useParams<{ roomId: string }>();

  const [currentUserStream, setCurrentUserStream] =
    useState<MediaStream | null>(null);
  const [remoteUserStream, setRemoteUserStream] = useState<MediaStream | null>(
    null
  );
  const [activeUsers, setActiveUsers] = useState<ActiveUserT[]>([]);
  const [isInCall, setIsInCall] = useState(false);
  const [peerId, setPeerId] = useState("");

  const currentUserStreamRef = useRef<HTMLVideoElement>(null);
  const remoteUserStreamRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer | null>(null);

  const supabase = createSupabaseBrowserClient();

  // Get current user's media stream
  const getCurrentUserStream = async () => {
    console.log(remoteUserStream, setIsInCall);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setCurrentUserStream(stream);
      if (currentUserStreamRef.current) {
        currentUserStreamRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Failed to access user media:", error);
      alert("Unable to access camera. Please check your permissions.");
    }
  };

  // Initialize Peer.js
  useEffect(() => {
    const peer = new Peer();
    peerRef.current = peer;

    peer.on("open", (id) => setPeerId(id));

    peer.on("call", async (call) => {
      call.answer(currentUserStream!);
      call.on("stream", (remoteStream) => {
        setRemoteUserStream(remoteStream);
        if (remoteUserStreamRef.current) {
          remoteUserStreamRef.current.srcObject = remoteStream;
        }
      });
      call.on("error", console.error);
    });

    peer.on("connection", (conn) => {
      conn.on("data", console.log);
      conn.on("error", console.error);
    });

    peer.on("error", console.error);

    return () => {
      peer.destroy();
    };
  }, [currentUserStream]);

  // Get user's stream on component mount
  useEffect(() => {
    getCurrentUserStream();

    return () => {
      currentUserStream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  // Supabase room subscription
  useEffect(() => {
    if (!peerId) return;

    const channel = supabase.channel(`room-${roomId}`);
    channel
      .on("presence", { event: "sync" }, () => {
        const presenceStateUsers: PresenceState = channel.presenceState();
        const users = Object.values(presenceStateUsers)
          .flat()
          .filter((user) => user.peer_id !== peerId);
        setActiveUsers(users);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            online_at: new Date().toISOString(),
            peer_id: peerId,
            isInCall,
          });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, [peerId, isInCall, roomId]);

  // Send a call to a random active user
  const sendCall = async () => {
    if (activeUsers.length < 1) {
      console.log("No user online");
      return;
    }

    const randomUser = activeUsers[0];

    if (randomUser.isInCall) {
      console.log("No user available to call");
      return;
    }

    if (peerRef.current) {
      const conn = peerRef.current.connect(randomUser.peer_id);
      conn.on("open", () => conn.send("Hello from the sender!"));

      const call = peerRef.current.call(
        randomUser.peer_id,
        currentUserStream as MediaStream
      );

      call.on("stream", (remoteStream) => {
        setRemoteUserStream(remoteStream);
        if (remoteUserStreamRef.current) {
          remoteUserStreamRef.current.srcObject = remoteStream;
        }
      });

      call.on("error", console.error);
      conn.on("error", console.error);
    }
  };

  return (
    <div className="grid grid-rows-2 gap-3 p-5">
      {isInCall && <div className="size-10 bg-red-500"></div>}
      <video
        ref={currentUserStreamRef}
        className="aspect-video bg-secondary"
        autoPlay
        playsInline
        muted
      />
      <video
        ref={remoteUserStreamRef}
        className="aspect-video bg-secondary"
        autoPlay
        playsInline
      />
      <Button onClick={sendCall}>Call</Button>
    </div>
  );
}

export default GroupPage;
