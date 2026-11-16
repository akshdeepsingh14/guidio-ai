import { useState } from "react";
import { Outlet } from "react-router";
import { AppHeader } from "@/components/app-header";
import { DesktopSidebar, MobileSidebar } from "@/components/app-sidebar";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>

      {/* Fixed sidebar on large screens, drawer on smaller screens */}
      <DesktopSidebar />
      <MobileSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

      <div className="flex min-h-screen min-w-0 flex-col lg:pl-64">
        <AppHeader onMenuClick={() => setSidebarOpen(true)} />

        <main id="main-content" className="flex-1">
          <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;