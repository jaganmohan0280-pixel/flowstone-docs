import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
  variant?: "default" | "success" | "warning" | "destructive" | "pending";
}

const variantStyles = {
  default: "bg-gradient-card border-border",
  success: "bg-success-light border-success/20",
  warning: "bg-warning-light border-warning/20", 
  destructive: "bg-destructive-light border-destructive/20",
  pending: "bg-pending-light border-pending/20"
};

const iconStyles = {
  default: "text-primary bg-primary/10",
  success: "text-success bg-success/10",
  warning: "text-warning bg-warning/10",
  destructive: "text-destructive bg-destructive/10", 
  pending: "text-pending bg-pending/10"
};

export function StatsCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend,
  variant = "default"
}: StatsCardProps) {
  return (
    <Card className={cn("transition-all hover:shadow-card", variantStyles[variant])}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className={cn(
            "p-2 rounded-lg",
            iconStyles[variant]
          )}>
            <Icon className="h-5 w-5" />
          </div>
          {trend && (
            <div className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              trend.isPositive 
                ? "text-success bg-success/10" 
                : "text-destructive bg-destructive/10"
            )}>
              {trend.isPositive ? "+" : ""}{trend.value}%
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          {trend && (
            <p className="text-xs text-muted-foreground">{trend.label}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}