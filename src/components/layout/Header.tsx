import { Bell, User, Settings, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  onMenuToggle?: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">DM</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-semibold">Document Management</h1>
              <p className="text-sm text-muted-foreground">Enterprise Portal</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                >
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-3 border-b">
                <h4 className="font-medium">Notifications</h4>
                <p className="text-sm text-muted-foreground">You have 3 unread messages</p>
              </div>
              <div className="p-2">
                <div className="space-y-2">
                  <div className="p-2 rounded-lg hover:bg-muted cursor-pointer">
                    <p className="text-sm font-medium">Document Approved</p>
                    <p className="text-xs text-muted-foreground">Contract #2024-001 has been approved</p>
                  </div>
                  <div className="p-2 rounded-lg hover:bg-muted cursor-pointer">
                    <p className="text-sm font-medium">Pending Review</p>
                    <p className="text-xs text-muted-foreground">Invoice #INV-240912 needs your attention</p>
                  </div>
                  <div className="p-2 rounded-lg hover:bg-muted cursor-pointer">
                    <p className="text-sm font-medium">Escalation Required</p>
                    <p className="text-xs text-muted-foreground">Policy document requires escalation</p>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="p-2">
                <p className="text-sm font-medium">John Smith</p>
                <p className="text-xs text-muted-foreground">Department Manager</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}