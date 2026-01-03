"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  FileText,
  Calendar,
  Download,
  Eye,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
} from "lucide-react";
import { getApplicationDetails, getJobApplications } from "@/redux/slice/recruiterSlice/recruiterSlice";
import dynamic from "next/dynamic";
import { ApplicationStatus } from "@/typeScript/recruiter_interface/recruiter.interface";

type Application = {
  _id: string;
  candidate: {
    _id: string;
    name: string;
  };
  job: {
    _id: string;
    title: string;
  };
  status: string;
  resume: {
    path: string;
    originalName: string;
  };
  applicationDate: string;
};

// Application Card Skeleton
const ApplicationCardSkeleton = () => (
  <Card className="border-gray-200">
    <CardContent className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-4 flex-1">
          <Skeleton className="h-12 w-12 rounded-full bg-gray-200" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-[200px] bg-gray-200" />
            <Skeleton className="h-4 w-[250px] bg-gray-200" />
            <Skeleton className="h-3 w-[150px] bg-gray-200" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
          <Skeleton className="h-6 w-20 bg-gray-200 rounded-full" />
          <div className="flex gap-2 w-full sm:w-auto">
            <Skeleton className="h-9 w-24 bg-gray-200 rounded" />
            <Skeleton className="h-9 w-20 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <Skeleton className="h-3 w-[180px] bg-gray-200" />
      </div>
    </CardContent>
  </Card>
);

// Full Page Skeleton
const ApplicationsPageSkeleton = () => (
  <div className="space-y-6 p-4 md:p-6">
    {/* Header Skeleton */}
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <Skeleton className="h-9 w-[280px] bg-gray-200" />
        <Skeleton className="h-4 w-[350px] bg-gray-200" />
      </div>
    </div>

    {/* Stats Cards Skeleton */}
    <div className="grid gap-4 md:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="border-l-4 border-l-gray-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 bg-gray-200" />
                <Skeleton className="h-8 w-16 bg-gray-200" />
              </div>
              <Skeleton className="h-8 w-8 rounded-full bg-gray-200" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Filters Skeleton */}
    <Card>
      <CardContent className="p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <Skeleton className="h-10 flex-1 bg-gray-200 rounded" />
          <Skeleton className="h-10 w-full sm:w-[200px] bg-gray-200 rounded" />
        </div>
        <Skeleton className="h-4 w-[250px] bg-gray-200" />
      </CardContent>
    </Card>

    {/* Application Cards Skeleton */}
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <ApplicationCardSkeleton key={i} />
      ))}
    </div>
  </div>
);

// Dynamically import the modal
const ApplicationDetailsModal = dynamic(
  () => import("@/components/ui/com/aplicationDetails/applicationDetailsModal").then(
    mod => ({ default: mod.ApplicationDetailsModal })
  ),
  {
    loading: () => null,
    ssr: false,
  }
);

export default function ManageApplicationsPage() {
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  
  // FIX 1: Robust params check
  const jobId = (params?.slug || params?.jobId || params?.id) as string;

  const [searchQuery, setSearchQuery] = useState("");
  // FIX 2: Type definition for status filter
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "">(""); 
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { applicationsList, applicationDetails, totalApplications, isLoading } = useSelector(
    (state: RootState) => state.Recruiter
  );

  const handleViewClick = (id: string) => {
    console.log("🔍 Opening application:", id);
    setSelectedApplicationId(id);
  };

  const handleCloseModal = () => {
    setSelectedApplicationId(null);
  };

  // Fetch application details when ID changes
  useEffect(() => {
    if (selectedApplicationId) {
      dispatch(getApplicationDetails({ id: selectedApplicationId }));
    }
  }, [selectedApplicationId, dispatch]);

  useEffect(() => {
    if (jobId) {
      dispatch(
        getJobApplications({
          jobId,
          page,
          limit,
          search: searchQuery,
          status: statusFilter,
        })
      );
    } else {
      console.warn("Job ID missing from URL parameters");
    }
  }, [dispatch, jobId, page, searchQuery, statusFilter]);

  const getStatusBadge = (status: string) => {
    const configs = {
      accepted: {
        icon: CheckCircle,
        className: "bg-emerald-50 text-emerald-700 border-emerald-200",
      },
      rejected: {
        icon: XCircle,
        className: "bg-red-50 text-red-700 border-red-200",
      },
      pending: {
        icon: Clock,
        className: "bg-amber-50 text-amber-700 border-amber-200",
      },
      applied: {
        icon: FileText,
        className: "bg-blue-50 text-blue-700 border-blue-200",
      },
      shortlisted: {
        icon: CheckCircle,
        className: "bg-purple-50 text-purple-700 border-purple-200",
      },
    };

    const config = configs[status as keyof typeof configs] || configs.applied;
    const Icon = config.icon;

    return (
      <Badge
        variant="outline"
        className={`${config.className} text-xs capitalize flex items-center gap-1`}
      >
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
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
      month: "short",
      day: "numeric",
    });
  };

  const handleViewResume = (path: string, name: string) => {
    // 1. Replace backslashes (\) with forward slashes (/) for the URL
    const cleanPath = path.replace(/\\/g, "/");

    // 2. Construct the correct URL
    // Result: http://localhost:3005/uploads/resume/filename.pdf
    const resumeUrl = `http://localhost:3005/${cleanPath}`;

    // 3. Trigger download
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.target = "_blank";
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = {
    total: totalApplications || 0,
    accepted:
      applicationsList?.filter((a: Application) => a.status === "accepted")
        .length || 0,
    rejected:
      applicationsList?.filter((a: Application) => a.status === "rejected")
        .length || 0,
    pending:
      applicationsList?.filter(
        (a: Application) => a.status === "pending" || a.status === "applied"
      ).length || 0,
  };

  // Show skeleton while loading
  if (isLoading && page === 1) {
    return <ApplicationsPageSkeleton />;
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Manage Applications
          </h1>
          <p className="text-muted-foreground mt-1">
            Review and manage candidate applications for this job
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Applications
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Accepted</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {stats.accepted}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {stats.rejected}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-amber-600">
                  {stats.pending}
                </p>
              </div>
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by candidate name..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                className="pl-9"
              />
            </div>

            {/* FIX 3: Safe Select Value Handling */}
            <Select
              // Convert empty string (state) to "all" (UI value) to prevent crash
              value={statusFilter === "" ? "all" : statusFilter}
              onValueChange={(value) => {
                // Convert "all" (UI value) back to empty string (state)
                setStatusFilter(value === "all" ? "" : (value as ApplicationStatus));
                setPage(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                {/* Use "all" here, never empty string */}
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-3 text-sm text-gray-600">
            Showing {applicationsList?.length || 0} of {stats.total} applications
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      {applicationsList && applicationsList.length > 0 ? (
        <div className="space-y-4">
          {applicationsList.map((app: Application) => (
            <Card
              key={app._id}
              className="hover:shadow-md transition-all duration-200 border-gray-200"
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <Avatar className="h-12 w-12 border-2 border-gray-200">
                      <AvatarFallback className="bg-linear-to-br from-blue-500 to-purple-600 text-white">
                        {getInitials(app.candidate.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {app.candidate.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        Applied for: {app.job.title}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {formatDate(app.applicationDate)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
                    <div className="w-full sm:w-auto">
                      {getStatusBadge(app.status)}
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 sm:flex-none"
                        onClick={() =>
                          handleViewResume(
                            app.resume.path,
                            app.resume.originalName
                          )
                        }
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Resume
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 cursor-pointer sm:flex-none"
                        onClick={() => handleViewClick(app._id)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FileText className="h-3.5 w-3.5" />
                    <span className="truncate">{app.resume.originalName}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Users className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No applications found
            </h3>
            <p className="text-sm text-gray-500">
              {searchQuery || statusFilter !== ""
                ? "Try adjusting your filters"
                : "No candidates have applied yet"}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {stats.total > limit && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || isLoading}
          >
            Previous
          </Button>
          <div className="flex items-center px-4 text-sm text-gray-600">
            Page {page} of {Math.ceil(stats.total / limit)}
          </div>
          <Button
            variant="outline"
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= Math.ceil(stats.total / limit) || isLoading}
          >
            Next
          </Button>
        </div>
      )}

      {/* Dynamically loaded modal */}
      <ApplicationDetailsModal
        applicationDetails={applicationDetails}
        isLoading={isLoading}
        isOpen={selectedApplicationId !== null}
        onClose={handleCloseModal}
      />
    </div>
  );
}
