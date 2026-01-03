"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation"; // ✅ Import useRouter
import {
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Calendar,
  Users,
  Award,
  Building2,
  Layers,
  User,
  Mail,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from "lucide-react";

interface JobDetailsModalProps {
  job: any;
  isOpen: boolean;
  onClose: () => void;
}

export function JobDetailsModal({ job, isOpen, onClose }: JobDetailsModalProps) {
  const router = useRouter(); // ✅ Initialize router

  if (!job) return null;

  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return "Salary Not Disclosed";
    if (min && max) return `₹${(min / 100000).toFixed(1)}L - ₹${(max / 100000).toFixed(1)}L`;
    if (min) return `₹${(min / 100000).toFixed(1)}L+`;
    return "Negotiable";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getDaysLeft = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: "Expired", variant: "expired" };
    if (diffDays === 0) return { text: "Today", variant: "urgent" };
    if (diffDays <= 3) return { text: `${diffDays} days left`, variant: "urgent" };
    if (diffDays <= 7) return { text: `${diffDays} days left`, variant: "warning" };
    return { text: `${diffDays} days left`, variant: "normal" };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="h-4 w-4" />;
      case "inactive":
        return <AlertCircle className="h-4 w-4" />;
      case "closed":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-700 border-green-500/20";
      case "inactive":
        return "bg-gray-500/10 text-gray-700 border-gray-500/20";
      case "closed":
        return "bg-red-500/10 text-red-700 border-red-500/20";
      default:
        return "bg-blue-500/10 text-blue-700 border-blue-500/20";
    }
  };

  //  Handle View Applications click
  const handleViewApplications = () => {
    onClose(); // Close the modal first
    router.push(`/recruiter/jobs/${job._id}`); 
  };

  const deadlineInfo = getDaysLeft(job.applicationDeadline);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[95vh] p-0 gap-0 flex flex-col">
        {/* Header Section - Fixed at top */}
        <DialogHeader className="p-4 sm:p-6 pb-4 space-y-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border-b flex-shrink-0">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            {/* Left: Job Title & Company */}
            <div className="flex-1 space-y-3">
              <DialogTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight pr-8">
                {job.title}
              </DialogTitle>
              
              {/* Company Info */}
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-white shadow-sm">
                  <AvatarImage 
                    src={job.company?.logo ? `/${job.company.logo}` : undefined} 
                    alt={job.company?.name} 
                  />
                  <AvatarFallback className="bg-blue-600 text-white font-semibold text-sm sm:text-base">
                    {job.company?.name?.charAt(0) || "C"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 truncate">{job.company?.name}</p>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">{job.industry?.name}</p>
                </div>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge className={`${getStatusColor(job.status)} capitalize font-medium border flex items-center gap-1`}>
                  {getStatusIcon(job.status)}
                  <span>{job.status}</span>
                </Badge>
                <Badge variant="outline" className="capitalize bg-white flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{job.jobType?.replace("-", " ")}</span>
                </Badge>
                <Badge variant="outline" className="capitalize bg-white flex items-center gap-1">
                  <Briefcase className="h-3 w-3" />
                  <span>{job.workMode}</span>
                </Badge>
              </div>
            </div>

            {/* Right: Posted By */}
            <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 shadow-sm w-full lg:w-auto lg:min-w-[220px]">
              <p className="text-xs text-gray-500 mb-2 font-medium">Posted By</p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                  <p className="text-sm font-semibold text-gray-900 truncate">{job.postedBy?.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                  <p className="text-xs text-gray-600 truncate">{job.postedBy?.email}</p>
                </div>
                <p className="text-xs text-blue-600 font-medium truncate">{job.postedBy?.designation}</p>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Scrollable Content - Takes remaining space */}
        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 space-y-6">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Vacancies */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-3 sm:p-4 rounded-xl border border-blue-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 sm:p-2 bg-blue-600 rounded-lg">
                    <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <p className="text-xs font-medium text-blue-700">Vacancies</p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-blue-900">
                  {job.vacancies || "N/A"}
                </p>
              </div>

              {/* Experience */}
              <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-3 sm:p-4 rounded-xl border border-green-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 sm:p-2 bg-green-600 rounded-lg">
                    <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <p className="text-xs font-medium text-green-700">Experience</p>
                </div>
                <p className="text-base sm:text-lg font-bold text-green-900">
                  {job.minimumExperience}-{job.maximumExperience}+ yrs
                </p>
              </div>

              {/* Experience Level */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-3 sm:p-4 rounded-xl border border-purple-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 sm:p-2 bg-purple-600 rounded-lg">
                    <Layers className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <p className="text-xs font-medium text-purple-700">Level</p>
                </div>
                <p className="text-xs sm:text-sm font-bold text-purple-900 capitalize truncate">
                  {job.experienceLevel?.replace("-", " ")}
                </p>
              </div>

              {/* Deadline */}
              <div className={`bg-gradient-to-br ${
                deadlineInfo.variant === 'expired' ? 'from-red-50 to-red-100/50 border-red-200' :
                deadlineInfo.variant === 'urgent' ? 'from-orange-50 to-orange-100/50 border-orange-200' :
                deadlineInfo.variant === 'warning' ? 'from-amber-50 to-amber-100/50 border-amber-200' :
                'from-teal-50 to-teal-100/50 border-teal-200'
              } p-3 sm:p-4 rounded-xl border shadow-sm`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-1.5 sm:p-2 rounded-lg ${
                    deadlineInfo.variant === 'expired' ? 'bg-red-600' :
                    deadlineInfo.variant === 'urgent' ? 'bg-orange-600' :
                    deadlineInfo.variant === 'warning' ? 'bg-amber-600' :
                    'bg-teal-600'
                  }`}>
                    <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <p className={`text-xs font-medium ${
                    deadlineInfo.variant === 'expired' ? 'text-red-700' :
                    deadlineInfo.variant === 'urgent' ? 'text-orange-700' :
                    deadlineInfo.variant === 'warning' ? 'text-amber-700' :
                    'text-teal-700'
                  }`}>Deadline</p>
                </div>
                <p className={`text-xs sm:text-sm font-bold ${
                  deadlineInfo.variant === 'expired' ? 'text-red-900' :
                  deadlineInfo.variant === 'urgent' ? 'text-orange-900' :
                  deadlineInfo.variant === 'warning' ? 'text-amber-900' :
                  'text-teal-900'
                }`}>
                  {deadlineInfo.text}
                </p>
              </div>
            </div>

            <Separator />

            {/* Job Description */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                </div>
                Job Description
              </h3>
              <div 
                className="prose prose-sm max-w-none text-gray-700 leading-relaxed bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200 text-sm"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </div>

            <Separator />

            {/* Compensation */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                </div>
                Compensation
              </h3>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-6 rounded-xl border border-green-200 shadow-sm">
                <p className="text-2xl sm:text-3xl font-bold text-green-900 mb-1">
                  {formatSalary(job.minimumSalary, job.maximumSalary)}
                </p>
                <p className="text-xs sm:text-sm text-green-700 font-medium">Per Month (CTC)</p>
              </div>
            </div>

            <Separator />

            {/* Location & Category Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                  </div>
                  Location(s)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {job.location?.map((loc: any, index: number) => (
                    <Badge
                      key={loc._id || index}
                      variant="secondary"
                      className="bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors flex items-center gap-1"
                    >
                      <MapPin className="h-3 w-3" />
                      {loc.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <div className="p-2 bg-cyan-100 rounded-lg">
                    <Layers className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-600" />
                  </div>
                  Category
                </h3>
                <Badge 
                  variant="secondary" 
                  className="bg-cyan-50 text-cyan-700 border border-cyan-200 hover:bg-cyan-100 transition-colors text-sm py-2 px-3"
                >
                  {job.jobCategory?.name || "N/A"}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Required Skills */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Award className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                  </div>
                  Required Skills
                </div>
                <Badge variant="outline" className="ml-auto">
                  {job.skillsRequired?.length || 0} skills
                </Badge>
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.skillsRequired?.map((skill: any) => (
                  <Badge
                    key={skill._id}
                    className="bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-all hover:scale-105"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Additional Details */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-4 sm:p-6 rounded-xl border border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                Additional Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-gray-600 text-xs mb-0.5">Job Type</p>
                    <p className="font-semibold text-gray-900 capitalize truncate">
                      {job.jobType?.replace("-", " ")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-gray-600 text-xs mb-0.5">Work Mode</p>
                    <p className="font-semibold text-gray-900 capitalize truncate">{job.workMode}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-gray-600 text-xs mb-0.5">Posted On</p>
                    <p className="font-semibold text-gray-900 truncate">
                      {job.createdAt ? formatDate(job.createdAt) : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-gray-600 text-xs mb-0.5">Last Updated</p>
                    <p className="font-semibold text-gray-900 truncate">
                      {job.updatedAt ? formatDate(job.updatedAt) : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer Actions - Fixed at bottom */}
        <div className="p-4 sm:p-6 pt-4 border-t bg-white flex flex-col sm:flex-row justify-between items-center gap-3 flex-shrink-0">
          <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
            <p>Posted {job.createdAt ? formatDate(job.createdAt) : "N/A"}</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="flex-1 sm:flex-none"
            >
              Close
            </Button>
            <Button 
              className="bg-blue-600 cursor-pointer hover:bg-blue-700 flex-1 sm:flex-none"
              onClick={handleViewApplications} 
            >
              View Applications
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
