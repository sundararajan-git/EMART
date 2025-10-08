import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SimpleEditor from "@/pages/SimpleEditor";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
        </SidebarInset>
      </SidebarProvider>
      {/* <Outlet /> */}
      <SimpleEditor />
    </div>
  );
};
export default AppLayout;
