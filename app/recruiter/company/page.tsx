"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getCompanyDetails,
  updateCompanyDetails,
} from "@/redux/slice/recruiterSlice/recruiterSlice";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

// Company Profile Card Skeleton
const CompanyProfileSkeleton = () => (
  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
    {/* Header Section */}
    <div className="p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <Skeleton className="h-20 w-20 rounded-lg bg-gray-200" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-[200px] bg-gray-200" />
            <Skeleton className="h-4 w-[150px] bg-gray-200" />
            <Skeleton className="h-4 w-[180px] bg-gray-200" />
          </div>
        </div>
        <Skeleton className="h-10 w-24 bg-gray-200 rounded" />
      </div>
    </div>

    {/* Divider */}
    <div className="border-t border-gray-200" />

    {/* Details Section */}
    <div className="p-6 space-y-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex items-start gap-3">
          <Skeleton className="h-5 w-5 bg-gray-200 rounded" />
          <div className="flex-1 space-y-1">
            <Skeleton className="h-4 w-24 bg-gray-200" />
            <Skeleton className="h-5 w-full bg-gray-200" />
          </div>
        </div>
      ))}
    </div>

    {/* Description Section */}
    <div className="border-t border-gray-200 p-6 space-y-3">
      <Skeleton className="h-5 w-32 bg-gray-200" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full bg-gray-200" />
        <Skeleton className="h-4 w-full bg-gray-200" />
        <Skeleton className="h-4 w-3/4 bg-gray-200" />
      </div>
    </div>
  </div>
);

// Full Page Skeleton
const CompanySettingsPageSkeleton = () => (
  <div className="space-y-6">
    <div className="space-y-2">
      <Skeleton className="h-9 w-[250px] bg-gray-200" />
      <Skeleton className="h-4 w-[350px] bg-gray-200" />
    </div>
    <CompanyProfileSkeleton />
  </div>
);

// Dynamically import components
const CompanyProfileCard = dynamic(
  () => import("@/components/ui/com/recruiter/company/companyProfileCard"),
  {
    loading: () => <CompanyProfileSkeleton />,
    ssr: false,
  }
);

const EditCompanyModal = dynamic(
  () => import("@/components/ui/com/recruiter/company/editCompanyModal"),
  {
    loading: () => null,
    ssr: false,
  }
);

export default function CompanySettingsPage() {
  const dispatch: AppDispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { companyDetails, isLoading } = useSelector(
    (state: RootState) => state.Recruiter
  );

  useEffect(() => {
    dispatch(getCompanyDetails());
  }, [dispatch]);

  const handleEdit = () => setIsEditModalOpen(true);

  const handleModalchange = (isOpen: boolean) => setIsEditModalOpen(isOpen);

  //  Properly handle FormData with logo
  const handleSave = async (formData: any, logoFile?: File) => {
    try {
      console.log("💾 Saving company data:", formData);
      console.log("📷 Logo file:", logoFile);

    
      const form = new FormData();
      
      // Append text fields
      form.append("name", formData.name);
      form.append("email", formData.email);
      
      if (formData.website) {
        form.append("website", formData.website);
      }
      
      if (formData.description) {
        form.append("description", formData.description);
      }
      
      
      if (logoFile) {
        form.append("logo", logoFile);
        console.log(" Logo added to FormData");
      }

      // Dispatch the update with FormData
      await dispatch(
        updateCompanyDetails({
          id: companyDetails._id,
          formdata: form, 
        })
      ).unwrap();

      toast.success("Company profile updated successfully!");
      
      // Refetch company details to get updated data including new logo
      dispatch(getCompanyDetails());
      
      setIsEditModalOpen(false);
    } catch (err: any) {
      console.error("Company update failed:", err);
      toast.error(err?.message || "Failed to update company profile");
      throw err; // Re-throw to keep modal open on error
    }
  };

  // Show skeleton while loading
  if (isLoading) {
    return <CompanySettingsPageSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Company Profile
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your company information and settings
        </p>
      </div>

      <CompanyProfileCard companyData={companyDetails} onEdit={handleEdit} />

      <EditCompanyModal
        open={isEditModalOpen}
        onOpenChange={handleModalchange}
        companyData={companyDetails}
        onSave={handleSave}
      />
    </div>
  );
}
