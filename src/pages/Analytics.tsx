import { BarChart3, TrendingUp, Users, FileText, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const analyticsData = {
  overview: [
    { title: "Total Documents", value: 1234, change: "+12%", trend: "up" },
    { title: "Approval Rate", value: "87%", change: "+3%", trend: "up" },
    { title: "Avg Processing Time", value: "2.3 days", change: "-15%", trend: "down" },
    { title: "Active Users", value: 89, change: "+8%", trend: "up" }
  ],
  departments: [
    { name: "Legal", pending: 5, approved: 45, rejected: 2, total: 52 },
    { name: "Finance", pending: 8, approved: 67, rejected: 5, total: 80 },
    { name: "HR", pending: 3, approved: 23, rejected: 1, total: 27 },
    { name: "IT", pending: 4, approved: 18, rejected: 2, total: 24 },
    { name: "Marketing", pending: 2, approved: 15, rejected: 0, total: 17 }
  ],
  documentTypes: [
    { type: "Contracts", count: 45, percentage: 23 },
    { type: "Invoices", count: 67, percentage: 34 },
    { type: "Reports", count: 32, percentage: 16 },
    { type: "Policies", count: 28, percentage: 14 },
    { type: "Applications", count: 25, percentage: 13 }
  ],
  monthlyTrends: [
    { month: "Jan", submitted: 85, approved: 78, rejected: 7 },
    { month: "Feb", submitted: 92, approved: 84, rejected: 8 },
    { month: "Mar", submitted: 78, approved: 71, rejected: 7 },
    { month: "Apr", submitted: 105, approved: 95, rejected: 10 },
    { month: "May", submitted: 118, approved: 108, rejected: 10 },
    { month: "Jun", submitted: 134, approved: 122, rejected: 12 }
  ]
};

export default function Analytics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <BarChart3 className="h-8 w-8" />
          Analytics & Insights
        </h1>
        <p className="text-muted-foreground text-lg">
          Track document management performance and system usage metrics
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.overview.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {index === 0 && <FileText className="h-5 w-5 text-primary" />}
                  {index === 1 && <CheckCircle className="h-5 w-5 text-success" />}
                  {index === 2 && <Clock className="h-5 w-5 text-warning" />}
                  {index === 3 && <Users className="h-5 w-5 text-accent" />}
                </div>
                <Badge 
                  variant={stat.trend === "up" ? "success" : "destructive"}
                  className="text-xs"
                >
                  {stat.change}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Department Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Department Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analyticsData.departments.map((dept) => (
              <div key={dept.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{dept.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {dept.total} documents
                  </span>
                </div>
                <div className="space-y-1">
                  <Progress value={(dept.approved / dept.total) * 100} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{dept.approved} approved</span>
                    <span>{dept.pending} pending</span>
                    <span>{dept.rejected} rejected</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Document Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Document Types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analyticsData.documentTypes.map((docType) => (
              <div key={docType.type} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: `hsl(${docType.percentage * 5}, 70%, 50%)` }}
                  ></div>
                  <span className="font-medium">{docType.type}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">{docType.count}</div>
                  <div className="text-xs text-muted-foreground">{docType.percentage}%</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Monthly Submission Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-6 gap-4">
              {analyticsData.monthlyTrends.map((month) => (
                <div key={month.month} className="text-center space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    {month.month}
                  </div>
                  <div className="space-y-1">
                    <div 
                      className="bg-primary rounded-t h-16 flex items-end justify-center text-xs text-primary-foreground font-medium"
                      style={{ height: `${(month.submitted / 134) * 64}px` }}
                    >
                      {month.submitted}
                    </div>
                    <div className="text-xs text-muted-foreground">Submitted</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-center gap-6 pt-4 border-t">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded"></div>
                <span className="text-sm">Submitted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-success rounded"></div>
                <span className="text-sm">Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-destructive rounded"></div>
                <span className="text-sm">Rejected</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Jennifer Walsh</span>
                <span className="text-sm font-bold">95% approval rate</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Michael Chen</span>
                <span className="text-sm font-bold">1.2 day avg time</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Sarah Mitchell</span>
                <span className="text-sm font-bold">98 docs reviewed</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="p-2 bg-warning-light rounded-lg">
                <p className="text-sm font-medium">Document Rejections</p>
                <p className="text-xs text-muted-foreground">Up 5% from last month</p>
              </div>
              <div className="p-2 bg-pending-light rounded-lg">
                <p className="text-sm font-medium">Processing Time</p>
                <p className="text-xs text-muted-foreground">IT dept. averaging 4.2 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Uptime</span>
                <Badge variant="success" className="text-xs">99.9%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Storage Usage</span>
                <span className="text-sm font-medium">2.1 GB / 10 GB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Sessions</span>
                <span className="text-sm font-medium">89 users</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}