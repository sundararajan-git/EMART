import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/shadcn/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AdvancedChat from "@/components/app/AdvancedChat";

const AppLayout = () => {
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
