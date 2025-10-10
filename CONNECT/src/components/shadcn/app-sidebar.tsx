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
import ChatsUserList from "../app/sidebar/ChatsUserList";
import { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { LuX } from "react-icons/lu";
import StatusList, { AvatarStatus } from "../app/sidebar/StatusList";
import FavouritsList from "../app/sidebar/FavouritsList";
import ContactList from "../app/sidebar/ContactList";
import NotificationList from "../app/sidebar/NotificationList";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDisapatch, RootState } from "@/store/store";
import { updateRoute } from "@/store/slices/sidebarSlice";
import { sidebarIcons } from "@/lib/constant";

type AppSidebarPropsType = React.ComponentProps<typeof Sidebar>;

export const AppSidebar: React.FC<AppSidebarPropsType> = ({ ...props }) => {
  const { setOpen } = useSidebar();
  const navigate = useNavigate();
  const { navRoute, activeItem } = useSelector(
    (state: RootState) => state.sidebar
  );
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDisapatch>();
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
                  <span>
                    <SiGitconnected className="size-8" />
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0 mt-4">
              <SidebarMenu className="gap-6">
                {navRoute.map((item) => (
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
                        navigate(item.url);
                        dispatch(updateRoute(item));
                        setOpen(true);
                      }}
                      isActive={activeItem?.title === item.title}
                      className="p-2 h-full  hover:bg-transparent 
                      hover:cursor-pointer flex items-center justify-center relative rounded-sm"
                    >
                      {activeItem?.title === item.title && (
                        <span className="border-1 border-blue-600 h-6 absolute left-0 rounded"></span>
                      )}
                      <div>
                        {item.title === "Status" ? (
                          <AvatarStatus user={user} />
                        ) : (
                          sidebarIcons[item.title]
                        )}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarTrigger className="" />
          <NavUser />
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
