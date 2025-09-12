import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";

export function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <Header onMenuToggle={toggleSidebar} />
      
      <div className="flex">
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        
        <main className={cn(
          "flex-1 transition-all duration-300 pt-4",
          sidebarCollapsed ? "ml-16" : "ml-64"
        )}>
          <div className="container max-w-7xl mx-auto px-4 md:px-6 pb-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}