"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Status {
  id: number;
  name: string;
  avatar: string;
  time: string;
  seen: boolean;
}

const StatusList = () => {
  const statuses: Status[] = [
    {
      id: 1,
      name: "Emma Watson",
      avatar: "https://i.pravatar.cc/150?u=emma",
      time: "Today, 9:15 AM",
      seen: false,
    },
    {
      id: 2,
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?u=john",
      time: "Today, 8:40 AM",
      seen: true,
    },
    {
      id: 3,
      name: "Sarah Connor",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      time: "Yesterday, 10:22 PM",
      seen: true,
    },
    {
      id: 4,
      name: "Michael Lee",
      avatar: "https://i.pravatar.cc/150?u=mike",
      time: "Yesterday, 6:00 PM",
      seen: false,
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between p-3 hover:bg-muted cursor-pointer border-b">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://i.pravatar.cc/150?u=me" />
              <AvatarFallback>Me</AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="secondary"
              className="absolute bottom-0 right-0 rounded-full bg-blue-600 text-white w-4 h-4 hover:bg-blue-700"
            >
              <Plus className="size-3" />
            </Button>
          </div>
          <div>
            <p className="font-medium text-sm ">My Status</p>
            <p className="text-xs text-muted-foreground">
              Tap to add status update
            </p>
          </div>
        </div>
      </div>

      <div className="p-3 text-xs text-muted-foreground">Recent updates</div>
      {statuses
        .filter((s) => !s.seen)
        .map((status) => (
          <div
            key={status.id}
            className="flex items-center space-x-3 p-3 hover:bg-muted cursor-pointer"
          >
            <div
              className={`p-[2px] rounded-full ${
                status.seen ? "border-gray-300" : "border-green-500"
              } border-2`}
            >
              <Avatar className="w-10 h-10">
                <AvatarImage src={status.avatar} />
                <AvatarFallback>{status.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <p className="font-medium text-sm">{status.name}</p>
              <p className="text-xs text-muted-foreground">{status.time}</p>
            </div>
          </div>
        ))}

      <div className="p-3 text-xs text-muted-foreground">Viewed updates</div>
      {statuses
        .filter((s) => s.seen)
        .map((status) => (
          <div
            key={status.id}
            className="flex items-center space-x-3 p-3 hover:bg-muted cursor-pointer"
          >
            <div className="p-[2px] rounded-full border-2 border-gray-300">
              <Avatar className="w-10 h-10">
                <AvatarImage src={status.avatar} />
                <AvatarFallback>{status.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <p className="font-medium text-sm">{status.name}</p>
              <p className="text-xs text-muted-foreground">{status.time}</p>
            </div>
          </div>
        ))}
    </>
  );
};

export default StatusList;
