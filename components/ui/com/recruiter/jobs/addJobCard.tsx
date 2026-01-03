"use client";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  AlertCircle,
  X,
  Loader2,
} from "lucide-react";
import { useState, useMemo } from "react";

// ✅ Validation Schema
const jobSchema = yup.object({
  title: yup
    .string()
    .required("Job title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: yup
    .string()
    .required("Job description is required")
    .min(50, "Description must be at least 50 characters")
    .max(2000, "Description must not exceed 2000 characters"),
  location: yup
    .array()
    .of(yup.string())
    .min(1, "At least one location is required")
    .required("Location is required"),
  industry: yup.string().required("Industry is required"),
  jobCategory: yup.string().required("Job category is required"),
  jobType: yup.string().required("Job type is required"),
  workMode: yup.string().required("Work mode is required"),
  experienceLevel: yup.string().required("Experience level is required"),
  minimumExperience: yup
    .number()
    .typeError("Must be a number")
    .min(0, "Cannot be negative")
    .required("Minimum experience is required"),
  maximumExperience: yup
    .number()
    .typeError("Must be a number")
    .min(yup.ref("minimumExperience"), "Must be greater than minimum")
    .required("Maximum experience is required"),
  minimumSalary: yup
    .number()
    .typeError("Must be a number")
    .min(0, "Cannot be negative")
    .required("Minimum salary is required"),
  maximumSalary: yup
    .number()
    .typeError("Must be a number")
    .min(yup.ref("minimumSalary"), "Must be greater than minimum salary")
    .required("Maximum salary is required"),
  skillsRequired: yup
    .array()
    .of(yup.string())
    .min(1, "At least one skill is required")
    .required("Skills are required"),
  applicationDeadline: yup
    .string()
    .required("Application deadline is required")
    .test("future-date", "Deadline must be in the future", (value) => {
      return new Date(value) > new Date();
    }),
  vacancies: yup
    .number()
    .typeError("Must be a number")
    .min(1, "At least 1 vacancy required")
    .required("Number of vacancies is required"),
});

type JobFormData = yup.InferType<typeof jobSchema>;

interface CreateJobFormProps {
  locations: { id: string; name: string }[];
  industries: { id: string; name: string }[];
  jobCategories: { id: string; name: string }[];
  skills: { id: string; name: string }[];
  onSubmit: (data: JobFormData) => Promise<void>;
}

export function CreateJobForm({
  locations,
  industries,
  jobCategories,
  skills,
  onSubmit,
}: CreateJobFormProps) {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // ✅ FIX 1: Remove duplicate skills using useMemo
  const uniqueSkills = useMemo(() => {
    return Array.from(
      new Map(skills.map((skill) => [skill.id, skill])).values()
    );
  }, [skills]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset, // ✅ Add reset function
    formState: { errors, isSubmitting },
  } = useForm<JobFormData>({
    resolver: yupResolver(jobSchema),
    defaultValues: {
      location: [],
      skillsRequired: [],
    },
  });

  const description = watch("description");

  // Add location
  const handleAddLocation = (locationId: string) => {
    if (!selectedLocations.includes(locationId)) {
      const updated = [...selectedLocations, locationId];
      setSelectedLocations(updated);
      setValue("location", updated, { shouldValidate: true });
    }
  };

  // Remove location
  const handleRemoveLocation = (locationId: string) => {
    const updated = selectedLocations.filter((id) => id !== locationId);
    setSelectedLocations(updated);
    setValue("location", updated, { shouldValidate: true });
  };

  // Add skill
  const handleAddSkill = (skillId: string) => {
    if (!selectedSkills.includes(skillId)) {
      const updated = [...selectedSkills, skillId];
      setSelectedSkills(updated);
      setValue("skillsRequired", updated, { shouldValidate: true });
    }
  };

  // Remove skill
  const handleRemoveSkill = (skillId: string) => {
    const updated = selectedSkills.filter((id) => id !== skillId);
    setSelectedSkills(updated);
    setValue("skillsRequired", updated, { shouldValidate: true });
  };

  const getLocationName = (id: string) =>
    locations.find((l) => l.id === id)?.name || id;

  const getSkillName = (id: string) =>
    uniqueSkills.find((s) => s.id === id)?.name || id;

  // ✅ Wrap onSubmit to reset form after success
  const handleFormSubmit = async (data: JobFormData) => {
    try {
      await onSubmit(data);
      // Reset the form after successful submission
      reset();
      // Reset local state for locations and skills
      setSelectedLocations([]);
      setSelectedSkills([]);
    } catch (error) {
      // Handle error (form will not reset if submission fails)
      console.error("Form submission error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-blue-600" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Job Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Job Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="e.g. Senior Backend Developer"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Job Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Describe the role, responsibilities, and requirements..."
              rows={6}
              className={`resize-none ${
                errors.description ? "border-red-500" : ""
              }`}
              maxLength={2000}
            />
            <div className="flex justify-between items-center">
              {errors.description ? (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.description.message}
                </p>
              ) : (
                <span />
              )}
              <p className="text-xs text-gray-500">
                {description?.length || 0}/2000
              </p>
            </div>
          </div>

          {/* Industry & Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Industry */}
            <div className="space-y-2">
              <Label htmlFor="industry">
                Industry <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="industry"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={errors.industry ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry.id} value={industry.id}>
                          {industry.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.industry && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.industry.message}
                </p>
              )}
            </div>

            {/* Job Category */}
            <div className="space-y-2">
              <Label htmlFor="jobCategory">
                Job Category <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="jobCategory"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={errors.jobCategory ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.jobCategory && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.jobCategory.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-600" />
            Job Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Location */}
          <div className="space-y-2">
            <Label>
              Location(s) <span className="text-red-500">*</span>
            </Label>
            <Select onValueChange={handleAddLocation}>
              <SelectTrigger
                className={errors.location ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Add locations" />
              </SelectTrigger>
              <SelectContent>
                {locations
                  .filter((loc) => !selectedLocations.includes(loc.id))
                  .map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {selectedLocations.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedLocations.map((locId) => (
                  <Badge
                    key={locId}
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {getLocationName(locId)}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => handleRemoveLocation(locId)}
                    />
                  </Badge>
                ))}
              </div>
            )}
            {errors.location && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Job Type & Work Mode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Job Type <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="jobType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={errors.jobType ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full Time</SelectItem>
                      <SelectItem value="part-time">Part Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.jobType && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.jobType.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>
                Work Mode <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="workMode"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={errors.workMode ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select work mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="work from home">
                        Work From Home
                      </SelectItem>
                      <SelectItem value="work from office">
                        Work From Office
                      </SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.workMode && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.workMode.message}
                </p>
              )}
            </div>
          </div>

          {/* Experience Level */}
          <div className="space-y-2">
            <Label>
              Experience Level <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="experienceLevel"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={errors.experienceLevel ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fresher">Fresher</SelectItem>
                    <SelectItem value="entry-level">Entry Level</SelectItem>
                    <SelectItem value="associate">Associate</SelectItem>
                    <SelectItem value="mid-level">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="director">Director</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.experienceLevel && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.experienceLevel.message}
              </p>
            )}
          </div>

          {/* Experience Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Min Experience (years) <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                {...register("minimumExperience")}
                placeholder="e.g. 2"
                className={errors.minimumExperience ? "border-red-500" : ""}
              />
              {errors.minimumExperience && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.minimumExperience.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>
                Max Experience (years) <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                {...register("maximumExperience")}
                placeholder="e.g. 5"
                className={errors.maximumExperience ? "border-red-500" : ""}
              />
              {errors.maximumExperience && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.maximumExperience.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compensation & Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-600" />
            Compensation & Skills
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Salary Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Min Salary (₹/month) <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                {...register("minimumSalary")}
                placeholder="e.g. 30000"
                className={errors.minimumSalary ? "border-red-500" : ""}
              />
              {errors.minimumSalary && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.minimumSalary.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>
                Max Salary (₹/month) <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                {...register("maximumSalary")}
                placeholder="e.g. 60000"
                className={errors.maximumSalary ? "border-red-500" : ""}
              />
              {errors.maximumSalary && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.maximumSalary.message}
                </p>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label>
              Required Skills <span className="text-red-500">*</span>
            </Label>
            <Select onValueChange={handleAddSkill}>
              <SelectTrigger
                className={errors.skillsRequired ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Add skills" />
              </SelectTrigger>
              <SelectContent>
                {uniqueSkills
                  .filter((skill) => !selectedSkills.includes(skill.id))
                  .map((skill) => (
                    <SelectItem key={skill.id} value={skill.id}>
                      {skill.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {selectedSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedSkills.map((skillId) => (
                  <Badge
                    key={skillId}
                    variant="secondary"
                    className="bg-emerald-50 text-emerald-700 border-emerald-200"
                  >
                    {getSkillName(skillId)}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => handleRemoveSkill(skillId)}
                    />
                  </Badge>
                ))}
              </div>
            )}
            {errors.skillsRequired && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.skillsRequired.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Application Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            Application Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Application Deadline <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                {...register("applicationDeadline")}
                className={errors.applicationDeadline ? "border-red-500" : ""}
              />
              {errors.applicationDeadline && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.applicationDeadline.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>
                Number of Vacancies <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                {...register("vacancies")}
                placeholder="e.g. 2"
                className={errors.vacancies ? "border-red-500" : ""}
              />
              {errors.vacancies && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.vacancies.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end gap-3 ">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-700 hover:bg-blue-800 cursor-pointer" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Job...
            </>
          ) : (
            "Create Job Post"
          )}
        </Button>
      </div>
    </form>
  );
}
