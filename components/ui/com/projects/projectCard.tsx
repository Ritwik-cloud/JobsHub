'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FolderGit2, 
  ExternalLink, 
  Code2, 
  Trash2, 
  Pencil,
  Plus
} from "lucide-react";

// 1. Type Definition
export interface ProjectData {
  _id?: string;
  title: string;
  description: string;
  link: string | null;
}

interface ProjectCardProps {
  data: ProjectData[]; // Accepts an array of projects
  onAdd?: () => void;
//   onEdit?: (project: ProjectData) => void;
  onDelete?: (project: ProjectData) => void;
}

export default function ProjectCard({ data, onAdd, onDelete }: ProjectCardProps) {
  return (
    <div className="w-full max-w-5xl space-y-4">
      {/* Header Section */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
            <FolderGit2 className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Projects</h2>
        </div>
        
        <Button 
          onClick={onAdd} 
          size="sm" 
          className="bg-blue-700 cursor-pointer hover:bg-blue-800 text-white gap-2 shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Add Project</span>
        </Button>
      </div>

      {/* Grid of Project Cards */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {data?.length > 0 ? (
          data.map((project, index) => (
            <Card 
              key={project._id || index} 
              className="w-full hover:shadow-md transition-shadow duration-300 border-l-4 border-l-purple-500 relative group flex flex-col"
            >
              {/* Top Right Actions */}
              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-slate-400 hover:text-red-600 hover:bg-red-50"
                  onClick={() => onDelete?.(project)}
                  title="Delete Project"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>

              <CardHeader className="pb-2">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1.5 bg-slate-100 rounded text-slate-600">
                    <Code2 className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-gray-900 line-clamp-1">
                      {project.title}
                    </CardTitle>
                    {/* Optional: Add tags here if your data had them */}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col gap-4">
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="mt-auto pt-2">
                  {project.link ? (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-600 hover:text-purple-700 hover:underline"
                    >
                      View Project <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <Badge variant="secondary" className="text-xs text-slate-500 font-normal bg-slate-100 hover:bg-slate-100">
                      No link available
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <FolderGit2 className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            <p className="font-medium text-gray-900">No projects added yet</p>
            <p className="text-sm text-gray-500 mt-1">Showcase your best work here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
