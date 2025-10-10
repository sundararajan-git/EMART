import ContactIntro from "./components/ContactIntro";
import ContactProfile from "./components/ContactProfile";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const ContactPage = () => {
  const { selectedUser } = useSelector((state: RootState) => state.contact);

  return (
    <div className="flex-1 flex items-center justify-center overflow-hidden">
      {selectedUser ? (
        <ContactProfile contact={selectedUser} />
      ) : (
        <ContactIntro />
      )}
    </div>
  );
};

export default ContactPage;
