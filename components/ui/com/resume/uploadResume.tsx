"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X, CheckCircle2, AlertCircle } from "lucide-react";

interface UploadResumeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (formData: FormData) => Promise<void>; 
}

export default function UploadResumeModal({ 
  open, 
  onOpenChange, 
  onSave 
}: UploadResumeModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  const validateFile = (file: File): boolean => {
    setError("");
    
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    console.log(`File: ${file.name}, Size: ${file.size} bytes (${fileSizeMB}MB), Type: ${file.type}`);

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError(`File size is ${fileSizeMB}MB. Maximum allowed is 5MB`);
      return false;
    }

    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
    }
  };

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

    const file = e.dataTransfer.files?.[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError("Please select a file");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      await onSave(formData);
      handleClose();
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError("");
  };

  const handleClose = () => {
    if (!isSubmitting) { 
      onOpenChange(false);
      setSelectedFile(null);
      setError("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-xl font-bold">Upload Resume</DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mt-1">
            Upload your resume in PDF format (max 5MB)
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-6">
            {!selectedFile ? (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`
                  relative border-2 border-dashed rounded-lg p-8 text-center transition-all
                  ${dragActive 
                    ? "border-blue-500 bg-blue-50" 
                    : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                  }
                  ${error ? "border-red-300" : ""}
                `}
              >
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isSubmitting}
                />

                <div className="flex flex-col items-center gap-3">
                  <div className="p-4 bg-blue-50 rounded-full">
                    <Upload className="h-8 w-8 text-blue-600" />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      Drag & drop your resume here
                    </p>
                    <p className="text-sm text-gray-500">or</p>
                  </div>

                  <Button
                    type="button"
                    onClick={() => document.getElementById("resume-upload")?.click()}
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Browse Files
                  </Button>

                  <p className="text-xs text-gray-400 mt-2">
                    Supported format: PDF (Max 5MB)
                  </p>
                </div>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>

                  {!isSubmitting && (
                    <Button
                      type="button"
                      onClick={handleRemoveFile}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-3 text-sm text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Ready to upload</span>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
            <Button
              type="button"
              onClick={handleClose}
              variant="outline"
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!selectedFile || isSubmitting}
              className="w-full cursor-pointer sm:w-auto bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? ( 
                <>
                  <div className="h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Resume
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
