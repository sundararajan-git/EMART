import type { ReactNode } from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RiContactsBook3Line } from "react-icons/ri";

export const navRoute = [
  {
    title: "Chats",
    url: "/chats",
    isActive: false,
  },
  {
    title: "Status",
    url: "/status",
    isActive: false,
  },
  {
    title: "Favourits",
    url: "/favourits",
    isActive: false,
  },
  {
    title: "Contacts",
    url: "/contacts",
    isActive: true,
  },
  {
    title: "Notifications",
    url: "/notification",
    isActive: false,
  },
];

export const sidebarIcons: Record<string, ReactNode> = {
  Chats: <IoChatbubbleEllipsesOutline className="size-6" />,
  Favourits: <FaRegHeart className="size-5" />,
  Contacts: <RiContactsBook3Line className="size-6" />,
  Notifications: <IoMdNotificationsOutline className="size-6" />,
};
