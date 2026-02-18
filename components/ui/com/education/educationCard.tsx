'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Building2, 
  CalendarDays, 
  BookOpen, 
  Percent,
  Trash2 
} from "lucide-react";
import { Education } from "@/typeScript/candidate_interface/candidate.interface";
import { memo } from "react";

export // Update your EducationList component interface
// interface EducationData {
//   _id: string;
//   level: string;
//   boardOrUniversity: string;
//  course: string | null;          
//   specialization?: string | null;  
//   durationFrom: string | null;     
//   durationTo: string | null;       
//   marksPercentage?: number;  
//   passingOutYear?: string;
//   grade?: string;
//   cgpa?: string;
//   percentage?: string;
// }

interface EducationCardProps {
  data: Education;
  onDelete?: (data: Education) => void;
}

 function EducationCard({ data, onDelete }: EducationCardProps) {
  return (
    <Card className="w-full hover:shadow-md transition-shadow duration-300 border-l-4 border-l-primary relative group">
      
      {/* Top Right 'Delete' Action */}
      <div className="absolute top-4 right-4 z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          onClick={() => onDelete?.(data)}
          title="Delete Education"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>

      <CardHeader className="pb-3 pr-16"> 
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <GraduationCap className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              {data.level}
            </span>
          </div>
          
          <CardTitle className="text-xl font-bold text-gray-900">
            {data.course}
          </CardTitle>
          
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <p className="text-muted-foreground font-medium flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              {data.specialization}
            </p>
            
            <Badge variant="secondary" className="px-2.5 py-0.5 flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
              <Percent className="w-3 h-3" />
              <span className="font-bold">{data.marksPercentage}%</span>
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid gap-4 sm:grid-cols-2 pt-2">
        <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
          <div className="p-2 bg-white rounded-md shadow-sm text-blue-600">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase">
              University / Board
            </p>
            <p className="font-semibold text-gray-800 mt-0.5">
              {data.boardOrUniversity}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
          <div className="p-2 bg-white rounded-md shadow-sm text-orange-600">
            <CalendarDays className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase">
              Duration
            </p>
            <div className="font-semibold text-gray-800 mt-0.5 flex items-center gap-2">
              <span>{data.durationFrom || "N/A"}</span>
              <span className="text-slate-400">→</span>
              <span>{data.durationTo || "Present"}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export default memo(EducationCard)