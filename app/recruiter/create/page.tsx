"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { addJob } from "@/redux/slice/recruiterSlice/recruiterSlice";
import { AppDispatch } from "@/redux/store/store";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";

const locations = [
  { name: "kolkata", id: "6841c7c5ba1fc9d2864095de" },
  { name: "Bengaluru", id: "6841ca58ba1fc9d2864095ec" },
  { name: "Mumbai", id: "6841c4fbba1fc9d2864095da" },
  { name: "Hyderabad", id: "6841cab2ba1fc9d2864095f8" },
];

const industries = [
  { id: "684062ca2da1edfbf0b16d0b", name: "Information Technology" },
  { id: "684063492da1edfbf0b16d0e", name: "BPO" },
  { id: "684063dc2da1edfbf0b16d15", name: "Electronics Manufacturing" },
  { id: "6841298152c31fe968573149", name: "Banking" },
  { id: "68428fb875fcc3ce407f9e66", name: "Marketing/Advertising" },
  { id: "6842904875fcc3ce407f9e72", name: "Others" },
  { id: "6842905075fcc3ce407f9e76", name: "Education" },
  { id: "684ebadd3a788285bde5fd7a", name: "Manufacturing" },
  { id: "684ebb1f3a788285bde5fd81", name: "Financial Services" },
  { id: "684ebb2e3a788285bde5fd85", name: "Consulting" },
  { id: "68710e012f26f96f906fc47c", name: "Health cares" },
  { id: "687b388e213331cd3fe4f6d4", name: "Hotel" },
];

const jobCategories = [
  { id: "68428e3375fcc3ce407f9e55", name: "Software Developer / Engineer" },
  { id: "68428ff075fcc3ce407f9e6d", name: "System Administrator" },
  { id: "68432b8a8772bd72cb93d6b9", name: "Digital Marketing" },
  { id: "684eb790f43523fe5d3ae472", name: "Data Science & Analytics" },
  { id: "684eb8bb3a788285bde5fd2c", name: "Web Design & Development" },
  { id: "684eb8ec3a788285bde5fd32", name: "Teaching & Training" },
  { id: "684eb9063a788285bde5fd35", name: "Finance & Accounting" },
  { id: "684eb91b3a788285bde5fd38", name: "Quality Assurance" },
  { id: "6868bad353ce1161c147833f", name: "Human Resources" },
  { id: "6868bb4b53ce1161c1478345", name: "Manufacturing / Designing / R&D" },
  { id: "6868bf6253ce1161c147835d", name: "Project Management" },
  { id: "6868bfa053ce1161c1478363", name: "Quality Management" },
  { id: "6868c22d53ce1161c1478367", name: "Content Writing" },
  { id: "687b391d213331cd3fe4f6d7", name: "Reception / Front Desk" },
];

const skills = [
  { id: "68741497abdee156ef548fc4", name: "Analytical Skills" },
  { id: "687413beabdee156ef548f86", name: "AutoCAD" },
  { id: "6850ea054c9560057dcf5424", name: "Bootstrap" },
  { id: "6850044389ac97ace5f0d818", name: "Communication Skills" },
  { id: "687b3b2cdcab2ca53a87d5eb", name: "Customer service" },
  { id: "6850044989ac97ace5f0d81c", name: "Digital Marketing" },
  { id: "68480c242e0f371f4b04c5a4", name: "Git" },
  { id: "68414a24c9c551d782ec80a4", name: "Google Analytics" },
  { id: "68414a07c9c551d782ec80a0", name: "Hootsuite" },
  { id: "685005f289ac97ace5f0d820", name: "HR Analytics Tools" },
  { id: "6841491fc9c551d782ec8078", name: "Azure" },
  { id: "6841474572fe381513c4e0f8", name: "Express" },
  { id: "6850060089ac97ace5f0d824", name: "Payroll Software" },
  { id: "6841495fc9c551d782ec8084", name: "PostgreSQL" },
  { id: "691c047c9a43a4f6e58e395b", name: "React" },
  { id: "6850ea814c9560057dcf5430", name: "React.js" },
  { id: "6850eacb4c9560057dcf543c", name: "React Native" },
  { id: "6850ea864c9560057dcf5434", name: "Redux" },
  { id: "6841483bc9c551d782ec805c", name: "Matlab" },
  { id: "684148c5c9c551d782ec8069", name: "MongoDB" },
  { id: "68414973c9c551d782ec808c", name: "Power BI" },
  { id: "68414988c9c551d782ec8090", name: "Tableau" },
  { id: "68414996c9c551d782ec8094", name: "Hadoop" },
  { id: "6841487bc9c551d782ec8061", name: "HTML/CSS" },
  { id: "684148f3c9c551d782ec8070", name: "Python" },
];

//  Job Form Skeleton
const JobFormSkeleton = () => (
  <div className="space-y-6 bg-white p-6 rounded-lg border border-gray-200">
    {/* Form Fields Skeleton */}
    {[...Array(8)].map((_, i) => (
      <div key={i} className="space-y-2">
        <Skeleton className="h-4 w-32 bg-gray-200" />
        <Skeleton className="h-10 w-full bg-gray-200 rounded" />
      </div>
    ))}

    {/* Text Area Skeleton */}
    <div className="space-y-2">
      <Skeleton className="h-4 w-40 bg-gray-200" />
      <Skeleton className="h-32 w-full bg-gray-200 rounded" />
    </div>

    {/* Multi-select Skeleton */}
    <div className="space-y-2">
      <Skeleton className="h-4 w-24 bg-gray-200" />
      <div className="flex flex-wrap gap-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 bg-gray-200 rounded-full" />
        ))}
      </div>
    </div>

    {/* Buttons Skeleton */}
    <div className="flex gap-3 pt-4">
      <Skeleton className="h-10 w-24 bg-gray-200 rounded" />
      <Skeleton className="h-10 w-32 bg-gray-200 rounded" />
    </div>
  </div>
);

//  Full Page Skeleton
const CreateJobPageSkeleton = () => (
  <div className="container max-w-4xl mx-auto py-8">
    <div className="mb-6 space-y-2">
      <Skeleton className="h-9 w-[280px] bg-gray-200" />
      <Skeleton className="h-4 w-[350px] bg-gray-200" />
    </div>
    <JobFormSkeleton />
  </div>
);

//  Dynamically import the form component
const CreateJobForm = dynamic(
  () => import("@/components/ui/com/recruiter/jobs/addJobCard").then(
    mod => ({ default: mod.CreateJobForm })
  ),
  {
    loading: () => <JobFormSkeleton />,
    ssr: false, 
  }
);

export default function CreateJobPage() {
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = async (data: any) => {
    console.log(data, "dataaaa");
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await dispatch(addJob(data)).unwrap();
    } catch (err) {
      console.error("Job creation failed:", err);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create New Job Post</h1>
        <p className="text-muted-foreground">
          Fill in the details to post a new job opening
        </p>
      </div>
      <CreateJobForm
        locations={locations}
        industries={industries}
        jobCategories={jobCategories}
        skills={skills}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
