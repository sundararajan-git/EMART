import { FaUsersRectangle } from "react-icons/fa6";

const ContactIntro = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full text-muted-foreground">
      <FaUsersRectangle className="text-6xl mb-4 text-primary" />
      <h2 className="text-xl font-semibold mb-2">
        Select a contact to view details
      </h2>
      <p className="text-sm max-w-sm">
        Click any contact from the sidebar to see their profile, start a chat,
        or make a call.
      </p>
    </div>
  );
};

export default ContactIntro;
