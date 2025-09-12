import { useState } from "react";
import { 
  FileText, 
  Calendar, 
  User, 
  MoreHorizontal,
  Download,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface Document {
  id: string;
  name: string;
  type: string;
  department: string;
  submittedBy: string;
  submittedAt: string;
  lastUpdated: string;
  status: "pending" | "approved" | "rejected" | "escalated" | "under-review";
  priority: "low" | "medium" | "high" | "urgent";
  description?: string;
  reviewer?: string;
  fileSize: string;
}

interface DocumentCardProps {
  document: Document;
  onAction?: (action: string, document: Document) => void;
  showActions?: boolean;
}

const statusConfig = {
  pending: {
    icon: Clock,
    variant: "pending" as const,
    label: "Pending Review",
  },
  "under-review": {
    icon: Eye,
    variant: "warning" as const,
    label: "Under Review",
  },
  approved: {
    icon: CheckCircle,
    variant: "success" as const,
    label: "Approved",
  },
  rejected: {
    icon: XCircle,
    variant: "destructive" as const,
    label: "Rejected",
  },
  escalated: {
    icon: ArrowUpRight,
    variant: "warning" as const,
    label: "Escalated",
  },
};

const priorityConfig = {
  low: { color: "text-muted-foreground", bg: "bg-muted" },
  medium: { color: "text-pending", bg: "bg-pending-light" },
  high: { color: "text-warning", bg: "bg-warning-light" },
  urgent: { color: "text-destructive", bg: "bg-destructive-light" },
};

export function DocumentCard({ document, onAction, showActions = true }: DocumentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const status = statusConfig[document.status];
  const StatusIcon = status.icon;
  const priority = priorityConfig[document.priority];

  const handleAction = (action: string) => {
    onAction?.(action, document);
  };

  return (
    <Card 
      className={cn(
        "transition-all duration-200 hover:shadow-card cursor-pointer group",
        isHovered && "shadow-elevated"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                  {document.name}
                </h3>
                <div className={cn(
                  "px-1.5 py-0.5 rounded text-xs font-medium capitalize",
                  priority.color,
                  priority.bg
                )}>
                  {document.priority}
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="capitalize">{document.type}</span>
                <span>•</span>
                <span>{document.fileSize}</span>
                <span>•</span>
                <span>{document.department}</span>
              </div>
            </div>
          </div>

          {showActions && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleAction("view")}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("download")}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {document.status === "pending" && (
                  <>
                    <DropdownMenuItem 
                      onClick={() => handleAction("approve")}
                      className="text-success focus:text-success"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleAction("reject")}
                      className="text-destructive focus:text-destructive"
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAction("escalate")}>
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      Escalate
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {document.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {document.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StatusIcon className={cn(
                "h-4 w-4",
                status.variant === "success" && "text-success",
                status.variant === "destructive" && "text-destructive",
                status.variant === "warning" && "text-warning", 
                status.variant === "pending" && "text-pending"
              )} />
              <Badge variant={status.variant} className="text-xs">
                {status.label}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{document.submittedAt}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">
                  {document.submittedBy.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">
                by {document.submittedBy}
              </span>
            </div>

            {document.reviewer && (
              <div className="text-xs text-muted-foreground">
                Reviewer: {document.reviewer}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}