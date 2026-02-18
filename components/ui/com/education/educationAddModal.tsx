'use client'

import { memo, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Loader2 } from "lucide-react";

// 1. Validation Schema
const educationSchema = yup.object().shape({
  level: yup.string().required("Education level is required"),
  boardOrUniversity: yup.string().required("University/Board is required"),
  course: yup.string().required("Course is required"),
  specialization: yup.string().required("Specialization is required"),
  marksPercentage: yup
    .number()
    .typeError("Must be a number")
    .min(0, "Min 0%")
    .max(100, "Max 100%")
    .required("Percentage is required"),
  durationFrom: yup.string().required("Start date is required"),
  durationTo: yup
    .string()
    .required("End date is required")
    .test(
      "is-after-start",
      "End date must be after start date",
      function (value) {
        const { durationFrom } = this.parent;
        if (!durationFrom || !value) return true;
        return new Date(value) >= new Date(durationFrom);
      }
    ),
  passingOutYear: yup
    .string()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr)),
});

// 2. Types
interface OptionItem {
  _id: string;
  name: string;
}

interface EducationData {
  _id?: string;
  level: string;
  boardOrUniversity: string;
  course: string;
  specialization: string;
  marksPercentage: number;
  passingOutYear: string | null;
  durationFrom: string;
  durationTo: string;
}

interface EducationAddModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: EducationData | null;
  onSave: (data: EducationData) => Promise<void> | void;
  isLoading?: boolean;
  coursesList?: OptionItem[];         
  specializationsList?: OptionItem[]; 
}

 function EducationAddModal({
  open,
  onOpenChange,
  initialData,
  onSave,
  isLoading = false,
  coursesList = [],
  specializationsList = [],
}: EducationAddModalProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(educationSchema),
    defaultValues: {
      level: "",
      boardOrUniversity: "",
      course: "",
      specialization: "",
      marksPercentage: 0,
      durationFrom: "",
      durationTo: "",
      passingOutYear: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (open) {
      if (initialData) {
        reset({
          ...initialData,
          passingOutYear: initialData.passingOutYear || "",
        });
      } else {
        reset({
          level: "",
          boardOrUniversity: "",
          course: "",
          specialization: "",
          marksPercentage: 0,
          durationFrom: "",
          durationTo: "",
          passingOutYear: "",
        });
      }
    }
  }, [open, initialData, reset]);

  const onSubmit = (formData: any) => {
    const payload = initialData?._id
      ? { ...formData, _id: initialData._id }
      : formData;
    onSave(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-xl p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {initialData ? "Edit Education" : "Add Education"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          
          {/* Level & University Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="level" className="text-sm font-medium">Level</Label>
              <Controller
                name="level"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="level" className="w-full">
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tenth">Class X</SelectItem>
                      <SelectItem value="Twelfth">Class XII</SelectItem>
                      <SelectItem value="Graduation">Graduation</SelectItem>
                      <SelectItem value="Post Graduation">Post Graduation</SelectItem>
                      <SelectItem value="Diploma">Diploma</SelectItem>
                      <SelectItem value="PhD">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.level && (
                <p className="text-xs text-red-500 font-medium">{errors.level.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="boardOrUniversity" className="text-sm font-medium">University / Board</Label>
              <Input
                id="boardOrUniversity"
                placeholder="Ex. Mumbai University"
                {...register("boardOrUniversity")}
                className="w-full"
              />
              {errors.boardOrUniversity && (
                <p className="text-xs text-red-500 font-medium">{errors.boardOrUniversity.message}</p>
              )}
            </div>
          </div>

          {/* Course & Specialization Row - Now Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="course" className="text-sm font-medium">Course / Degree</Label>
              <Controller
                name="course"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="course" className="w-full">
                      <SelectValue placeholder="Select Course" />
                    </SelectTrigger>
                    <SelectContent>
                      {coursesList.map((item) => (
                        <SelectItem key={item._id} value={item._id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.course && (
                <p className="text-xs text-red-500 font-medium">{errors.course.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialization" className="text-sm font-medium">Specialization</Label>
              <Controller
                name="specialization"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="specialization" className="w-full">
                      <SelectValue placeholder="Select Specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      {specializationsList.map((item) => (
                        <SelectItem key={item._id} value={item._id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.specialization && (
                <p className="text-xs text-red-500 font-medium">{errors.specialization.message}</p>
              )}
            </div>
          </div>

          {/* Duration Row */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Duration</Label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1 w-full space-y-1">
                <div className="relative">
                  <Input
                    type="month"
                    {...register("durationFrom")}
                    className="w-full"
                  />
                  <CalendarIcon className="hidden sm:block absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                {errors.durationFrom && (
                  <p className="text-xs text-red-500 font-medium">{errors.durationFrom.message}</p>
                )}
              </div>
              
              <span className="text-gray-400 font-medium hidden sm:block">to</span>
              <span className="text-gray-400 font-medium sm:hidden text-center text-sm">to</span>
              
              <div className="flex-1 w-full space-y-1">
                <div className="relative">
                  <Input
                    type="month"
                    {...register("durationTo")}
                    className="w-full"
                  />
                  <CalendarIcon className="hidden sm:block absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                {errors.durationTo && (
                  <p className="text-xs text-red-500 font-medium">{errors.durationTo.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Marks & Passing Year Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="marksPercentage" className="text-sm font-medium">Marks (%)</Label>
              <div className="relative">
                <Input
                  id="marksPercentage"
                  type="number"
                  placeholder="85"
                  className="pr-8 w-full"
                  {...register("marksPercentage")}
                />
                <span className="absolute right-3 top-2.5 text-sm text-gray-400 font-medium">%</span>
              </div>
              {errors.marksPercentage && (
                <p className="text-xs text-red-500 font-medium">{errors.marksPercentage.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="passingOutYear" className="text-sm font-medium">Passing Year (Optional)</Label>
              <Input
                id="passingOutYear"
                type="number"
                placeholder="2022"
                {...register("passingOutYear")}
                className="w-full"
              />
            </div>
          </div>

          <DialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-0 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!isValid || isLoading}
              className="w-full bg-blue-700 cursor-pointer hover:bg-blue-800 sm:w-auto"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {initialData ? "Save Changes" : "Add Education"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default memo(EducationAddModal)