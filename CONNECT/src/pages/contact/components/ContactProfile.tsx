import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { UserType } from "@/types/types";
import { FaPhoneAlt, FaVideo, FaHeart, FaRegHeart } from "react-icons/fa";
import { MdOutlineBlock } from "react-icons/md";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

interface ContactProfileProps {
  contact: UserType;
}

const ContactProfile = ({ contact }: ContactProfileProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-6 text-center">
      <Avatar className="w-28 h-28">
        <AvatarImage src={contact.profilePic} />
        <AvatarFallback>{contact.username.charAt(0)}</AvatarFallback>
      </Avatar>

      <div>
        <h2 className="text-2xl font-semibold">{contact.username}</h2>
        <p className="text-muted-foreground">{contact.email}</p>
      </div>

      <div className="flex gap-4">
        <Button size="icon" variant="secondary">
          <IoChatbubbleEllipsesSharp />
        </Button>
        <Button size="icon" variant="secondary">
          <FaPhoneAlt />
        </Button>
        <Button size="icon" variant="secondary">
          <FaVideo />
        </Button>
      </div>

      <div className="flex gap-4">
        <Button variant="outline">
          {true ? <FaRegHeart /> : <FaHeart className="text-red-600" />}
          Favourites
        </Button>
        <Button variant="default" className="bg-red-600 hover:bg-red-700">
          <MdOutlineBlock /> Block
        </Button>
      </div>
    </div>
  );
};

export default ContactProfile;
