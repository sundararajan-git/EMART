import { useTheme } from "@/components/shadcn/theme-provider";
import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";
import { LuMoonStar, LuSunMedium } from "react-icons/lu";
import { FaHashnode } from "react-icons/fa6";

const AuthLayout = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="min-h-svh flex flex-col">
      <div className="flex gap-2 justify-between p-8">
        <a href="#" className="flex items-center gap-2 font-medium">
          <div className="flex items-center justify-center rounded-md">
            <FaHashnode className="size-8 text-primary" />
          </div>
          <span className="font-semibold text-2xl">NodePost</span>
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
  );
};
export default AuthLayout;
