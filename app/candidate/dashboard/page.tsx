"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { candidateDashboard } from "@/redux/slice/candidateSlice/candidateSlice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  Search, 
  User,
  ArrowRight
} from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Header from "@/pages/header/header";

//  Stats Card Skeleton
const StatsCardSkeleton = () => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <Skeleton className="h-4 w-24 bg-gray-200" />
      <Skeleton className="h-4 w-4 rounded bg-gray-200" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-9 w-16 bg-gray-200 mb-2" />
      <Skeleton className="h-3 w-32 bg-gray-200" />
    </CardContent>
  </Card>
);

//  Job Card Skeleton
const JobCardSkeleton = () => (
  <Card>
    <CardContent className="p-5 space-y-3">
      <Skeleton className="h-6 w-3/4 bg-gray-200" />
      <Skeleton className="h-4 w-1/2 bg-gray-200" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 bg-gray-200 rounded-md" />
        <Skeleton className="h-6 w-16 bg-gray-200 rounded-md" />
      </div>
    </CardContent>
  </Card>
);

//  Full Dashboard Skeleton
const DashboardSkeleton = () => (
  <div className="w-full max-w-6xl mx-auto p-4 space-y-8">
    {/* Welcome Section Skeleton */}
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full bg-gray-200" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-[250px] bg-gray-200" />
            <Skeleton className="h-4 w-[200px] bg-gray-200" />
          </div>
        </div>
        <Skeleton className="h-10 w-[130px] bg-gray-200 rounded" />
      </div>
    </div>

    {/* Stats Section Skeleton */}
    <div>
      <Skeleton className="h-6 w-24 bg-gray-200 mb-4" />
      <div className="grid gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <StatsCardSkeleton key={i} />
        ))}
      </div>
    </div>

    {/* Recommended Jobs Section Skeleton */}
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-[180px] bg-gray-200" />
          <Skeleton className="h-4 w-[150px] bg-gray-200" />
        </div>
        <Skeleton className="h-9 w-[100px] bg-gray-200 rounded" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

function CandidateDashboard() {
  const dispatch: AppDispatch = useDispatch();
  const { candidateDashboardData, isLoading, error } = useSelector(
    (state: RootState) => state.Candidate
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(candidateDashboard()).unwrap();
      } catch (err) {
        // console.error("Dashboard fetch failed", err);
      }
    };
    fetchData();
  }, [dispatch]);

  //  Show skeleton while loading
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  // Handle Error
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-red-600 mb-2">Error Loading Dashboard</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => dispatch(candidateDashboard())}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Handle Missing Data
  if (!candidateDashboardData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">No Dashboard Data</h3>
          <p className="text-muted-foreground">Unable to load your dashboard.</p>
        </div>
      </div>
    );
  }

  // Safe destructuring
  const candidateDetail = (candidateDashboardData as any)?.candidateDetail;
  const applicationsCount = (candidateDashboardData as any)?.applicationsCount || 0;
  const acceptedApplicationsCount = (candidateDashboardData as any)?.acceptedApplicationsCount || 0;
  const pendingApplicationsCount = (candidateDashboardData as any)?.pendingApplicationsCount || 0;
  const totalRecommendedJobs = (candidateDashboardData as any)?.totalRecommendedJobs || 0;
  const recommendedJobs = (candidateDashboardData as any)?.recommendedJobs || [];

  return (
    <>
    <Header/>
    <div className="w-full max-w-6xl mx-auto p-4 space-y-8">
      
      {/* Welcome Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/10">
            <AvatarImage 
              src={candidateDetail?.profilePicture} 
              alt={candidateDetail?.name || "User"} 
              className="object-cover"
            />
            <AvatarFallback className="text-lg font-bold bg-primary/5 text-primary">
              {candidateDetail?.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome back, {candidateDetail?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-muted-foreground">
              Ready to find your next opportunity?
            </p>
          </div>
        </div>
        
        <Link href="/candidate/profile"> 
          <Button className="gap-2 bg-blue-700 hover:bg-blue-800 cursor-pointer">
            <User className="h-4 w-4" />
            View Profile
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {/* Total Applications */}
          <Card className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Briefcase className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{applicationsCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Jobs applied so far</p>
            </CardContent>
          </Card>

          {/* Accepted Applications */}
          <Card className="hover:shadow-md transition-shadow border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Accepted</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{acceptedApplicationsCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Applications shortlisted</p>
            </CardContent>
          </Card>

          {/* Pending Applications */}
          <Card className="hover:shadow-md transition-shadow border-l-4 border-l-amber-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingApplicationsCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Awaiting recruiter response</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recommended Jobs Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">Recommended Jobs</h3>
            <p className="text-sm text-muted-foreground">
              {totalRecommendedJobs} jobs match your profile
            </p>
          </div>
          {totalRecommendedJobs > 0 && (
            <Button variant="outline" size="sm" className="gap-2">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Recommended Jobs List or Empty State */}
        {recommendedJobs.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommendedJobs.map((job: any, index: number) => (
              <Card key={index} className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-5">
                  <h4 className="font-bold text-lg mb-1">{job.title || "Software Engineer"}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{job.company || "Tech Corp"}</p>
                  <div className="flex gap-2">
                    <span className="text-xs bg-secondary px-2 py-1 rounded-md">Full-time</span>
                    <span className="text-xs bg-secondary px-2 py-1 rounded-md">Remote</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-muted/50 border-dashed shadow-none">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-background p-4 rounded-full shadow-sm mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No recommendations yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-2 mb-6">
                We are currently analyzing your profile to find the best job matches for you. Check back soon!
              </p>
              
              <Link href="/candidate/profile">
                <Button className="bg-blue-700 hover:bg-blue-800" variant="default">
                  Update Profile Skills
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
    </>
  );
}

export default CandidateDashboard;
