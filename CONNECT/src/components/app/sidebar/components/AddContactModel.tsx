import { useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { LuPlus } from "react-icons/lu";
import axiosInstance from "@/lib/axios/axios";
import { showErrorToast } from "@/lib/utils";
import toast from "react-hot-toast";
import type { ErrorToastType, UserType } from "@/types/types";

type AddContactModalPropsType = {
  setContactList: Dispatch<SetStateAction<UserType[]>>;
};

const AddContactModal: React.FC<AddContactModalPropsType> = (props) => {
  const { setContactList } = props;
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddContact = async () => {
    if (!email.trim()) {
      toast.error("Please enter an email");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/connect/chats/contactadd", {
        email,
      });

      toast.success(data.message);
      switch (data.status) {
        case "ADDED":
          setContactList(() => {
            return data.contacts;
          });
          setEmail("");
          setOpen(false);
          break;
      }
    } catch (err) {
      showErrorToast(err as ErrorToastType);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="absolute bottom-4 right-4 rounded-full w-10 h-10 p-0 shadow-lg hover:scale-105 transition-transform cursor-pointer"
        >
          <LuPlus size={22} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
          <DialogDescription>
            Enter the email address of the person you want to chat with.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter user email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            onClick={handleAddContact}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white hover:cursor-pointer"
          >
            {loading ? "Adding..." : "Add Contact"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddContactModal;
