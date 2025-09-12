import { useState } from "react";
import { Archive as ArchiveIcon, Search, Download, Calendar, Filter } from "lucide-react";
import { DocumentCard, Document } from "@/components/documents/DocumentCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock archived documents
const archivedDocuments: Document[] = [
  {
    id: "arch-1",
    name: "Q2 Financial Report 2024",
    type: "report",
    department: "Finance",
    submittedBy: "Emily Rodriguez",
    submittedAt: "3 months ago",
    lastUpdated: "3 months ago",
    status: "approved",
    priority: "high",
    description: "Quarterly financial performance report with revenue analysis and projections for Q2 2024.",
    reviewer: "Robert Kim",
    fileSize: "4.8 MB"
  },
  {
    id: "arch-2",
    name: "Marketing Strategy 2024",
    type: "application",
    department: "Marketing",
    submittedBy: "Jessica Wilson",
    submittedAt: "4 months ago",
    lastUpdated: "4 months ago", 
    status: "approved",
    priority: "medium",
    description: "Comprehensive marketing strategy for 2024 including budget allocation and campaign planning.",
    reviewer: "Daniel Park",
    fileSize: "6.1 MB"
  },
  {
    id: "arch-3",
    name: "IT Security Policy v2.1",
    type: "policy",
    department: "IT", 
    submittedBy: "Mark Stevens",
    submittedAt: "6 months ago",
    lastUpdated: "6 months ago",
    status: "approved",
    priority: "high",
    description: "Updated IT security policy incorporating new cybersecurity guidelines and incident response procedures.",
    reviewer: "Lisa Chang",
    fileSize: "2.3 MB"
  },
  {
    id: "arch-4",
    name: "Annual Compliance Report 2023",
    type: "report",
    department: "Compliance",
    submittedBy: "Lisa Chang",
    submittedAt: "8 months ago",
    lastUpdated: "8 months ago",
    status: "approved",
    priority: "urgent",
    description: "Comprehensive annual compliance report covering all regulatory requirements and audit findings.",
    reviewer: "Michael Chen", 
    fileSize: "12.5 MB"
  },
  {
    id: "arch-5",
    name: "Employee Training Manual v1.0",
    type: "policy",
    department: "HR",
    submittedBy: "David Lee",
    submittedAt: "1 year ago",
    lastUpdated: "1 year ago",
    status: "approved",
    priority: "medium", 
    description: "Comprehensive employee training manual covering onboarding, safety procedures, and company policies.",
    reviewer: "Sarah Mitchell",
    fileSize: "8.7 MB"
  }
];

const archiveStats = [
  { label: "Total Archived", value: 156, period: "All time" },
  { label: "This Year", value: 89, period: "2024" },
  { label: "Last Month", value: 12, period: "August" },
  { label: "Storage Used", value: "2.1 GB", period: "Total" }
];

export default function Archive() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [documents] = useState<Document[]>(archivedDocuments);

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "all" || doc.type === typeFilter;
    const matchesDepartment = departmentFilter === "all" || doc.department === departmentFilter;
    
    return matchesSearch && matchesType && matchesDepartment;
  });

  const handleDocumentAction = (action: string, document: Document) => {
    console.log(`Archive action: ${action} on document:`, document.name);
    // Handle archive-specific actions like restore, permanent delete, etc.
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <ArchiveIcon className="h-8 w-8" />
          Document Archive
        </h1>
        <p className="text-muted-foreground text-lg">
          Access and manage your archived documents and historical records
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {archiveStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm font-medium">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.period}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search Archive</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="contract">Contracts</SelectItem>
                <SelectItem value="invoice">Invoices</SelectItem>
                <SelectItem value="policy">Policies</SelectItem>
                <SelectItem value="report">Reports</SelectItem>
                <SelectItem value="application">Applications</SelectItem>
              </SelectContent>
            </Select>

            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Legal">Legal</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="HR">Human Resources</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Compliance">Compliance</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredDocuments.length} documents found
            </p>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Advanced Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export List
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((document) => (
            <DocumentCard
              key={document.id}
              document={document}
              onAction={handleDocumentAction}
              showActions={false}
            />
          ))
        ) : (
          <div className="col-span-full">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center space-y-3">
                  <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <ArchiveIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No archived documents found</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}