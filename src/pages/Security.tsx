import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Users, FileText, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

const securityMetrics = {
  overview: [
    { title: "Security Score", value: "94%", status: "excellent", icon: Shield },
    { title: "Failed Login Attempts", value: "3", status: "low", icon: Lock },
    { title: "Document Integrity", value: "100%", status: "secure", icon: FileText },
    { title: "Last Security Scan", value: "2 hours ago", status: "recent", icon: Eye }
  ],
  threats: [
    {
      id: "1", 
      type: "Suspicious Login",
      description: "Multiple failed login attempts from IP 192.168.1.100",
      severity: "medium",
      timestamp: "2 hours ago",
      status: "monitoring"
    },
    {
      id: "2",
      type: "Document Access",
      description: "Unusual document access pattern detected for user J.Smith",
      severity: "low", 
      timestamp: "4 hours ago",
      status: "resolved"
    },
    {
      id: "3",
      type: "File Upload",
      description: "Large file upload detected outside business hours",
      severity: "low",
      timestamp: "1 day ago", 
      status: "cleared"
    }
  ],
  compliance: [
    { standard: "GDPR", status: "compliant", lastAudit: "Jan 2024", score: 98 },
    { standard: "SOX", status: "compliant", lastAudit: "Dec 2023", score: 95 },
    { standard: "HIPAA", status: "compliant", lastAudit: "Feb 2024", score: 97 },
    { standard: "ISO 27001", status: "review", lastAudit: "Mar 2024", score: 92 }
  ],
  accessLogs: [
    {
      user: "John Smith",
      action: "Document Downloaded", 
      document: "Financial Report Q3",
      timestamp: "10 minutes ago",
      ip: "192.168.1.45"
    },
    {
      user: "Sarah Johnson",
      action: "Document Submitted",
      document: "Contract Amendment", 
      timestamp: "25 minutes ago",
      ip: "192.168.1.67"
    },
    {
      user: "Michael Chen", 
      action: "Document Approved",
      document: "Policy Update v2.1",
      timestamp: "1 hour ago",
      ip: "192.168.1.23"
    },
    {
      user: "Emily Rodriguez",
      action: "Bulk Export",
      document: "Multiple Documents (15)",
      timestamp: "2 hours ago", 
      ip: "192.168.1.89"
    }
  ]
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high": return "destructive";
    case "medium": return "warning"; 
    case "low": return "secondary";
    default: return "secondary";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "compliant": return "success";
    case "review": return "warning";
    case "non-compliant": return "destructive";
    default: return "secondary";
  }
};

export default function Security() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Shield className="h-8 w-8" />
          Security & Compliance
        </h1>
        <p className="text-muted-foreground text-lg">
          Monitor document security, track compliance, and manage access controls
        </p>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityMetrics.overview.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <Badge 
                    variant={metric.status === "excellent" || metric.status === "secure" ? "success" : "secondary"}
                    className="text-xs"
                  >
                    {metric.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Security Threats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <span className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Security Alerts
              </span>
              <Badge variant="secondary" className="text-xs">
                {securityMetrics.threats.length} active
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {securityMetrics.threats.map((threat) => (
              <Alert key={threat.id}>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="ml-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{threat.type}</span>
                      <Badge variant={getSeverityColor(threat.severity) as any} className="text-xs">
                        {threat.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{threat.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span>{threat.timestamp}</span>
                      <Badge variant="outline" className="text-xs">
                        {threat.status}
                      </Badge>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>

        {/* Compliance Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Compliance Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {securityMetrics.compliance.map((compliance, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{compliance.standard}</span>
                  <Badge variant={getStatusColor(compliance.status) as any} className="text-xs">
                    {compliance.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <Progress value={compliance.score} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{compliance.score}% compliant</span>
                    <span>Last audit: {compliance.lastAudit}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Access Logs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Recent Access Logs
            </CardTitle>
            <Button variant="outline" size="sm">
              View All Logs
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityMetrics.accessLogs.map((log, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-background rounded-lg">
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{log.user}</p>
                    <p className="text-sm text-muted-foreground">{log.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{log.document}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{log.timestamp}</span>
                    <span>•</span>
                    <span>{log.ip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Shield className="mr-2 h-4 w-4" />
              Run Security Scan
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Lock className="mr-2 h-4 w-4" />
              Review Access Controls
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Generate Audit Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Firewall</span>
              <Badge variant="success" className="text-xs">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Encryption</span>
              <Badge variant="success" className="text-xs">AES-256</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Backup</span>
              <Badge variant="success" className="text-xs">Latest: 2h ago</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Two-Factor Auth</span>
                <Badge variant="success" className="text-xs">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Session Timeout</span>
                <span className="text-sm text-muted-foreground">30 min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Password Policy</span>
                <Badge variant="success" className="text-xs">Strong</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}