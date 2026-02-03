"use client";

import { Button } from "@/components/ui/button";
import { GraduationCap, Plus } from "lucide-react";
import EducationCard from "./educationCard";
import { Education } from "@/typeScript/candidate_interface/candidate.interface";

// Define the complete EducationData interface

// interface EducationData {
//   _id: string;
//   level: string;
//   boardOrUniversity: string;
//   course: string | null;          
//   specialization?: string | null;  
//   durationFrom: string | null;     
//   durationTo: string | null;       
//   marksPercentage?: number; 
//   passingOutYear?: string;
//   grade?: string;
//   cgpa?: string;
//   percentage?: string;
// }


//  Define the props interface for EducationList
interface EducationListProps {
  educationList: Education[];
  onAdd: () => void;
  onDelete: (data: Education) => void;
}

export default function EducationList({
  educationList,
  onAdd,
  onDelete,
}: EducationListProps) {
  return (
    <div className="w-full max-w-5xl space-y-4">
      {/* Header Section */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <GraduationCap className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Education</h2>
        </div>

        <Button
          onClick={onAdd}
          size="sm"
          className="bg-blue-700 cursor-pointer hover:bg-blue-800 gap-2 shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Add Education</span>
        </Button>
      </div>

      {/* Grid of Cards */}
      <div className="grid gap-4">
        {educationList?.length > 0 ? (
          educationList.map((edu, index) => (
            <EducationCard
              key={edu._id || index}
              data={edu}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
            <GraduationCap className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="font-medium">No education details added yet.</p>
            <p className="text-sm text-gray-400 mt-1">
              Click "Add Education" to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
