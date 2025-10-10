"use client";
import { SiGitconnected } from "react-icons/si";
import { NavUser } from "@/components/shadcn/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaRegStar } from "react-icons/fa";
import { RiContactsBook3Line } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import ChatsUserList from "../app/sidebar/ChatsUserList";
import { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { LuX } from "react-icons/lu";
import StatusList from "../app/sidebar/StatusList";
import FavouritsList from "../app/sidebar/FavouritsList";
import ContactList from "../app/sidebar/ContactList";
import NotificationList from "../app/sidebar/NotificationList";

type AppSidebarPropsType = React.ComponentProps<typeof Sidebar>;

export const AppSidebar: React.FC<AppSidebarPropsType> = ({ ...props }) => {
  const [activeItem, setActiveItem] = useState(data.navMain[0]);
  const { setOpen } = useSidebar();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+10px)]! border-r border-gray-800/50 bg-background"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                asChild
                className="md:h-8 md:p-0 hover:bg-transparent hover:text-primary active:bg-transparent"
              >
                <div className="text-primary flex size-8 items-center justify-center rounded-lg">
                  <a href="#">
                    <SiGitconnected className="size-8" />
                  </a>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0 mt-4">
              <SidebarMenu className="gap-6">
                {data.navMain.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    className="flex justify-center"
                  >
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item);
                        setOpen(true);
                      }}
                      isActive={activeItem?.title === item.title}
                      className="p-2 h-full  hover:bg-transparent 
                      hover:cursor-pointer flex items-center justify-center relative rounded-sm"
                    >
                      {activeItem?.title === item.title && (
                        <span className="border-1 border-blue-600 h-6 absolute left-0 rounded"></span>
                      )}
                      <div>{item.icon}</div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarTrigger className="" />
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>
      <Sidebar
        collapsible="none"
        className="hidden flex-1 md:flex bg-background"
      >
        <SidebarHeader className="gap-3.5 p-4">
          {!showSearch ? (
            <div className="flex w-full items-center justify-between">
              <div className="text-xl font-bold">{activeItem?.title}</div>
              {["Contacts", "Favourits", "Chats"].includes(
                activeItem?.title
              ) && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSearch(true)}
                  className="hover:cursor-pointer"
                >
                  <Search size={18} />
                </Button>
              )}
            </div>
          ) : (
            <div className="flex items-center w-full space-x-2">
              <SidebarInput
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-sm p-4 border-none"
              />
              <Button
                variant="ghost"
                size="icon"
                className="hover:cursor-pointer"
                onClick={() => {
                  setSearchTerm("");
                  setShowSearch(false);
                }}
              >
                <LuX size={18} />
              </Button>
            </div>
          )}
        </SidebarHeader>
        <SidebarContent>
          {activeItem?.title === "Chats" && <ChatsUserList />}
          {activeItem?.title === "Status" && <StatusList />}
          {activeItem?.title === "Favourits" && <FavouritsList />}
          {activeItem?.title === "Contacts" && <ContactList />}
          {activeItem?.title === "Notifications" && <NotificationList />}
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
};

const data = {
  user: {
    name: "UN",
    email: "un@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Chats",
      url: "#",
      icon: <IoChatbubbleEllipsesOutline className="size-6" />,
      isActive: false,
    },
    {
      title: "Status",
      url: "#",
      icon: (
        <Avatar className="h-5 w-5 size-6 rounded-full hover:cursor-pointer p-0 m-0 bg-gray-600 ring-1 ring-offset-2 ring-offset-background  ring-green-600">
          <AvatarImage src="https://github.com/shadcn.png" alt="user" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      ),
      isActive: false,
    },
    {
      title: "Favourits",
      url: "#",
      icon: <FaRegStar className="size-5" />,
      isActive: false,
    },
    {
      title: "Contacts",
      url: "#",
      icon: <RiContactsBook3Line className="size-6" />,
      isActive: true,
    },
    {
      title: "Notifications",
      url: "#",
      icon: <IoMdNotificationsOutline className="size-6" />,
      isActive: false,
    },
  ],
  mails: [],
};
