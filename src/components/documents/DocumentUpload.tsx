import { useState, useRef } from "react";
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface UploadedFile {
  id: string;
  file: File;
  status: "uploading" | "success" | "error";
  progress: number;
}

const documentTypes = [
  { value: "contract", label: "Contract" },
  { value: "invoice", label: "Invoice" },
  { value: "policy", label: "Policy Document" },
  { value: "report", label: "Report" },
  { value: "application", label: "Application" },
  { value: "other", label: "Other" },
];

const departments = [
  { value: "legal", label: "Legal Department" },
  { value: "finance", label: "Finance Department" },
  { value: "hr", label: "Human Resources" },
  { value: "operations", label: "Operations" },
  { value: "compliance", label: "Compliance" },
];

export function DocumentUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [documentType, setDocumentType] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFiles = (selectedFiles: File[]) => {
    const newFiles: UploadedFile[] = selectedFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      status: "uploading",
      progress: 0
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach(uploadedFile => {
      const interval = setInterval(() => {
        setFiles(prev => prev.map(f => {
          if (f.id === uploadedFile.id) {
            const newProgress = f.progress + Math.random() * 20;
            if (newProgress >= 100) {
              clearInterval(interval);
              return { ...f, status: "success", progress: 100 };
            }
            return { ...f, progress: newProgress };
          }
          return f;
        }));
      }, 300);
    });
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      toast.error("Please upload at least one document");
      return;
    }
    
    if (!documentType || !department) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Documents submitted successfully for review");
    
    // Reset form
    setFiles([]);
    setDocumentType("");
    setDepartment("");
    setDescription("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Submit Document</h2>
        <p className="text-muted-foreground">
          Upload documents for review and approval through our secure portal
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload Area */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Document Upload</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? "border-primary bg-primary/5" 
                  : "border-muted-foreground/25 hover:border-primary/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={(e) => handleFiles(Array.from(e.target.files || []))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              />
              
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <div className="space-y-2">
                <p className="text-lg font-medium">
                  Drag and drop files here, or{" "}
                  <span className="text-primary cursor-pointer hover:underline">
                    browse
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Support for PDF, DOC, DOCX, TXT, JPG, PNG files up to 10MB
                </p>
              </div>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-6 space-y-3">
                {files.map((uploadedFile) => (
                  <div key={uploadedFile.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <File className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{uploadedFile.file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(uploadedFile.file.size / 1024 / 1024).toFixed(1)} MB
                      </p>
                      {uploadedFile.status === "uploading" && (
                        <Progress value={uploadedFile.progress} className="mt-1 h-1" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {uploadedFile.status === "success" && (
                        <CheckCircle className="h-4 w-4 text-success" />
                      )}
                      {uploadedFile.status === "error" && (
                        <AlertCircle className="h-4 w-4 text-destructive" />
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(uploadedFile.id)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Document Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Document Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="documentType">Document Type *</Label>
                <Select value={documentType} onValueChange={setDocumentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Target Department *</Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.value} value={dept.value}>
                        {dept.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide additional context or instructions for reviewers..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit" className="bg-gradient-primary hover:bg-primary-hover">
            Submit for Review
          </Button>
        </div>
      </form>
    </div>
  );
}