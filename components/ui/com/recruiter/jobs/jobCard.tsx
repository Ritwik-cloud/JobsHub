"use client";

import { memo, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Users,
  Power,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface JobCardProps {
  job: any;
  onEdit?: (jobId: string) => void;
  onDelete?: (jobId: string) => void;
  onView?: (jobId: string) => void;
  onStatusToggle?: (jobId: string, newStatus: string) => void;
}

 function JobCard({ job, onEdit, onDelete, onStatusToggle, onView }: JobCardProps) {
  const router = useRouter();
  const [isToggling, setIsToggling] = useState(false);

  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return "Salary Not Disclosed";
    if (min && max) return `₹${(min / 100000).toFixed(1)}L - ₹${(max / 100000).toFixed(1)}L`;
    if (min) return `₹${(min / 100000).toFixed(1)}L+`;
    return "Negotiable";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border-green-200";
      case "inactive":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "closed":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const getDaysLeft = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Expired";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day left";
    return `${diffDays} days left`;
  };

  // Handle status toggle
  const handleStatusToggle = async (checked: boolean) => {
    if (!onStatusToggle) return;
    
    setIsToggling(true);
    try {
      const newStatus = checked ? "active" : "inactive";
      await onStatusToggle(job._id, newStatus);
    } catch (error) {
      console.error("Failed to toggle status:", error);
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = () => {
    if (!onDelete || !job._id) {
      console.error("Cannot delete: missing handler or job ID");
      return;
    }
    onDelete(job._id);
  };

  // Add validation for onView
  const handleView = () => {
    if (!job._id) {
      console.error("Cannot view: missing job ID");
      return;
    }
    
    // Check if onView exists before calling it
    if (!onView) {
      console.error("Cannot view: onView handler not provided");
      return;
    }
    
    onView(job._id);
  };

  
  const handleApplications = () => {
    if (!job._id) {
      console.error("Cannot view applications: missing job ID");
      return;
    }
    
    // Navigate to the applications page for this specific job
    router.push(`/recruiter/jobs/${job._id}`);
  };

  const isActive = job.status === "active";

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-blue-300">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3
                className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 cursor-pointer transition-colors line-clamp-1"
                onClick={handleView}
              >
                {job.title}
              </h3>
              <Badge className={`${getStatusColor(job.status)} capitalize text-xs`}>
                {job.status}
              </Badge>
            </div>
            
            {/* Location & Category */}
            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span className="line-clamp-1">
                  {job.location?.map((loc: any) => loc.name).join(", ") || "Remote"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                <span>{job.jobCategory?.name || "General"}</span>
              </div>
            </div>
          </div>

          {/* Active/Inactive Toggle */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 ml-4">
                  <Switch
                    id={`status-${job._id}`}
                    checked={isActive}
                    onCheckedChange={handleStatusToggle}
                    disabled={isToggling}
                    className="data-[state=checked]:bg-green-600"
                  />
                  <Label 
                    htmlFor={`status-${job._id}`} 
                    className="cursor-pointer text-xs font-medium"
                  >
                    <Power className={`h-4 w-4 ${isActive ? 'text-green-600' : 'text-gray-400'}`} />
                  </Label>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isActive ? "Deactivate job" : "Activate job"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Job Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600 capitalize">{job.jobType?.replace("-", " ")}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600 capitalize">{job.workMode}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">
              {job.minimumExperience}-{job.maximumExperience || "+"} yrs
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Eye className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">{job.views || 0} views</span>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skillsRequired?.slice(0, 4).map((skill: any) => (
            <Badge
              key={skill._id}
              variant="secondary"
              className="bg-blue-50 text-blue-700 border-blue-100 text-xs"
            >
              {skill.name}
            </Badge>
          ))}
          {job.skillsRequired?.length > 4 && (
            <Badge variant="secondary" className="bg-gray-50 text-gray-600 text-xs">
              +{job.skillsRequired.length - 4} more
            </Badge>
          )}
        </div>

        {/* Salary & Deadline */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500 mb-1">Salary</p>
            <p className="text-sm font-semibold text-gray-900">
              {formatSalary(job.minimumSalary, job.maximumSalary)}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Deadline</p>
              <p className="text-sm font-medium text-gray-900">
                {getDaysLeft(job.applicationDeadline)}
              </p>
            </div>
          </div>

          {job.vacancies && (
            <div>
              <p className="text-xs text-gray-500">Vacancies</p>
              <p className="text-sm font-semibold text-gray-900">{job.vacancies}</p>
            </div>
          )}
        </div>
      </CardContent>

      {/* Footer Actions */}
      <CardFooter className="bg-gray-50 px-6 py-3 flex gap-2">
        {/* Eye Button - View Details */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={handleView}
                className="cursor-pointer hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/*  Application Button - Navigate to applications page */}
        <Button
          variant="outline"
          size="sm"
          className="flex-1 cursor-pointer hover:bg-green-50 hover:text-green-700 hover:border-green-300"
          onClick={handleApplications}
        >
          Applications
        </Button>

        {/* Edit Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit?.(job._id)}
                className="cursor-pointer hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Job</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Delete Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                className="text-red-600 cursor-pointer hover:text-red-700 hover:bg-red-50 hover:border-red-300"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete Job</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}
export default memo(JobCard)