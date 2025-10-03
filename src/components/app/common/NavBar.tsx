import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../shadcn/theme-provider";
import { SiSinglestore } from "react-icons/si";
import { GrocerySearch } from "./GrocerySearch";

const NavBar = () => {
  const { setTheme } = useTheme();
  const navigate = useNavigate();

  const logOutHandler = () => {
    const auth = { email: "", password: "", isLogin: false };
    localStorage.setItem("auth", JSON.stringify(auth));
    navigate("/");
  };
  return (
    <div className="flex gap-2 items-center justify-between w-full p-2 sm:p-4 sticky top-0 bg-background z-50">
      <div
        className="text-xl flex items-center justify-center gap-3 font-semibold hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        <SiSinglestore className="size-8 text-primary" />
        EMart
      </div>
      <GrocerySearch />
      <div className="flex items-center gap-8 pe-5">
        <div
          className="cursor-pointer hidden sm:flex flex-col items-center gap-1 relative"
          onClick={() => navigate("/cart")}
        >
          <HiOutlineShoppingBag className="text-xl" />
          <span className="text-xs">Cart</span>
          <Badge
            variant="default"
            className="rounded-full w-5 h-5 bg-green-600 absolute -top-2 left-5"
          >
            2
          </Badge>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png1"
                className="cursor-pointer"
              />
              <AvatarFallback className="cursor-pointer">SR</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem className="sm:hidden">
                Search
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem className=" sm:hidden">
                Cart
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Orders
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logOutHandler}>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
export default NavBar;
