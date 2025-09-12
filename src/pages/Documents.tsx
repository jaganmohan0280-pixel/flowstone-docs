import { useState } from "react";
import { Search, Filter, SortDesc } from "lucide-react";
import { DocumentCard, Document } from "@/components/documents/DocumentCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Extended mock data for documents page
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
  },
  {
    id: "5",
    name: "IT Security Policy Draft",
    type: "policy",
    department: "IT",
    submittedBy: "Mark Stevens",
    submittedAt: "5 days ago",
    lastUpdated: "3 days ago",
    status: "rejected",
    priority: "medium",
    description: "Updated security policy draft incorporating new cybersecurity guidelines and procedures.",
    reviewer: "Lisa Chang",
    fileSize: "1.1 MB"
  },
  {
    id: "6",
    name: "Marketing Campaign Proposal",
    type: "application",
    department: "Marketing",
    submittedBy: "Jessica Wilson",
    submittedAt: "1 week ago",
    lastUpdated: "5 days ago",
    status: "approved",
    priority: "low",
    description: "Q4 marketing campaign proposal targeting new customer segments with digital-first approach.",
    reviewer: "Daniel Park",
    fileSize: "3.7 MB"
  }
];

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [documents] = useState<Document[]>(mockDocuments);

  // Filter documents based on search and filters
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
    const matchesType = typeFilter === "all" || doc.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleDocumentAction = (action: string, document: Document) => {
    console.log(`Action: ${action} on document:`, document.name);
    // Handle document actions here
  };

  const getStatusCount = (status: string) => {
    if (status === "all") return documents.length;
    return documents.filter(doc => doc.status === status).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Documents</h1>
        <p className="text-muted-foreground text-lg">
          Track and manage your submitted documents
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-[300px]"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status ({getStatusCount("all")})</SelectItem>
              <SelectItem value="pending">Pending ({getStatusCount("pending")})</SelectItem>
              <SelectItem value="under-review">Under Review ({getStatusCount("under-review")})</SelectItem>
              <SelectItem value="approved">Approved ({getStatusCount("approved")})</SelectItem>
              <SelectItem value="rejected">Rejected ({getStatusCount("rejected")})</SelectItem>
              <SelectItem value="escalated">Escalated ({getStatusCount("escalated")})</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder="Document type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="invoice">Invoice</SelectItem>
              <SelectItem value="policy">Policy</SelectItem>
              <SelectItem value="report">Report</SelectItem>
              <SelectItem value="application">Application</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
          <Button variant="outline" size="sm">
            <SortDesc className="mr-2 h-4 w-4" />
            Sort
          </Button>
        </div>
      </div>

      {/* Status Summary */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">
          Total: {documents.length}
        </Badge>
        <Badge variant="pending">
          Pending: {getStatusCount("pending")}
        </Badge>
        <Badge variant="warning">
          Under Review: {getStatusCount("under-review")}
        </Badge>
        <Badge variant="success">
          Approved: {getStatusCount("approved")}
        </Badge>
        <Badge variant="destructive">
          Rejected: {getStatusCount("rejected")}
        </Badge>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((document) => (
            <DocumentCard
              key={document.id}
              document={document}
              onAction={handleDocumentAction}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-3">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No documents found</h3>
              <p className="text-muted-foreground max-w-sm">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}