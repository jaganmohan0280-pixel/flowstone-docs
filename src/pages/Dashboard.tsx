import { useState, useEffect } from "react";
import { 
  FileText, 
  Users, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  AlertTriangle,
  Calendar,
  BarChart3
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DocumentCard, Document } from "@/components/documents/DocumentCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data for demonstration
const mockStats = [
  {
    title: "Total Documents",
    value: 1234,
    description: "All submitted documents",
    icon: FileText,
    trend: { value: 12, label: "vs last month", isPositive: true }
  },
  {
    title: "Pending Review",
    value: 23,
    description: "Awaiting department action",
    icon: Clock,
    variant: "pending" as const,
    trend: { value: -8, label: "vs last week", isPositive: false }
  },
  {
    title: "Approved Today",
    value: 15,
    description: "Processed successfully",
    icon: CheckCircle,
    variant: "success" as const,
    trend: { value: 25, label: "vs yesterday", isPositive: true }
  },
  {
    title: "Escalated",
    value: 4,
    description: "Requires attention",
    icon: AlertTriangle,
    variant: "warning" as const
  }
];

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Service Contract Agreement 2024",
    type: "contract",
    department: "Legal",
    submittedBy: "Sarah Johnson",
    submittedAt: "2 hours ago",
    lastUpdated: "1 hour ago",
    status: "under-review",
    priority: "high",
    description: "Annual service contract renewal with primary vendor including updated terms and conditions.",
    reviewer: "Michael Chen",
    fileSize: "2.4 MB"
  },
  {
    id: "2", 
    name: "Employee Handbook Update",
    type: "policy",
    department: "HR",
    submittedBy: "David Lee",
    submittedAt: "4 hours ago",
    lastUpdated: "30 min ago",
    status: "pending",
    priority: "medium",
    description: "Updated employee handbook reflecting new remote work policies and benefits structure.",
    fileSize: "1.8 MB"
  },
  {
    id: "3",
    name: "Q3 Financial Report",
    type: "report", 
    department: "Finance",
    submittedBy: "Emily Rodriguez",
    submittedAt: "1 day ago",
    lastUpdated: "6 hours ago", 
    status: "approved",
    priority: "urgent",
    description: "Quarterly financial performance report with revenue analysis and projections.",
    reviewer: "Robert Kim",
    fileSize: "5.2 MB"
  },
  {
    id: "4",
    name: "Vendor Invoice #INV-2024-0912",
    type: "invoice",
    department: "Finance", 
    submittedBy: "Alex Thompson",
    submittedAt: "3 days ago",
    lastUpdated: "2 days ago",
    status: "escalated",
    priority: "urgent",
    description: "Large vendor invoice requiring additional approval due to amount exceeding standard limits.",
    reviewer: "Jennifer Walsh",
    fileSize: "892 KB"
  }
];

const recentActivity = [
  {
    id: "1",
    type: "approval",
    document: "Marketing Budget 2024",
    user: "Jennifer Walsh",
    time: "10 minutes ago",
    status: "approved"
  },
  {
    id: "2", 
    type: "submission",
    document: "IT Security Policy",
    user: "Mark Stevens", 
    time: "25 minutes ago",
    status: "submitted"
  },
  {
    id: "3",
    type: "escalation",
    document: "Compliance Report Q3",
    user: "Lisa Chang",
    time: "1 hour ago", 
    status: "escalated"
  },
  {
    id: "4",
    type: "rejection",
    document: "Travel Expense Form", 
    user: "David Wilson",
    time: "2 hours ago",
    status: "rejected"
  }
];

export default function Dashboard() {
  const [timeOfDay, setTimeOfDay] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay("morning");
    else if (hour < 17) setTimeOfDay("afternoon");
    else setTimeOfDay("evening");
  }, []);

  const handleDocumentAction = (action: string, document: Document) => {
    console.log(`Action: ${action} on document:`, document.name);
    // Handle document actions here
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Good {timeOfDay}, John 👋
        </h1>
        <p className="text-muted-foreground text-lg">
          Here's what's happening with your documents today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            variant={stat.variant}
            trend={stat.trend}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Documents */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Recent Documents</h2>
              <p className="text-muted-foreground">Latest document submissions and updates</p>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            {mockDocuments.map((document) => (
              <DocumentCard
                key={document.id}
                document={document}
                onAction={handleDocumentAction}
              />
            ))}
          </div>
        </div>

        {/* Activity Feed & Quick Actions */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="default" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Submit Document
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Review Queue
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-3 last:pb-0">
                    <div className="p-1.5 rounded-full bg-muted">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="text-sm font-medium truncate">
                        {activity.document}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">
                          by {activity.user}
                        </p>
                        <Badge 
                          variant={
                            activity.status === "approved" ? "success" :
                            activity.status === "rejected" ? "destructive" :
                            activity.status === "escalated" ? "warning" :
                            "secondary"
                          }
                          className="text-xs"
                        >
                          {activity.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}