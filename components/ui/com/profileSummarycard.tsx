'use client'

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit, FileText } from "lucide-react";
import { memo } from "react";

// Define the summary data type
type SummaryData = string | { profileSummary?: string; summary?: string } | null | undefined;

// Define props interface
interface ProfileSummaryCardProps {
  data?: SummaryData;
  onEdit: () => void;
}

 function ProfileSummaryCard({ data, onEdit }: ProfileSummaryCardProps) {
  // Helper function to extract summary text
  const getSummaryText = (data: SummaryData): string | null => {
    if (!data) return null;
    
    if (typeof data === "string") {
      return data;
    }
    
    if (typeof data === "object") {
      return data.profileSummary || data.summary || null;
    }
    
    return null;
  };

  const summaryText = getSummaryText(data);

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-full">
            <FileText className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-lg font-semibold">Profile Summary</CardTitle>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onEdit}
          className="text-blue-500 hover:text-blue-900 hover:bg-blue-50"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </CardHeader>
      
      <CardContent>
        {summaryText ? (
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
            {summaryText}
          </p>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              No summary added yet.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onEdit}
              className="mt-2 bg-blue-700 cursor-pointer hover:bg-blue-800"
            >
              <Edit className="h-4 w-4 mr-2" />
              Add Summary
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
export default memo(ProfileSummaryCard)