'use client'

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { InferType } from "yup";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// 1. Define Validation Schema
const summarySchema = yup.object().shape({
  profileSummary: yup  
    .string()
    .required("Summary is required")
    .max(500, "Summary cannot exceed 500 characters"),
});

// 2. Infer TypeScript type from schema
type SummaryFormData = InferType<typeof summarySchema>;

// 3. Define component props interface
interface EditSummaryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: string | { profileSummary?: string; summary?: string } | null;
  onSave: (data: SummaryFormData) => void;
}

export function EditSummaryModal({ 
  open, 
  onOpenChange, 
  initialData, 
  onSave 
}: EditSummaryModalProps) {
  // 4. Setup Form Hook with proper typing
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<SummaryFormData>({
    resolver: yupResolver(summarySchema),
    mode: "onChange", // Validates as you type
    defaultValues: {
      profileSummary: "",
    },
  });

  // Watch correct field
  const currentSummary = watch("profileSummary") || "";

  useEffect(() => {
    if (open) {
      // Handle input data safely with proper type checking
      let summaryText = "";
      
      if (typeof initialData === "string") {
        summaryText = initialData;
      } else if (initialData && typeof initialData === "object") {
        summaryText = initialData.profileSummary || initialData.summary || "";
      }
      
      // Reset with matching key
      reset({ profileSummary: summaryText });
    }
  }, [initialData, open, reset]);

  const onSubmit: SubmitHandler<SummaryFormData> = (formData) => {
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] w-[95vw]">
        <DialogHeader>
          <DialogTitle>Edit Profile Summary</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="summary">Professional Bio</Label>
              <span
                className={`text-xs ${
                  currentSummary.length > 500 ? "text-red-500" : "text-muted-foreground"
                }`}
              >
                {currentSummary.length} / 500
              </span>
            </div>

            <Textarea
              id="summary"
              placeholder="Write a brief overview of your professional background..."
              className="min-h-[200px] resize-none focus-visible:ring-offset-0"
              {...register("profileSummary")}
            />
            
            {errors.profileSummary && (
              <p className="text-sm text-red-500 font-medium">
                {errors.profileSummary.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-blue-700 cursor-pointer hover:bg-blue-800" 
              type="submit" 
              disabled={!isValid}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
