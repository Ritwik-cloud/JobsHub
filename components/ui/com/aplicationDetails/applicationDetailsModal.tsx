"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Award,
  Download,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Loader2,
} from "lucide-react";

interface ApplicationDetailsModalProps {
  applicationDetails: any;
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export function ApplicationDetailsModal({
  applicationDetails,
  isLoading,
  isOpen,
  onClose,
}: ApplicationDetailsModalProps) {
  
  const getStatusConfig = (status: string) => {
    const configs = {
      accepted: {
        icon: CheckCircle,
        className: "bg-emerald-50 text-emerald-700 border-emerald-200",
        label: "Accepted",
      },
      rejected: {
        icon: XCircle,
        className: "bg-red-50 text-red-700 border-red-200",
        label: "Rejected",
      },
      pending: {
        icon: Clock,
        className: "bg-amber-50 text-amber-700 border-amber-200",
        label: "Pending",
      },
      applied: {
        icon: FileText,
        className: "bg-blue-50 text-blue-700 border-blue-200",
        label: "Applied",
      },
    };
    return configs[status as keyof typeof configs] || configs.applied;
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDownloadResume = () => {
    if (applicationDetails?.resume?.path) {
      const resumeUrl = `${process.env.NEXT_PUBLIC_API_URL}/${applicationDetails.resume.path.replace(/\\/g, "/")}`;
      const link = document.createElement("a");
      link.href = resumeUrl;
      link.download = applicationDetails.resume.originalName;
      link.click();
    }
  };

  const getProfileImage = (path: string) => {
    if (!path) return "";
    return `${process.env.NEXT_PUBLIC_API_URL}/${path.replace(/\\/g, "/")}`;
  };

  // Loading state
  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // No data state
  if (!applicationDetails || !applicationDetails.candidateInfo) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl">
          <div className="flex flex-col items-center justify-center py-20">
            <FileText className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500">No application details available</p>
            <Button onClick={onClose} className="mt-4" variant="outline">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const candidate = applicationDetails.candidateInfo;
  const profile = candidate?.profile;
  const statusConfig = getStatusConfig(applicationDetails.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        {/* ✅ Header - Simple title only */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-2xl font-bold">
            Application Details
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-6">
            {/* ✅ Candidate Header with Status Badge */}
            <div className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-100">
              <Avatar className="h-20 w-20 border-4 border-white shadow-md shrink-0">
                {candidate.profilePicture ? (
                  <AvatarImage
                    src={getProfileImage(candidate.profilePicture)}
                    alt={candidate.name}
                  />
                ) : null}
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl">
                  {getInitials(candidate.name)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                {/*  Name and Status Badge on same line */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {candidate.name}
                  </h2>
                  <Badge
                    variant="outline"
                    className={`${statusConfig.className} flex items-center gap-1.5 px-3 py-1`}
                  >
                    <StatusIcon className="h-4 w-4" />
                    {statusConfig.label}
                  </Badge>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="text-sm truncate">{candidate.email}</span>
                  </div>
                  {profile?.phone && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="h-4 w-4 shrink-0" />
                      <span className="text-sm">{profile.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4 shrink-0" />
                    <span className="text-sm">
                      Applied on {formatDate(applicationDetails.applicationDate)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleDownloadResume}
                className="shrink-0 w-full sm:w-auto"
                variant="default"
                disabled={!applicationDetails?.resume?.path}
              >
                <Download className="h-4 w-4 mr-2" />
                Resume
              </Button>
            </div>

            {/* Experience Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Experience
                </h3>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="capitalize">
                      {profile?.workstatus || "Not specified"}
                    </Badge>
                    {profile?.totalExperience && (
                      <span className="text-sm text-gray-600">
                        {profile.totalExperience.years > 0 && (
                          <span>{profile.totalExperience.years} years </span>
                        )}
                        {profile.totalExperience.months > 0 && (
                          <span>{profile.totalExperience.months} months</span>
                        )}
                        {profile.totalExperience.years === 0 &&
                          profile.totalExperience.months === 0 && (
                            <span>Fresher</span>
                          )}
                      </span>
                    )}
                  </div>

                  {profile?.workExperience && profile.workExperience.length > 0 ? (
                    <div className="mt-4 space-y-3">
                      {profile.workExperience.map((exp: any, index: number) => (
                        <div
                          key={index}
                          className="p-3 bg-white rounded border border-gray-200"
                        >
                          <h4 className="font-semibold text-gray-900">
                            {exp.jobTitle}
                          </h4>
                          <p className="text-sm text-gray-600">{exp.companyName}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(exp.joiningDate).getFullYear()} -{" "}
                            {exp.currentEmployment
                              ? "Present"
                              : new Date(exp.workTillDate).getFullYear()}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 mt-2">
                      No work experience listed
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Education
                </h3>
              </div>
              <div className="space-y-3">
                {profile?.education && profile.education.length > 0 ? (
                  profile.education.map((edu: any, index: number) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1">
                          <Badge variant="outline" className="mb-2">
                            {edu.level}
                          </Badge>
                          <h4 className="font-semibold text-gray-900">
                            {edu.boardOrUniversity}
                          </h4>
                          {edu.course && (
                            <p className="text-sm text-gray-600 mt-1">
                              Course ID: {edu.course}
                            </p>
                          )}
                          {edu.specialization && (
                            <p className="text-sm text-gray-600">
                              Specialization ID: {edu.specialization}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-2">
                            {edu.durationFrom && edu.durationTo
                              ? `${edu.durationFrom} - ${edu.durationTo}`
                              : edu.passingOutYear
                              ? `Passed: ${edu.passingOutYear}`
                              : "Duration not specified"}
                          </p>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                            {edu.marksPercentage}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No education listed</p>
                )}
              </div>
            </div>

            {/* Skills Section */}
            {profile?.skills && profile.skills.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Skills
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill: any) => (
                    <Badge
                      key={skill._id}
                      variant="secondary"
                      className="px-3 py-1 bg-green-50 text-green-700 border-green-200"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Resume Info */}
            {applicationDetails?.resume?.originalName && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <FileText className="h-5 w-5 text-blue-600 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900">Resume</p>
                      <p className="text-sm text-gray-600 truncate">
                        {applicationDetails.resume.originalName}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadResume}
                    className="shrink-0 w-full sm:w-auto"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer - Fixed at bottom */}
        <Separator />
        <div className="px-6 py-4 flex flex-col sm:flex-row gap-3 sm:justify-end border-t bg-gray-50">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
