"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useForm,SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
// import  { useForm, } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Calendar,
  Users,
  Building2,
  ArrowLeft,
  Loader2,
  X,
  Clock,
  Laptop,
  TrendingUp,
  Award,
  IndianRupee,
} from "lucide-react";
import {
  getJobDetails,
  updateJob,
} from "@/redux/slice/recruiterSlice/recruiterSlice";

// Validation Schema - Fixed
const editJobSchema = yup.object().shape({
  title: yup
    .string()
    .required("Job title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),
  description: yup
    .string()
    .required("Job description is required")
    .min(50, "Description must be at least 50 characters"),
  location: yup
    .array()
    .of(yup.string().required())
    .min(1, "At least one location is required")
    .required("Location is required"),
  industry: yup.string().required("Industry is required"),
  jobCategory: yup.string().required("Job category is required"),
  jobType: yup.string().required("Job type is required"),
  workMode: yup.string().required("Work mode is required"),
  experienceLevel: yup.string().required("Experience level is required"),
  minimumExperience: yup
    .number()
    .required("Minimum experience is required")
    .min(0, "Cannot be negative")
    .typeError("Must be a number"),
  maximumExperience: yup
    .number()
    .required("Maximum experience is required")
    .min(yup.ref("minimumExperience"), "Must be greater than minimum")
    .typeError("Must be a number"),
  minimumSalary: yup
    .number()
    .required("Minimum salary is required")
    .transform((value, original) =>
      original === "" || original === null ? undefined : value
    )
    .min(0, "Cannot be negative")
    .typeError("Must be a number"),
  maximumSalary: yup
    .number()
    .required("Maximum salary is required")
    .transform((value, original) =>
      original === "" || original === null ? undefined : value
    )
    .when("minimumSalary", {
      is: (val: number | undefined) => val !== undefined && val > 0,
      then: (schema) =>
        schema.min(
          yup.ref("minimumSalary"),
          "Must be greater than minimum salary"
        ),
    })
    .typeError("Must be a number"),
  skillsRequired: yup
    .array()
    .of(yup.string().required())
    .min(1, "At least one skill is required")
    .required("Skills are required"),
  applicationDeadline: yup
    .date()
    .required("Application deadline is required")
    .min(new Date(), "Deadline must be in the future"),
  vacancies: yup
    .number()
    .required("Vacancies is required")
    .transform((value, original) =>
      original === "" || original === null ? undefined : value
    )
    .min(1, "Must be at least 1")
    .typeError("Must be a number"),
});

// Update interface to match
interface EditJobFormData {
  title: string;
  description: string;
  location: string[];
  industry: string;
  jobCategory: string;
  jobType: string;
  workMode: string;
  experienceLevel: string;
  minimumExperience: number;
  maximumExperience: number;
  minimumSalary?: number;
  maximumSalary?: number;
  skillsRequired: string[];
  applicationDeadline: Date;
  vacancies?: number;
}

// Skeleton Component
const EditJobSkeleton = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>
    </div>
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48 mb-2" />
        <Skeleton className="h-4 w-full" />
      </CardHeader>
      <CardContent className="space-y-6">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
);

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const jobId = params?.slug as string;

  const { jobDetails, isLoading } = useSelector(
    (state: RootState) => state.Recruiter
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const categories = [
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

  const allLocations = [
    { id: "6841c7c5ba1fc9d2864095de", name: "Kolkata" },
    { id: "6841ca58ba1fc9d2864095ec", name: "Bengaluru" },
    { id: "6841c4fbba1fc9d2864095da", name: "Mumbai" },
    { id: "6841cab2ba1fc9d2864095f8", name: "Hyderabad" },
  ];

  const allSkills = [
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

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useForm<EditJobFormData>({
    resolver: yupResolver(editJobSchema),
    defaultValues: {
      title: "",
      description: "",
      location: [],
      industry: "",
      jobCategory: "",
      jobType: "",
      workMode: "",
      experienceLevel: "",
      minimumExperience: 0,
      maximumExperience: 0,
      minimumSalary: undefined,
      maximumSalary: undefined,
      skillsRequired: [],
      applicationDeadline: new Date(),
      vacancies: undefined,
    },
  });

  useEffect(() => {
    if (jobId) {
      dispatch(getJobDetails({ id: jobId }));
    }
  }, [dispatch, jobId]);

  useEffect(() => {
    if (jobDetails && jobDetails._id === jobId) {
      setValue("title", jobDetails.title);
      setValue("description", jobDetails.description);
      setValue(
        "location",
        jobDetails.location.map((loc: { _id: string }) => loc._id)
      );
      setValue("industry", jobDetails.industry._id);
      setValue("jobCategory", jobDetails.jobCategory._id);
      setValue("jobType", jobDetails.jobType);
      setValue("workMode", jobDetails.workMode);
      setValue("experienceLevel", jobDetails.experienceLevel);
      setValue("minimumExperience", jobDetails.minimumExperience);
      setValue("maximumExperience", jobDetails.maximumExperience);
      setValue("minimumSalary", jobDetails.minimumSalary || undefined);
      setValue("maximumSalary", jobDetails.maximumSalary || undefined);
      setValue(
        "skillsRequired",
        jobDetails.skillsRequired.map((skill:{_id: string}) => skill._id)
      );
      setValue("applicationDeadline", new Date(jobDetails.applicationDeadline));
      setValue("vacancies", jobDetails.vacancies || undefined);
    }
  }, [jobDetails, jobId, setValue]);

  const onSubmit: SubmitHandler<EditJobFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const formattedData = {
        ...data,
        applicationDeadline: data.applicationDeadline
          .toISOString()
          .split("T")[0],
        minimumSalary: data.minimumSalary ?? null,
        maximumSalary: data.maximumSalary ?? null,
        vacancies: data.vacancies !== undefined ? data.vacancies : null,
      };

      await dispatch(updateJob({ id: jobId, data: formattedData })).unwrap();
      toast.success("Job updated successfully!");
      router.push("/recruiter/jobs");
    } catch (error: any) {
      if (error?.errors) {
        Object.entries(error.errors).forEach(([field, message]) => {
          toast.error(`${field}: ${message}`);
        });
      } else {
        toast.error(error?.message || "Failed to update job");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedLocations = watch("location") || [];
  const selectedSkills = watch("skillsRequired") || [];

  const removeLocation = (locationId: string) => {
    setValue(
      "location",
      selectedLocations.filter((id) => id !== locationId)
    );
  };

  const addLocation = (locationId: string) => {
    if (!selectedLocations.includes(locationId)) {
      setValue("location", [...selectedLocations, locationId]);
    }
  };

  const removeSkill = (skillId: string) => {
    setValue(
      "skillsRequired",
      selectedSkills.filter((id) => id !== skillId)
    );
  };

  const addSkill = (skillId: string) => {
    if (!selectedSkills.includes(skillId)) {
      setValue("skillsRequired", [...selectedSkills, skillId]);
    }
  };

  if (isLoading || !jobDetails) {
    return (
      <div className="container mx-auto py-6 px-4 max-w-6xl">
        <EditJobSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto py-6 px-4 max-w-5xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="h-10 w-10 hover:bg-blue-50"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
              Edit Job Posting
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Update your job listing details
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Building2 className="h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription>Essential details about the job</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {/* Job Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-700 font-medium">
                  Job Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Senior Backend Developer"
                  {...register("title")}
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-gray-700 font-medium"
                >
                  Job Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe the role..."
                  rows={6}
                  {...register("description")}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Industry & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-gray-700 font-medium">
                    Industry <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="industry"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          className={errors.industry ? "border-red-500" : ""}
                        >
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((ind) => (
                            <SelectItem key={ind.id} value={ind.id}>
                              {ind.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.industry && (
                    <p className="text-sm text-red-500">
                      {errors.industry.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="jobCategory"
                    className="text-gray-700 font-medium"
                  >
                    Job Category <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="jobCategory"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          className={errors.jobCategory ? "border-red-500" : ""}
                        >
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.jobCategory && (
                    <p className="text-sm text-red-500">
                      {errors.jobCategory.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Type & Work Details */}
          <Card className="border-l-4 border-l-green-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Clock className="h-5 w-5" />
                Job Type & Work Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jobType" className="text-gray-700 font-medium">
                    Job Type <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="jobType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          className={errors.jobType ? "border-red-500" : ""}
                        >
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.jobType && (
                    <p className="text-sm text-red-500">
                      {errors.jobType.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workMode" className="text-gray-700 font-medium">
                    <Laptop className="h-4 w-4 inline mr-1" />
                    Work Mode <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="workMode"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          className={errors.workMode ? "border-red-500" : ""}
                        >
                          <SelectValue placeholder="Select mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="work from office">
                            Work from Office
                          </SelectItem>
                          <SelectItem value="work from home">
                            Work from Home
                          </SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.workMode && (
                    <p className="text-sm text-red-500">
                      {errors.workMode.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="experienceLevel"
                    className="text-gray-700 font-medium"
                  >
                    <TrendingUp className="h-4 w-4 inline mr-1" />
                    Level <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="experienceLevel"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          className={
                            errors.experienceLevel ? "border-red-500" : ""
                          }
                        >
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fresher">Fresher</SelectItem>
                          <SelectItem value="entry-level">Entry Level</SelectItem>
                          <SelectItem value="mid-level">Mid Level</SelectItem>
                          <SelectItem value="senior">Senior</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.experienceLevel && (
                    <p className="text-sm text-red-500">
                      {errors.experienceLevel.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience & Salary */}
          <Card className="border-l-4 border-l-purple-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Award className="h-5 w-5" />
                Experience & Compensation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="minimumExperience"
                    className="text-gray-700 font-medium"
                  >
                    Min Experience (years) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="minimumExperience"
                    type="number"
                    min="0"
                    placeholder="e.g., 1"
                    {...register("minimumExperience", {
                      valueAsNumber: true,
                    })}
                    className={errors.minimumExperience ? "border-red-500" : ""}
                  />
                  {errors.minimumExperience && (
                    <p className="text-sm text-red-500">
                      {errors.minimumExperience.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="maximumExperience"
                    className="text-gray-700 font-medium"
                  >
                    Max Experience (years) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="maximumExperience"
                    type="number"
                    min="0"
                    placeholder="e.g., 5"
                    {...register("maximumExperience", {
                      valueAsNumber: true,
                    })}
                    className={errors.maximumExperience ? "border-red-500" : ""}
                  />
                  {errors.maximumExperience && (
                    <p className="text-sm text-red-500">
                      {errors.maximumExperience.message}
                    </p>
                  )}
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="minimumSalary"
                    className="text-gray-700 font-medium"
                  >
                    <IndianRupee className="h-4 w-4 inline mr-1" />
                    Min Salary (₹/year)
                  </Label>
                  <Input
                    id="minimumSalary"
                    type="number"
                    min="0"
                    placeholder="e.g., 400000"
                    {...register("minimumSalary", {
                      setValueAs: (v) => (v === "" ? undefined : Number(v)),
                    })}
                    className={errors.minimumSalary ? "border-red-500" : ""}
                  />
                  {errors.minimumSalary && (
                    <p className="text-sm text-red-500">
                      {errors.minimumSalary.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="maximumSalary"
                    className="text-gray-700 font-medium"
                  >
                    <IndianRupee className="h-4 w-4 inline mr-1" />
                    Max Salary (₹/year)
                  </Label>
                  <Input
                    id="maximumSalary"
                    type="number"
                    min="0"
                    placeholder="e.g., 600000"
                    {...register("maximumSalary", {
                      setValueAs: (v) => (v === "" ? undefined : Number(v)),
                    })}
                    className={errors.maximumSalary ? "border-red-500" : ""}
                  />
                  {errors.maximumSalary && (
                    <p className="text-sm text-red-500">
                      {errors.maximumSalary.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Locations & Skills */}
          <Card className="border-l-4 border-l-orange-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <MapPin className="h-5 w-5" />
                Locations & Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-3">
                <Label className="text-gray-700 font-medium">
                  Locations <span className="text-red-500">*</span>
                </Label>

                {selectedLocations.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 rounded-lg border border-blue-200">
                    {selectedLocations.map((locId) => {
                      const location = allLocations.find((l) => l.id === locId);
                      return location ? (
                        <Badge
                          key={locId}
                          variant="secondary"
                          className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                        >
                          <MapPin className="h-3 w-3 mr-1" />
                          {location.name}
                          <X
                            className="h-3 w-3 ml-2 cursor-pointer hover:text-red-600"
                            onClick={() => removeLocation(locId)}
                          />
                        </Badge>
                      ) : null;
                    })}
                  </div>
                )}

                <Select onValueChange={addLocation}>
                  <SelectTrigger
                    className={errors.location ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Add location..." />
                  </SelectTrigger>
                  <SelectContent>
                    {allLocations
                      .filter((loc) => !selectedLocations.includes(loc.id))
                      .map((loc) => (
                        <SelectItem key={loc.id} value={loc.id}>
                          {loc.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {errors.location && (
                  <p className="text-sm text-red-500">
                    {errors.location.message}
                  </p>
                )}
              </div>

              <Separator />

              <div className="space-y-3">
                <Label className="text-gray-700 font-medium">
                  Required Skills <span className="text-red-500">*</span>
                </Label>

                {selectedSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 rounded-lg border border-purple-200">
                    {selectedSkills.map((skillId) => {
                      const skill = allSkills.find((s) => s.id === skillId);
                      return skill ? (
                        <Badge
                          key={skillId}
                          variant="secondary"
                          className="bg-purple-100 text-purple-700 hover:bg-purple-200"
                        >
                          <Award className="h-3 w-3 mr-1" />
                          {skill.name}
                          <X
                            className="h-3 w-3 ml-2 cursor-pointer hover:text-red-600"
                            onClick={() => removeSkill(skillId)}
                          />
                        </Badge>
                      ) : null;
                    })}
                  </div>
                )}

                <Select onValueChange={addSkill}>
                  <SelectTrigger
                    className={errors.skillsRequired ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Add skill..." />
                  </SelectTrigger>
                  <SelectContent>
                    {allSkills
                      .filter((skill) => !selectedSkills.includes(skill.id))
                      .map((skill) => (
                        <SelectItem key={skill.id} value={skill.id}>
                          {skill.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {errors.skillsRequired && (
                  <p className="text-sm text-red-500">
                    {errors.skillsRequired.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Deadline & Vacancies */}
          <Card className="border-l-4 border-l-red-500 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <Calendar className="h-5 w-5" />
                Application Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="applicationDeadline"
                    className="text-gray-700 font-medium"
                  >
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Application Deadline <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="applicationDeadline"
                    type="date"
                    {...register("applicationDeadline", {
                      setValueAs: (v) => (v ? new Date(v) : new Date()),
                    })}
                    className={
                      errors.applicationDeadline ? "border-red-500" : ""
                    }
                  />
                  {errors.applicationDeadline && (
                    <p className="text-sm text-red-500">
                      {errors.applicationDeadline.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="vacancies"
                    className="text-gray-700 font-medium"
                  >
                    <Users className="h-4 w-4 inline mr-1" />
                    Number of Vacancies
                  </Label>
                  <Input
                    id="vacancies"
                    type="number"
                    min="1"
                    placeholder="e.g., 5"
                    {...register("vacancies", {
                      setValueAs: (v) => (v === "" ? undefined : Number(v)),
                    })}
                    className={errors.vacancies ? "border-red-500" : ""}
                  />
                  {errors.vacancies && (
                    <p className="text-sm text-red-500">
                      {errors.vacancies.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-6 bg-blue-700 hover:bg-blue-800 text-white"
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? "Updating..." : "Update Job"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
