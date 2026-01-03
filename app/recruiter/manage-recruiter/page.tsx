
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store/store";
import { manageRecruiters } from "@/redux/slice/recruiterSlice/recruiterSlice";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

//  Reusable Table Skeleton Component
const TableSkeleton = () => (
  <div className="space-y-4 p-4">
    {/* Page Header Skeleton */}
    <div className="flex items-center justify-between mb-6">
      <Skeleton className="h-8 w-[250px] bg-gray-200" />
      <Skeleton className="h-10 w-[120px] bg-gray-200" />
    </div>

    <div className="rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      {/* Table Header */}
      <div className="flex gap-6 border-b border-gray-200 bg-gray-100 p-4">
        <Skeleton className="h-6 w-[200px] bg-gray-300" />
        <Skeleton className="h-6 w-[150px] bg-gray-300" />
        <Skeleton className="h-6 w-[150px] bg-gray-300" />
        <Skeleton className="h-6 w-[100px] bg-gray-300" />
      </div>
      
      {/* Data Rows */}
      {[...Array(8)].map((_, i) => (
        <div 
          key={i} 
          className="flex gap-6 border-b border-gray-100 p-4 last:border-0 bg-white hover:bg-gray-50"
        >
          <Skeleton className="h-5 w-[200px] bg-gray-200" />
          <Skeleton className="h-5 w-[150px] bg-gray-200" />
          <Skeleton className="h-5 w-[150px] bg-gray-200" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-[45px] bg-gray-200 rounded" />
            <Skeleton className="h-8 w-[45px] bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>

    {/* Pagination Skeleton */}
    <div className="flex items-center justify-between pt-4">
      <Skeleton className="h-5 w-[180px] bg-gray-200" />
      <div className="flex gap-2">
        <Skeleton className="h-9 w-[90px] bg-gray-200 rounded" />
        <Skeleton className="h-9 w-[90px] bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);

//  Dynamically import the table component
const ManageRecruitersTable = dynamic(
  () =>
    import("@/components/ui/com/manageRecruiters/manageRecruiterTable").then(
      (mod) => ({ default: mod.ManageRecruitersTable })
    ),
  {
    loading: () => <TableSkeleton />,
    ssr: false,
  }
);

//  Main Page Component 
export default function ManageRecruitersPage() {
  const dispatch: AppDispatch = useDispatch();

  const { manageRecruitersData, isLoading } = useSelector(
    (state: RootState) => state.Recruiter
  );

  useEffect(() => {
    dispatch(manageRecruiters());
  }, [dispatch]);

  const handleView = (id: string) => {
    console.log("view", id);
  };

  const handleToggleActive = (id: string, current: boolean) => {
    console.log("toggle", id, current ? "deactivate" : "activate");
  };

  //  Show skeleton while fetching data from Redux
  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="space-y-4">
      <ManageRecruitersTable
        data={manageRecruitersData || []}
        onView={handleView}
        onToggleActive={handleToggleActive}
      />
    </div>
  );
}
