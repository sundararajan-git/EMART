"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import axiosInstance from "@/lib/axios/axios";
import { showErrorToast } from "@/lib/utils";
import type { ErrorToastType } from "@/types/types";
import { useEffect, useState } from "react";

interface ChatUser {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  online: boolean;
  unreadCount?: number;
}

const ChatsUserList = () => {
  const [users, setUsers] = useState([]);

  const getContacts = async () => {
    try {
      const { data } = await axiosInstance.get("/connect/user/contacts");
      console.log(data);
      setUsers(data);
    } catch (err) {
      console.log(err);
      showErrorToast(err as ErrorToastType);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <>
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between p-3 hover:bg-muted cursor-pointer "
        >
          <div className="flex items-center space-x-3 w-full">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.profilePic} />
                <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                  user.online ? "bg-green-500" : "bg-gray-400"
                }`}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm">{user.username}</p>
                <p className="text-xs text-muted-foreground">15/09/2025</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground truncate w-[150px]">
                  {user.lastMessage}
                </p>
                {user.unreadCount && (
                  <Badge className="bg-primary text-white text-xs rounded-full flex items-center justify-center w-4.5 h-4.5">
                    {user.unreadCount}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatsUserList;

const users: ChatUser[] = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/40?u=john",
    lastMessage: "Hey, did you finish the report?",
    online: true,
    unreadCount: 2,
  },
  {
    id: 2,
    name: "Emma Watson",
    avatar: "https://i.pravatar.cc/40?u=emma",
    lastMessage: "Let's meet tomorrow at 10am.",
    online: false,
  },
  {
    id: 3,
    name: "Michael Lee",
    avatar: "https://i.pravatar.cc/40?u=mike",
    lastMessage: "That design looks awesome 🔥",
    online: true,
    unreadCount: 5,
  },
  {
    id: 4,
    name: "Sarah Connor",
    avatar: "https://i.pravatar.cc/40?u=sarah",
    lastMessage: "Sure, talk soon!",
    online: false,
  },
];
