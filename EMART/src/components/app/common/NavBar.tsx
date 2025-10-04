import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../shadcn/theme-provider";
import { SiSinglestore } from "react-icons/si";
import { GrocerySearch } from "./GrocerySearch";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { setUser } from "@/store/slices/userSlice";
import type { userType } from "@/types/types";

const NavBar = () => {
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isVerified, profilePic } = useSelector(
    (state: RootState) => state.user
  );

  console.log(isVerified);

  const logOutHandler = () => {
    dispatch(setUser({ value: {} as userType }));
    localStorage.setItem("jwt", JSON.stringify(null));
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
          <IoCartOutline className="text-2xl" />
          {true ? (
            <Badge
              variant="default"
              className="rounded-full w-5 h-5 bg-green-600 absolute -top-2 left-5"
            >
              0
            </Badge>
          ) : null}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src={profilePic} className="cursor-pointer" />
              <AvatarFallback className="cursor-pointer">UR</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              {isVerified && <DropdownMenuItem>Profile</DropdownMenuItem>}
              <DropdownMenuItem className="sm:hidden">Search</DropdownMenuItem>
              <DropdownMenuItem className=" sm:hidden">Cart</DropdownMenuItem>
              {isVerified && <DropdownMenuItem>Orders</DropdownMenuItem>}
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
              {isVerified && <DropdownMenuItem>Settings</DropdownMenuItem>}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {isVerified ? (
              <DropdownMenuItem onClick={logOutHandler}>
                Log out
              </DropdownMenuItem>
            ) : (
              <>
                <DropdownMenuItem onClick={() => navigate("/signup")}>
                  Create Account
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/login")}>
                  Log in
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
export default NavBar;
