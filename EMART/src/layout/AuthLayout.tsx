import { useTheme } from "@/components/shadcn/theme-provider";
import { Button } from "@/components/ui/button";
import { LuMoonStar, LuSunMedium } from "react-icons/lu";
import { SiSinglestore } from "react-icons/si";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex gap-2 justify-between">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md">
              <SiSinglestore className="size-8 text-primary" />
            </div>
            <span className="font-semibold text-2xl">EMart</span>
          </a>
          <Button
            variant="ghost"
            className="cursor-pointer rounded-full hover:bg-transparent dark:hover:bg-transparent"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <LuSunMedium className="size-5" />
            ) : (
              <LuMoonStar className="size-4" />
            )}
          </Button>
        </div>
        <Outlet />
      </div>
      <div className="bg-muted dark:bg-teal-950 relative hidden lg:flex items-center justify-center h-full">
        <img
          src="https://res.cloudinary.com/dlwe2wlwl/image/upload/v1759541895/authSidebar_cc7rtk.png"
          alt="signup img"
          loading="eager"
          className="absolute bottom-0 inset-0 m-auto h-full w-full object-contain dark:brightness-[0.7] brightness-[0.9]"
        />
      </div>
    </div>
  );
};
export default AuthLayout;
