"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AddContactModel from "./components/AddContactModel";
import { useEffect, useState } from "react";
import { showErrorToast } from "@/lib/utils";
import type { ErrorToastType } from "@/types/types";
import axiosInstance from "@/lib/axios/axios";
import Spinner from "../Spinner";
import type { AppDisapatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedContact,
  updateContactList,
} from "@/store/slices/contactSlice";

const ContactList = () => {
  const dispatch = useDispatch<AppDisapatch>();
  const { contactList } = useSelector((state: RootState) => state.contact);
  const [loading, setLoading] = useState(true);

  const getContacts = async (signal: AbortSignal) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/connect/chats/contacts", {
        signal,
      });
      switch (data.status) {
        case "FETCHED":
          dispatch(updateContactList(data.contacts));
          break;
      }
    } catch (err) {
      showErrorToast(err as ErrorToastType);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getContacts(controller.signal);
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="w-full h-full">
      {loading ? (
        <div className="w-full h-full">
          <Spinner isLoadingText={true} />
        </div>
      ) : (
        <>
          {contactList.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between p-3 hover:bg-muted cursor-pointer "
              onClick={() => {
                dispatch(setSelectedContact(user));
              }}
            >
              <div className="flex items-center space-x-3 w-full">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.profilePic} />
                    <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <p className="font-medium text-sm">{user.username}</p>
                  <p className="text-xs text-muted-foreground truncate w-[150px]">
                    {user.bio ?? "NA"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      <AddContactModel />
    </div>
  );
};
export default ContactList;
