import { useState } from "react";
import { CheckCircle, XCircle, ArrowUpRight, MessageCircle, User } from "lucide-react";
import { DocumentCard, Document } from "@/components/documents/DocumentCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

const departmentQueue: Document[] = [
  {
    id: "1",
    name: "Service Contract Agreement 2024",
    type: "contract",
    department: "Legal",
    submittedBy: "Sarah Johnson",
    submittedAt: "2 hours ago",
    lastUpdated: "1 hour ago",
    status: "pending",
    priority: "high",
    description: "Annual service contract renewal with primary vendor including updated terms and conditions. Requires legal review for compliance with new regulations.",
    fileSize: "2.4 MB"
  },
  {
    id: "2",
    name: "Vendor Invoice #INV-2024-0915",
    type: "invoice",
    department: "Finance",
    submittedBy: "Alex Thompson", 
    submittedAt: "4 hours ago",
    lastUpdated: "3 hours ago",
    status: "pending",
    priority: "urgent",
    description: "Large vendor invoice exceeding standard approval limits. Amount: $125,000 for IT infrastructure upgrade.",
    fileSize: "892 KB"
  },
  {
    id: "3",
    name: "Employee Handbook Update v3.2",
    type: "policy",
    department: "HR",
    submittedBy: "David Lee",
    submittedAt: "6 hours ago", 
    lastUpdated: "5 hours ago",
    status: "under-review",
    priority: "medium",
    description: "Updated employee handbook reflecting new remote work policies, benefits structure, and performance review processes.",
    fileSize: "1.8 MB"
  },
  {
    id: "4",
    name: "Data Privacy Compliance Report",
    type: "report",
    department: "Compliance", 
    submittedBy: "Lisa Chang",
    submittedAt: "8 hours ago",
    lastUpdated: "6 hours ago", 
    status: "pending",
    priority: "high",
    description: "Quarterly data privacy compliance report including GDPR compliance status and recommendations.",
    fileSize: "3.1 MB"
  }
];

const reviewStats = [
  { label: "Pending Review", value: 12, color: "text-pending" },
  { label: "Under Review", value: 8, color: "text-warning" },
  { label: "Completed Today", value: 15, color: "text-success" },
  { label: "Escalated", value: 3, color: "text-destructive" }
];

export default function Department() {
  const [activeTab, setActiveTab] = useState("pending");
  const [documents, setDocuments] = useState<Document[]>(departmentQueue);

  const handleDocumentAction = (action: string, document: Document) => {
    switch (action) {
      case "approve":
        setDocuments(prev => prev.map(doc => 
          doc.id === document.id 
            ? { ...doc, status: "approved" as const }
            : doc
        ));
        toast.success(`${document.name} has been approved`);
        break;
        
      case "reject":
        setDocuments(prev => prev.map(doc => 
          doc.id === document.id 
            ? { ...doc, status: "rejected" as const }
            : doc
        ));
        toast.error(`${document.name} has been rejected`);
        break;
        
      case "escalate":
        setDocuments(prev => prev.map(doc => 
          doc.id === document.id 
            ? { ...doc, status: "escalated" as const }
            : doc
        ));
        toast.warning(`${document.name} has been escalated`);
        break;
        
      default:
        console.log(`Action: ${action} on document:`, document.name);
    }
  };

  const getFilteredDocuments = (status: string) => {
    if (status === "all") return documents;
    return documents.filter(doc => doc.status === status);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Department Queue</h1>
        <p className="text-muted-foreground text-lg">
          Review and take action on documents assigned to your department
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {reviewStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Review Queue */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending" className="relative">
            Pending Review
            <Badge variant="pending" className="ml-2 h-5 text-xs">
              {getFilteredDocuments("pending").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="under-review" className="relative">
            Under Review
            <Badge variant="warning" className="ml-2 h-5 text-xs">
              {getFilteredDocuments("under-review").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="approved" className="relative">
            Approved
            <Badge variant="success" className="ml-2 h-5 text-xs">
              {getFilteredDocuments("approved").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="all" className="relative">
            All Documents
            <Badge variant="secondary" className="ml-2 h-5 text-xs">
              {documents.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {getFilteredDocuments(activeTab).length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {getFilteredDocuments(activeTab).map((document) => (
                <DocumentCard
                  key={document.id}
                  document={document}
                  onAction={handleDocumentAction}
                  showActions={document.status === "pending"}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center space-y-3">
                  <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No documents found</h3>
                  <p className="text-muted-foreground max-w-sm">
                    {activeTab === "pending" 
                      ? "Great! No documents are currently pending your review." 
                      : `No documents in ${activeTab} status.`}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Actions Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              Batch Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="success" size="sm" className="w-full">
              Approve Selected
            </Button>
            <Button variant="destructive" size="sm" className="w-full">
              Reject Selected
            </Button>
            <Button variant="warning" size="sm" className="w-full">
              Escalate Selected
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Communication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" size="sm" className="w-full">
              Request Clarification
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              Send to Colleague
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              Schedule Meeting
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-accent" />
              Team Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">3 pending reviews</p>
              </div>
              <Badge variant="success" className="text-xs">Active</Badge>
            </div>
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">SM</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">Sarah Miller</p>
                <p className="text-xs text-muted-foreground">1 pending review</p>
              </div>
              <Badge variant="warning" className="text-xs">Busy</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}