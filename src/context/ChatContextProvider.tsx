"use client";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import Peer from "peerjs";
import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

type presenceState = {
  [key: string]: ActiveUserT[];
};

type ActiveUserT = {
  online_at: string;
  peer_id: string;
  presence_ref: string;
};

type ChatContextT = {
  peerId: string;
  remotePeerId: string;
  currentVideoStreem?: MediaStream;
  remtoteVideoStrem?: MediaStream;
  sendCall: () => void;
  setRemotePeerId: (id: string) => void;
};

export const ChatContext = createContext<ChatContextT>({
  peerId: "",
  remotePeerId: "",
  sendCall: () => {},
  setRemotePeerId: () => {},
});

function ChatContextProvider({ children }: { children: ReactNode }) {
  const [peerId, setPeerId] = useState("");
  const [remotePeerId, setRemotePeerId] = useState("");
  const [currentVideoStreem, setCurrentVideoStreem] = useState<MediaStream>();
  const [remtoteVideoStrem, setRemtoteVideoStrem] = useState<MediaStream>();
  const [activeUsers, setActiveUsres] = useState<ActiveUserT[]>([]);

  const peerRef = useRef<Peer | null>(null);

  const supabase = createSupabaseBrowserClient();

  const getUserMedia = async () => {
    try {
      const strem = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      });
      setCurrentVideoStreem(strem);
      console.log(strem);
      return strem;
    } catch (error) {
      console.error("Failed to get user media:", error);
      throw error;
    }
  };

  const sendCall = async () => {
    if (activeUsers.length < 1) {
      toast.warning("No users online");
      return;
    }

    // router.push("/chat");

    const randomUserId = activeUsers[0].peer_id;

    if (peerRef.current) {
      try {
        const conn = peerRef.current.connect(randomUserId);
        conn.on("open", () => {
          console.log("Connection opened with:", randomUserId);
          conn.send("Hello from the sender!");
        });

        const stream = await getUserMedia();

        const call = peerRef.current.call(randomUserId, stream);

        console.log(call);
        call.on("stream", (remoteStream) => {
          console.log("Remote stream received:", remoteStream);
          setRemtoteVideoStrem(stream);
        });

        call.on("error", (error) => {
          console.error("Call error:", error);
        });

        conn.on("error", (err) => {
          console.error("Connection error:", err);
        });
      } catch (error) {
        console.error("Failed to send call:", error);
      }
    } else {
      console.error("Peer is not initialized");
    }
  };

  useEffect(() => {
    const peer = new Peer();
    peerRef.current = peer;

    // Initialize Peer
    peer.on("open", async (id) => {
      setPeerId(id);
      console.log("Peer ID:", id);
      const stream = await getUserMedia();

      setCurrentVideoStreem(stream);
    });

    peer.on("call", async (call) => {
      try {
        const stream = await getUserMedia();
        call.answer(stream);

        setCurrentVideoStreem(stream);

        call.on("stream", (remoteStream) => {
          console.log("Remote stream received:", remoteStream);
          setRemtoteVideoStrem(remoteStream);
        });

        call.on("error", (error) => {
          console.error("Call error:", error);
        });
      } catch (error) {
        console.error("Error handling incoming call:", error);
      }
    });

    // Handle incoming connections
    peer.on("connection", (conn) => {
      console.log("Incoming connection from:", conn.peer);
      conn.on("data", (data) => {
        console.log("Received data:", data);
      });
      conn.on("error", (err) => {
        console.error("Connection error:", err);
      });
      // router.push("/chat");
    });

    peer.on("error", (err) => {
      console.error("Peer error:", err);
    });

    // Cleanup on unmount
    return () => {
      if (peerRef.current) {
        peerRef.current.destroy();
        peerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!peerId) return;

    const channel = supabase.channel("room");

    channel
      .on("presence", { event: "sync" }, () => {
        console.log("Synced presence state: ", channel.presenceState());
        const presenceStateUsers: presenceState = channel.presenceState();

        const users = Object.values(presenceStateUsers)
          .flat() // Flatten the array of users
          .filter((user) => user.peer_id !== peerId); // Exclude the current user

        setActiveUsres(users); // Update activeUsers state

        console.log(users); // Log active users
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          // Track the user's presence in the room
          await channel.track({
            online_at: new Date().toISOString(),
            peer_id: peerId,
          });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, [peerId]);

  return (
    <ChatContext.Provider
      value={{
        peerId,
        remotePeerId,
        currentVideoStreem,
        remtoteVideoStrem,
        setRemotePeerId,
        sendCall,
      }}>
      {children}
    </ChatContext.Provider>
  );
}

export default ChatContextProvider;
