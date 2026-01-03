"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Edit, Upload } from "lucide-react";

interface Resume {
  originalName: string;
  path: string;
}

interface ResumeCardProps {
  resume: Resume | null | undefined;
  onEdit?: () => void;
}

export default function ResumeCard({ resume, onEdit }: ResumeCardProps) {
  const handleView = () => {
    if (!resume?.path) return;
    const resumeUrl = `http://localhost:3005/${resume.path}`;
    window.open(resumeUrl, "_blank");
  };

  if (!resume?.originalName) {
    return (
      <Card className="w-full shadow-sm">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center bg-gray-50/50 rounded-lg border border-dashed border-gray-200">
          <FileText className="h-12 w-12 text-gray-300 mb-3" />
          <p className="text-sm font-medium text-gray-900">No resume uploaded yet</p>
          <p className="text-xs text-gray-500 mt-1">
            Your resume will appear here once uploaded
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-3 border-b border-gray-50">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-gray-900">Resume</CardTitle>
              <p className="text-sm text-gray-500 mt-0.5">
                Your uploaded resume document
              </p>
            </div>
          </div>
          
          {/* Edit Button */}
          {onEdit && (
            <Button
              onClick={onEdit}
              variant="outline"
              size="sm"
              className="border-gray-200 cursor-pointer text-blue-700 hover:text-blue-800 hover:bg-blue-50"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="">
        {/* Resume Info - Clickable Name */}
        <div className="flex items-start gap-3 p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 hover:border-blue-200 transition-colors">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <button
              onClick={handleView}
              className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 truncate block w-full text-left transition-colors"
            >
              {resume.originalName}
            </button>
            <p className="text-xs text-gray-500 mt-1">PDF Document • Click to view</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
