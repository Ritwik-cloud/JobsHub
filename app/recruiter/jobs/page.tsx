"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import toast from "react-hot-toast";
import { Plus, Search, Briefcase } from "lucide-react";
import {
  deleteJob,
  getAllJobs,
  jobStatusUpdate,
  getJobDetails,
} from "@/redux/slice/recruiterSlice/recruiterSlice";
import dynamic from "next/dynamic";
import { PaginationControls } from "@/components/ui/pagination-controls";
// import { PaginationControls } from "@/components/ui/pagination-controls"; 

// ... JobCardSkeleton & JobsPageSkeleton (kept as is) ...
const JobCardSkeleton = () => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
    <div className="flex items-start justify-between">
      <div className="space-y-2 flex-1">
        <Skeleton className="h-6 w-3/4 bg-gray-200" />
        <Skeleton className="h-4 w-1/2 bg-gray-200" />
      </div>
      <Skeleton className="h-6 w-20 bg-gray-200 rounded-full" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-full bg-gray-200" />
      <Skeleton className="h-4 w-5/6 bg-gray-200" />
      <Skeleton className="h-4 w-4/6 bg-gray-200" />
    </div>
    <div className="flex flex-wrap gap-2">
      <Skeleton className="h-6 w-16 bg-gray-200 rounded" />
      <Skeleton className="h-6 w-20 bg-gray-200 rounded" />
      <Skeleton className="h-6 w-24 bg-gray-200 rounded" />
    </div>
    <div className="flex items-center justify-between pt-4 border-t">
      <div className="flex gap-4">
        <Skeleton className="h-4 w-20 bg-gray-200" />
        <Skeleton className="h-4 w-24 bg-gray-200" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-9 w-16 bg-gray-200 rounded" />
        <Skeleton className="h-9 w-16 bg-gray-200 rounded" />
        <Skeleton className="h-9 w-20 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);

const JobsPageSkeleton = () => (
  <div className="space-y-6 p-4">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-2">
        <Skeleton className="h-9 w-[200px] bg-gray-200" />
        <Skeleton className="h-4 w-[300px] bg-gray-200" />
      </div>
      <Skeleton className="h-10 w-[150px] bg-gray-200 rounded" />
    </div>
    <div className="grid gap-4 md:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 space-y-2">
          <Skeleton className="h-4 w-20 bg-gray-200" />
          <Skeleton className="h-8 w-16 bg-gray-200" />
        </div>
      ))}
    </div>
    <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <Skeleton className="h-10 flex-1 bg-gray-200 rounded" />
        <Skeleton className="h-10 w-full sm:w-[300px] bg-gray-200 rounded" />
        <Skeleton className="h-10 w-full sm:w-[180px] bg-gray-200 rounded" />
      </div>
      <Skeleton className="h-4 w-[200px] bg-gray-200" />
    </div>
    <div className="grid gap-6 md:grid-cols-2">
      {[...Array(6)].map((_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </div>
  </div>
);

// Dynamic Imports
const JobCard = dynamic(
  () => import("@/components/ui/com/recruiter/jobs/jobCard").then((mod) => ({ default: mod.JobCard })),
  { loading: () => <JobCardSkeleton />, ssr: false }
);

const JobDetailsModal = dynamic(
  () => import("@/components/ui/com/recruiter/jobs/viewJobModal").then((mod) => ({ default: mod.JobDetailsModal })),
  { loading: () => <JobCardSkeleton />, ssr: false }
);

export default function RecruiterJobsPage() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  
  // State for server-side params
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest"); 
  const [localJobs, setLocalJobs] = useState<any[]>([]); 

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Get data from Redux
  const { allJobsList, isLoading, jobDetails, totalPages } = useSelector(
    (state: RootState) => state.Recruiter
  );

  // Sync Redux state to local state
  useEffect(() => {
    if (allJobsList) {
      setLocalJobs(allJobsList);
    }
  }, [allJobsList]);

  // Function to fetch jobs with current params
  const fetchJobs = useCallback(() => {
    dispatch(getAllJobs({
      page,
      limit,
      search: searchQuery,
      status: statusFilter === "all" ? "" : statusFilter
    }));
  }, [dispatch, page, limit, searchQuery, statusFilter]);

  // Initial fetch & Debounced Search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchJobs();
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchJobs]);

  // Handlers for Filters
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  console.log(searchQuery, "search");

  };

  
  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setPage(1);
  };

  // Handlers for Actions
  const handleEdit = (jobId: string) => router.push(`/recruiter/jobs/${jobId}/edit`);

  const handleDelete = useCallback(async (jobId: string) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const loadingToast = toast.loading("Deleting job...");
      // Optimistic update
      setLocalJobs(prev => prev.filter(j => j._id !== jobId));
      await dispatch(deleteJob(jobId)).unwrap();
      toast.dismiss(loadingToast);
      toast.success("Job deleted successfully");
      fetchJobs(); // Refresh list from server
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete job");
      fetchJobs(); // Revert on error
    }
  }, [dispatch, fetchJobs]);

  const handleStatusToggle = useCallback(async (jobId: string, newStatus: string) => {
    try {
      // Optimistic update
      setLocalJobs(prev => prev.map(j => j._id === jobId ? { ...j, status: newStatus } : j));
      await dispatch(jobStatusUpdate({ id: jobId, status: newStatus })).unwrap();
      toast.success(`Job ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
      fetchJobs(); // Refresh to ensure sync
    } catch (error: any) {
      toast.error(error?.message || "Failed to update job status");
      fetchJobs(); // Revert on error
    }
  }, [dispatch, fetchJobs]);

  const handleView = useCallback(async (jobId: string) => {
    if (!jobId) return;
    try {
      setIsModalOpen(true);
      await dispatch(getJobDetails({ id: jobId })).unwrap();
    } catch (err: any) {
      toast.error(err?.message || "Failed to load job details");
      setIsModalOpen(false);
    }
  }, [dispatch]);

  const handleCloseModal = () => setIsModalOpen(false);

  // Sorting Logic (Client-side)
  const sortedJobs = [...localJobs].sort((a: any, b: any) => {
      if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortBy === "views") return (b.views || 0) - (a.views || 0);
      return 0;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Job Listings</h1>
          <p className="text-muted-foreground mt-1">Manage all your job postings in one place</p>
        </div>
        <Button className="cursor-pointer bg-blue-700 hover:bg-blue-800" onClick={() => router.push("/recruiter/create")}>
          <Plus className=" h-4 w-4" />Post New Job
        </Button>
      </div>

      {/* Stats - Using localJobs to show counts for currently visible items */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Jobs</p>
          <p className="text-2xl font-bold text-gray-900">{ localJobs.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Active Jobs (Page)</p>
          <p className="text-2xl font-bold text-green-600">
            {localJobs.filter((j: any) => j.status === "active").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Inactive Jobs (Page)</p>
          <p className="text-2xl font-bold text-gray-600">
            {localJobs.filter((j: any) => j.status === "inactive").length}
          </p>
        </div>
      
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search jobs by title..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-9"
            />
          </div>

          <Tabs value={statusFilter} onValueChange={handleStatusChange} className="w-full sm:w-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
          </Tabs>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="views">Most Viewed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <JobsPageSkeleton />
      ) : sortedJobs.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            {sortedJobs.map((job: any) => (
              <JobCard
                key={job._id}
                job={job}
                onEdit={handleEdit}
                onDelete={() => handleDelete(job._id)}
                onView={() => handleView(job._id)}
                onStatusToggle={handleStatusToggle}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6">
             <PaginationControls 
               currentPage={page} 
               totalPages={totalPages || 1} 
               onPageChange={setPage} 
             />
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg border border-gray-200">
          <Briefcase className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
          <p className="text-sm text-gray-500 mb-4">Try adjusting your filters or post a new job.</p>
          <Button className="cursor-pointer bg-blue-700 hover:bg-blue-800" onClick={() => router.push("/recruiter/create")}>
            <Plus className="mr-2 h-4 w-4" /> Post Your First Job
          </Button>
        </div>
      )}
      

      {/* Modal */}
      <JobDetailsModal job={jobDetails || null} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
