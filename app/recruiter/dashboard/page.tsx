"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Briefcase, Calendar, TrendingUp, Eye, Plus, CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";
import { Cookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import toast from "react-hot-toast";
import { recruiterDashboard, recruiterProfile } from "@/redux/slice/recruiterSlice/recruiterSlice";

//  Stats Card Skeleton
const StatsCardSkeleton = () => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <Skeleton className="h-4 w-24 bg-gray-200" />
      <Skeleton className="h-8 w-8 rounded-lg bg-gray-200" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-8 w-16 bg-gray-200 mb-2" />
      <Skeleton className="h-3 w-20 bg-gray-200" />
    </CardContent>
  </Card>
);

//  Job Card Skeleton
const JobCardSkeleton = () => (
  <div className="flex items-center justify-between p-4 border rounded-lg">
    <div className="flex-1 space-y-2">
      <Skeleton className="h-5 w-[200px] bg-gray-200" />
      <Skeleton className="h-4 w-[150px] bg-gray-200" />
      <Skeleton className="h-5 w-24 bg-gray-200 rounded" />
    </div>
    <div className="text-right space-y-2">
      <Skeleton className="h-4 w-20 bg-gray-200" />
      <Skeleton className="h-3 w-24 bg-gray-200" />
    </div>
  </div>
);

//  Full Dashboard Skeleton
const DashboardSkeleton = () => (
  <div className="space-y-8">
    {/* Header Skeleton */}
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-2">
        <Skeleton className="h-9 w-[300px] bg-gray-200" />
        <Skeleton className="h-4 w-[250px] bg-gray-200" />
      </div>
      <Skeleton className="h-10 w-full sm:w-[150px] bg-gray-200 rounded" />
    </div>

    {/* Stats Grid Skeleton */}
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <StatsCardSkeleton key={i} />
      ))}
    </div>

    {/* Active Jobs Skeleton */}
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-[180px] bg-gray-200" />
          <Skeleton className="h-9 w-[100px] bg-gray-200 rounded" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default function RecruiterDashboard() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const cookie = new Cookies();
  const [mounted, setMounted] = useState(false);

  const { 
    recruiterDashboardData, 
    recruiterProfileData,
    isLoading 
  } = useSelector((state: RootState) => state.Recruiter);

  //  Check authentication
  useEffect(() => {
    setMounted(true);
    const token = cookie.get("token");
    const userId = cookie.get("userId");

    if (!token || !userId) {
      router.push("/auth/login");
      return;
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(recruiterDashboard()),
        ]);
      } catch (err) {
        console.error("Dashboard fetch failed:", err);
        toast.error("Failed to load dashboard data");
      }
    };

    if (mounted) {
      fetchData();
    }
  }, [dispatch, mounted]);

  //  Show skeleton while loading
  if (!mounted || isLoading) {
    return <DashboardSkeleton />;
  }

  const dashboardData = recruiterDashboardData || {};
  const profileData = recruiterProfileData || {};

  const stats = [
    {
      title: "Total Jobs",
      value: dashboardData.totalJobs || 0,
      subtitle: `${dashboardData.activeJobs || 0} Active`,
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Applications",
      value: dashboardData.totalApllicationsCount || 0,
      subtitle: `${dashboardData.pendingApplictionsCount || 0} Pending`,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Accepted Applications",
      value: dashboardData.acceptedApplictionsCount || 0,
      subtitle: "This month",
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Rejected Applications",
      value: dashboardData.rejectedApplictionsCount || 0,
      subtitle: "This month",
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header with Profile Info */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome back, {profileData.name || "Recruiter"}!
          </h1>
          <p className="text-muted-foreground mt-1">
            {profileData.recruiterProfile?.designation || "Senior Recruiter"} at{" "}
            {dashboardData.company || "Your Company"}
          </p>
        </div>
        <Button className="w-full bg-blue-700 hover:bg-blue-800 cursor-pointer sm:w-auto" onClick={() => router.push("/recruiter/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Post New Job
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.subtitle}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Jobs Closing Soon */}
      {dashboardData.activeJobsClosingSoon > 0 && (
        <Card className="border-orange-200 bg-orange-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-orange-900">
                Jobs Closing Soon
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-orange-800">
              You have <strong>{dashboardData.activeJobsClosingSoon}</strong> job(s) 
              closing within the next 7 days.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-3 border-orange-300 hover:bg-orange-100"
              onClick={() => router.push("/recruiter/jobs?filter=closing-soon")}
            >
              View Jobs
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Jobs with Left Days */}
      {dashboardData.jobsWithLeftDays?.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Active Job Postings</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push("/recruiter/jobs")}
              >
                View All Jobs
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardData.jobsWithLeftDays.map((job: any) => (
                <div
                  key={job._id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => router.push(`/recruiter/jobs/${job._id}`)}
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.location}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                        {job.applicationsCount || 0} Applications
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">
                      {job.daysLeft} days left
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      Closes on {new Date(job.closingDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {dashboardData.totalJobs === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Briefcase className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Jobs Posted Yet
            </h3>
            <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
              Start hiring top talent by posting your first job opening.
            </p>
            <Button onClick={() => router.push("/recruiter/jobs/create")}>
              <Plus className="mr-2 h-4 w-4" />
              Post Your First Job
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
