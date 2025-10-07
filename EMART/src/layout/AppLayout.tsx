import { Outlet } from "react-router-dom";
import NavBar from "@/components/app/common/NavBar";
import Footer from "@/components/app/common/Footer";

const AppLayout = () => {
  return (
    <div className="flex flex-col items-start justify-between min-h-screen max-h-full w-full">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
