import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/shadcn/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDisapatch, RootState } from "@/store/store";
import { updateRoute } from "@/store/slices/sidebarSlice";

const AppLayout = () => {
  const dispatch = useDispatch<AppDisapatch>();
  const { navRoute } = useSelector((state: RootState) => state.sidebar);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    const active = navRoute.find(
      (i) => i.url === (path === "/" ? "/chats" : path)
    );
    dispatch(updateRoute(active));
  }, []);

  return (
    <>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "350px",
          } as React.CSSProperties
        }
        className="w-full h-full"
      >
        <AppSidebar />
        <SidebarInset className="overflow-hidden">
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};
export default AppLayout;
