import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  Upload, 
  FileText, 
  Users, 
  Bell, 
  Archive, 
  BarChart3,
  ChevronLeft,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Submit Document", href: "/submit", icon: Upload },
  { name: "My Documents", href: "/documents", icon: FileText },
  { name: "Department Queue", href: "/department", icon: Users },
  { name: "Notifications", href: "/notifications", icon: Bell, badge: 5 },
  { name: "Archive", href: "/archive", icon: Archive },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Security", href: "/security", icon: Shield },
];

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <aside className={cn(
      "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] bg-card border-r transition-all duration-300 shadow-sm",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          {!isCollapsed && (
            <h2 className="text-sm font-medium text-muted-foreground">Navigation</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className={cn(
              "h-4 w-4 transition-transform",
              isCollapsed && "rotate-180"
            )} />
          </Button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                  isActive && "bg-primary text-primary-foreground shadow-sm",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <Icon className={cn(
                  "h-5 w-5 flex-shrink-0",
                  isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-accent-foreground"
                )} />
                {!isCollapsed && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <Badge 
                        variant={isActive ? "secondary" : "outline"} 
                        className="h-5 text-xs"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
                {isCollapsed && item.badge && (
                  <Badge 
                    variant="destructive"
                    className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    {item.badge}
                  </Badge>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t p-4">
          <div className={cn(
            "text-center",
            isCollapsed ? "px-1" : "px-3"
          )}>
            {!isCollapsed ? (
              <div>
                <p className="text-xs font-medium text-muted-foreground">System Status</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success animate-pulse"></div>
                  <span className="text-xs text-success">All systems operational</span>
                </div>
              </div>
            ) : (
              <div className="h-2 w-2 rounded-full bg-success animate-pulse mx-auto"></div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}