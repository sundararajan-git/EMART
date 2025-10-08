"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { FiSearch, FiPaperclip, FiSend, FiMoreVertical } from "react-icons/fi";
import {
  IoIosCall,
  IoMdVideocam,
  IoMdClose,
  IoMdPause,
  IoMdMic,
} from "react-icons/io";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { format } from "date-fns";
import { TooltipContent } from "@radix-ui/react-tooltip";

type User = {
  id: string;
  name: string;
  avatar?: string;
  online: boolean;
};

type Message = {
  id: string;
  from: string; // user id
  text?: string;
  time: string;
  type: "text" | "image" | "audio" | "system";
  fileUrl?: string;
  fileName?: string;
};

const DUMMY_USERS: User[] = [
  {
    id: "u1",
    name: "John Doe",
    avatar: "https://i.pravatar.cc/40?u=john",
    online: true,
  },
  {
    id: "u2",
    name: "Emma Watson",
    avatar: "https://i.pravatar.cc/40?u=emma",
    online: true,
  },
  {
    id: "u3",
    name: "Michael Lee",
    avatar: "https://i.pravatar.cc/40?u=mike",
    online: false,
  },
];

const EMOJI_LIST = ["😀", "😁", "😂", "😅", "😍", "👍", "🙏", "🔥", "🎉", "🚀"];

export default function AdvancedChat() {
  const [users] = useState<User[]>(DUMMY_USERS);
  const [activeUser, setActiveUser] = useState<User | null>(users[0] ?? null);

  const [messages, setMessages] = useState<Record<string, Message[]>>(() => {
    // keyed by user.id
    const initial: Record<string, Message[]> = {};
    users.forEach((u) => {
      initial[u.id] = [
        {
          id: `m-${u.id}-1`,
          from: u.id,
          text: `Hello from ${u.name}!`,
          time: new Date().toISOString(),
          type: "text",
        },
      ];
    });
    return initial;
  });

  // Input state
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [filePreview, setFilePreview] = useState<{
    url: string;
    name: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Audio recording
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  // Scroll ref for messages
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // WebSocket placeholder
  const wsRef = useRef<WebSocket | null>(null);

  // Scroll to bottom on messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeUser, messages]);

  // Basic WebSocket connect placeholder (replace URL & payloads as needed)
  useEffect(() => {
    // Example: open a websocket connection per logged-in user (only placeholder)
    // wsRef.current = new WebSocket("wss://example.com/chat");
    // wsRef.current.onopen = () => console.log("ws open");
    // wsRef.current.onmessage = (ev) => handleIncoming(JSON.parse(ev.data));
    // return () => { wsRef.current?.close(); };
    return;
  }, []);

  const handleIncoming = useCallback((msg: Message & { toUserId?: string }) => {
    if (!msg) return;
    const toUserId = msg.from;
    setMessages((prev) => {
      const copy = { ...prev };
      copy[toUserId] = [...(copy[toUserId] ?? []), msg];
      return copy;
    });
  }, []);

  const sendMessage = useCallback(
    (payload: Omit<Message, "id" | "time">) => {
      if (!activeUser) return;
      const msg: Message = {
        ...payload,
        id: "m-" + Math.random().toString(36).slice(2, 9),
        time: new Date().toISOString(),
      };

      // Append locally
      setMessages((prev) => {
        const copy = { ...prev };
        copy[activeUser.id] = [...(copy[activeUser.id] ?? []), msg];
        return copy;
      });

      // TODO: send via websocket / REST API
      // wsRef.current?.send(JSON.stringify(msg));
    },
    [activeUser]
  );

  const onSendClick = () => {
    if (!input.trim() && !filePreview && !audioUrl) return;

    if (filePreview) {
      sendMessage({
        from: "me",
        type: "image",
        fileUrl: filePreview.url,
        fileName: filePreview.name,
      });
      setFilePreview(null);
      setInput("");
      return;
    }

    if (audioUrl) {
      sendMessage({
        from: "me",
        type: "audio",
        fileUrl: audioUrl,
      });
      setAudioUrl(null);
      return;
    }

    sendMessage({
      from: "me",
      type: "text",
      text: input.trim(),
    });
    setInput("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendClick();
    }
  };

  // File handling
  const onChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFilePreview({ url, name: file.name });
  };

  const clearFile = () => {
    if (filePreview) {
      URL.revokeObjectURL(filePreview.url);
      setFilePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Audio recording logic
  useEffect(() => {
    return () => {
      // cleanup: stop recorder & revoke urls
      try {
        mediaRecorderRef.current?.state === "recording" &&
          mediaRecorderRef.current?.stop();
      } catch {}
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startRecording = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      alert("Audio recording not supported in this browser.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "audio/ogg";
      const mr = new MediaRecorder(stream, { mimeType: mime });
      recordedChunksRef.current = [];

      mr.ondataavailable = (e) => {
        if (e.data.size > 0) recordedChunksRef.current.push(e.data);
      };

      mr.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: mime });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        // stop tracks from stream
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorderRef.current = mr;
      mr.start();
      setIsRecording(true);
    } catch (err) {
      console.error("mic err", err);
      alert("Could not start recording.");
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Emoji pick
  const addEmoji = (em: string) => {
    setInput((s) => s + em);
    setShowEmoji(false);
  };

  // User actions (call / video / block) - placeholders
  const onCall = (user: User) => {
    // Integrate with WebRTC or external call system
    alert(`Starting voice call with ${user.name} (placeholder)`);
  };
  const onVideo = (user: User) => {
    alert(`Starting video call with ${user.name} (placeholder)`);
  };
  const onBlock = (user: User) => {
    if (!confirm(`Block ${user.name}?`)) return;
    // handle block in backend
    alert(`${user.name} blocked (placeholder)`);
  };

  const renderMessage = (m: Message) => {
    const isMe = m.from === "me";
    return (
      <motion.div
        key={m.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className={`flex ${isMe ? "justify-end" : "justify-start"} mb-3`}
      >
        {!isMe && (
          <Avatar className="w-8 h-8 mr-2">
            <AvatarImage src={activeUser?.avatar} />
            <AvatarFallback>{activeUser?.name?.[0]}</AvatarFallback>
          </Avatar>
        )}
        <div className={`${isMe ? "items-end" : "items-start"} max-w-[70%]`}>
          <div
            className={`px-3 py-2 rounded-xl break-words ${
              isMe
                ? "bg-blue-600 text-white rounded-br-none"
                : "bg-gray-100 text-gray-800 rounded-bl-none"
            }`}
          >
            {m.type === "text" && <div>{m.text}</div>}
            {m.type === "image" && m.fileUrl && (
              <img
                src={m.fileUrl}
                alt={m.fileName ?? "img"}
                className="max-w-full rounded-md"
              />
            )}
            {m.type === "audio" && m.fileUrl && (
              <audio controls src={m.fileUrl} className="max-w-full" />
            )}
            {m.type === "system" && <em className="text-sm">{m.text}</em>}
          </div>
          <div className="text-[11px] text-gray-400 mt-1 flex gap-2 items-center">
            <span>{format(new Date(m.time), "hh:mm a")}</span>
          </div>
        </div>
        {isMe && (
          <Avatar className="w-8 h-8 ml-2">
            <AvatarImage src="https://i.pravatar.cc/40?u=me" />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
        )}
      </motion.div>
    );
  };

  const activeMessages = activeUser ? messages[activeUser.id] ?? [] : [];

  return (
    <div className="flex h-screen">
      <main className="h-full w-full flex flex-col">
        {/* Header */}
        <div className="border-b  p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={activeUser?.avatar} />
              <AvatarFallback>{activeUser?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{activeUser?.name}</div>
              <div className="text-xs text-gray-500">
                {activeUser?.online ? "Online" : "Offline"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Tooltip>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => activeUser && onCall(activeUser)}
              >
                <IoIosCall size={18} />
              </Button>
            </Tooltip>

            <Tooltip>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => activeUser && onVideo(activeUser)}
              >
                <IoMdVideocam size={18} />
              </Button>
            </Tooltip>

            <div className="relative">
              <Button size="icon" variant="ghost">
                <FiMoreVertical />
              </Button>
              <div className="absolute right-0 mt-2 w-44 border rounded shadow-lg z-20 hidden group-hover:block">
                <button
                  className="w-full px-3 py-2 text-left hover:bg-gray-100"
                  onClick={() => activeUser && onBlock(activeUser)}
                >
                  Block
                </button>
                <button className="w-full px-3 py-2 text-left hover:bg-gray-100">
                  View Profile
                </button>
                <button className="w-full px-3 py-2 text-left hover:bg-gray-100">
                  Clear Chat
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {activeMessages.map((m) => renderMessage(m))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Composer */}
        <div className="p-3  border-t">
          {/* file preview */}
          {filePreview && (
            <div className="mb-2 flex items-center gap-3">
              <img
                src={filePreview.url}
                alt="preview"
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <div className="font-medium">{filePreview.name}</div>
                <div className="text-xs text-gray-500">Image ready to send</div>
              </div>
              <Button variant="ghost" size="icon" onClick={clearFile}>
                <IoMdClose />
              </Button>
            </div>
          )}

          {audioUrl && (
            <div className="mb-2 flex items-center gap-3">
              <audio controls src={audioUrl} className="max-w-sm" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  URL.revokeObjectURL(audioUrl);
                  setAudioUrl(null);
                }}
              >
                <IoMdClose />
              </Button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onChooseFile}
              />
              <Tooltip>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FiPaperclip />
                </Button>
              </Tooltip>
              <Tooltip>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowEmoji((s) => !s)}
                >
                  <HiOutlineEmojiHappy />
                </Button>
              </Tooltip>
              <Tooltip
              // content={isRecording ? "Stop Recording" : "Record Audio"}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    isRecording ? stopRecording() : startRecording()
                  }
                >
                  {isRecording ? <IoMdPause /> : <IoMdMic />}
                </Button>
              </Tooltip>
            </div>

            <div className="flex-1 relative">
              <Input
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
              />
              {showEmoji && (
                <div className="absolute bottom-12 left-0 bg-white border rounded shadow p-2 grid grid-cols-6 gap-2 z-30">
                  {EMOJI_LIST.map((em) => (
                    <button
                      key={em}
                      onClick={() => addEmoji(em)}
                      className="text-lg p-1 hover:bg-gray-100 rounded"
                    >
                      {em}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button onClick={onSendClick} className="ml-1">
              <FiSend />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
