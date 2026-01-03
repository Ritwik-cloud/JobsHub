'use client'

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, Code2, Edit } from "lucide-react";

// Define skill type
interface Skill {
  _id: string;
  name: string;
}

// Define possible data structures
type SkillsData = 
  | Skill[] 
  | { data: Skill[] } 
  | null 
  | undefined;

// Define component props
interface SkillsCardProps {
  data?: SkillsData;
  onEdit: () => void;
}

export default function SkillsCard({ data, onEdit }: SkillsCardProps) {
  // Safe fallback and type-safe data extraction
  const getSkills = (data: SkillsData): Skill[] => {
    if (!data) return [];
    
    if (Array.isArray(data)) {
      return data;
    }
    
    if (typeof data === 'object' && 'data' in data && Array.isArray(data.data)) {
      return data.data;
    }
    
    return [];
  };

  const skills = getSkills(data);

  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-gray-50">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
            <Code2 className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-gray-900">
              Skills & Expertise
            </CardTitle>
            <p className="text-sm text-gray-500 mt-0.5">
              Technologies and tools you master
            </p>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onEdit}
          className="text-blue-500 hover:text-blue-900 hover:bg-blue-50 transition-colors"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </CardHeader>

      <CardContent className="pt-6">
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge 
                key={skill._id}
                variant="secondary"
                className="px-3.5 py-1.5 text-sm font-medium bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-all cursor-default border border-transparent hover:border-blue-200"
              >
                {skill.name}
              </Badge>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center bg-gray-50/50 rounded-lg border border-dashed border-gray-200">
            <Wrench className="h-10 w-10 text-gray-300 mb-3" />
            <p className="text-sm font-medium text-gray-900">No skills added yet</p>
            <p className="text-xs text-gray-500 max-w-[200px] mt-1">
              Add your technical skills to help recruiters find you.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onEdit}
              className="mt-4 bg-blue-700 cursor-pointer hover:bg-blue-800"
            >
              Add Skills
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
