import { useState } from "react";
import { Bell, Check, X, Eye, Trash2, Filter, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "approval" | "rejection" | "escalation" | "submission" | "reminder" | "system";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: "low" | "medium" | "high";
  document?: string;
  user?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "approval",
    title: "Document Approved",
    message: "Your contract 'Service Agreement 2024' has been approved by the Legal department.",
    timestamp: "10 minutes ago",
    isRead: false,
    priority: "medium",
    document: "Service Agreement 2024",
    user: "Michael Chen"
  },
  {
    id: "2",
    type: "submission",
    title: "New Document Submitted",
    message: "A new invoice has been submitted and requires your review.",
    timestamp: "25 minutes ago",
    isRead: false,
    priority: "high",
    document: "Vendor Invoice #INV-2024-0915",
    user: "Alex Thompson"
  },
  {
    id: "3",
    type: "escalation",
    title: "Document Escalated",
    message: "Policy document 'Employee Handbook v3.2' has been escalated to senior management.",
    timestamp: "1 hour ago",
    isRead: true,
    priority: "high",
    document: "Employee Handbook v3.2",
    user: "David Lee"
  },
  {
    id: "4",
    type: "rejection",
    title: "Document Rejected",
    message: "Your travel expense form has been rejected. Please review the comments and resubmit.",
    timestamp: "2 hours ago",
    isRead: false,
    priority: "medium",
    document: "Travel Expense Form #TE-240915",
    user: "Jennifer Walsh"
  },
  {
    id: "5",
    type: "reminder",
    title: "Review Reminder",
    message: "You have 3 documents pending review that are approaching their deadline.",
    timestamp: "3 hours ago",
    isRead: true,
    priority: "low"
  },
  {
    id: "6",
    type: "system",
    title: "System Maintenance",
    message: "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM EST.",
    timestamp: "1 day ago",
    isRead: true,
    priority: "low"
  }
];

const notificationTypes = {
  approval: { icon: Check, color: "text-success", bg: "bg-success-light" },
  rejection: { icon: X, color: "text-destructive", bg: "bg-destructive-light" },
  escalation: { icon: Bell, color: "text-warning", bg: "bg-warning-light" },
  submission: { icon: Eye, color: "text-primary", bg: "bg-primary/10" },
  reminder: { icon: Calendar, color: "text-pending", bg: "bg-pending-light" },
  system: { icon: Bell, color: "text-muted-foreground", bg: "bg-muted" }
};

const priorityColors = {
  low: "text-muted-foreground",
  medium: "text-warning",
  high: "text-destructive"
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filterType, setFilterType] = useState("all");
  const [filterRead, setFilterRead] = useState("all");

  const filteredNotifications = notifications.filter(notification => {
    const typeMatch = filterType === "all" || notification.type === filterType;
    const readMatch = filterRead === "all" || 
      (filterRead === "unread" && !notification.isRead) ||
      (filterRead === "read" && notification.isRead);
    
    return typeMatch && readMatch;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(notification =>
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })));
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleBatchAction = (action: "read" | "delete") => {
    if (action === "read") {
      setNotifications(prev => prev.map(notification =>
        selectedIds.includes(notification.id) ? { ...notification, isRead: true } : notification
      ));
    } else if (action === "delete") {
      setNotifications(prev => prev.filter(notification => !selectedIds.includes(notification.id)));
    }
    setSelectedIds([]);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredNotifications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredNotifications.map(n => n.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-sm">
                {unreadCount} unread
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground text-lg">
            Stay updated with document status changes and system alerts
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
            Mark All as Read
          </Button>
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => handleBatchAction("read")}>
                Mark Selected as Read
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleBatchAction("delete")}>
                Delete Selected
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={selectedIds.length === filteredNotifications.length && filteredNotifications.length > 0}
            onCheckedChange={handleSelectAll}
          />
          <span className="text-sm text-muted-foreground">Select all</span>
        </div>
        
        <div className="flex gap-3">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="approval">Approvals</SelectItem>
              <SelectItem value="rejection">Rejections</SelectItem>
              <SelectItem value="escalation">Escalations</SelectItem>
              <SelectItem value="submission">Submissions</SelectItem>
              <SelectItem value="reminder">Reminders</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterRead} onValueChange={setFilterRead}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="read">Read</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => {
            const typeConfig = notificationTypes[notification.type];
            const Icon = typeConfig.icon;
            
            return (
              <Card 
                key={notification.id}
                className={cn(
                  "transition-all hover:shadow-card cursor-pointer",
                  !notification.isRead && "bg-primary/5 border-primary/20"
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={selectedIds.includes(notification.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedIds(prev => [...prev, notification.id]);
                        } else {
                          setSelectedIds(prev => prev.filter(id => id !== notification.id));
                        }
                      }}
                    />

                    <div className={cn(
                      "p-2 rounded-lg flex-shrink-0",
                      typeConfig.bg
                    )}>
                      <Icon className={cn("h-5 w-5", typeConfig.color)} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{notification.title}</h3>
                            {!notification.isRead && (
                              <div className="h-2 w-2 bg-primary rounded-full"></div>
                            )}
                            <Badge 
                              variant="outline" 
                              className={cn("text-xs", priorityColors[notification.priority])}
                            >
                              {notification.priority}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {notification.message}
                          </p>
                          {notification.document && (
                            <p className="text-sm font-medium text-primary">
                              Document: {notification.document}
                            </p>
                          )}
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{notification.timestamp}</span>
                            {notification.user && (
                              <>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <Avatar className="h-4 w-4">
                                    <AvatarFallback className="text-xs">
                                      {notification.user.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span>{notification.user}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {!notification.isRead && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDelete(notification.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center space-y-3">
                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <Bell className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No notifications</h3>
                <p className="text-muted-foreground max-w-sm">
                  You're all caught up! No notifications match your current filters.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}