'use client'
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

export interface ProjectData {
  _id?: string;
  title: string;
  description: string;
  link: string | null;
}

// 1. Validation schema
const projectSchema = yup.object().shape({
  title: yup.string().required("Title is required").max(100, "Max 100 characters"),
  description: yup
    .string()
    .required("Description is required")
    .max(600, "Max 600 characters"),
  link: yup
    .string()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .url("Must be a valid URL")
    .optional(),
});

interface ProjectAddModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: ProjectData | null;          // null => Add mode, object => Edit mode
  onSave: (data: ProjectData) => Promise<void> | void;
  isLoading?: boolean;
}

 function ProjectAddModal({
  open,
  onOpenChange,
  initialData,
  onSave,
  isLoading = false,
}: ProjectAddModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      link: "",
    },
    mode: "onChange",
  });

  // For character counter
  const descriptionValue = watch("description") || "";

  // Reset when modal opens / initialData changes
  useEffect(() => {
    if (open) {
      if (initialData) {
        reset({
          title: initialData.title || "",
          description: initialData.description || "",
          link: initialData.link || "",
        });
      } else {
        reset({
          title: "",
          description: "",
          link: "",
        });
      }
    }
  }, [open, initialData, reset]);

  const onSubmit = (formData: any) => {
    const payload: ProjectData = {
      ...formData,
      link: formData.link || null,
      _id: initialData?._id,
    };
    onSave(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:max-w-[550px] max-h-[90vh] overflow-y-auto rounded-xl p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-semibold">
            {initialData ? "Edit Project" : "Add Project"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-2">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Project Title
            </Label>
            <Input
              id="title"
              placeholder="Exam management system"
              {...register("title")}
              className="w-full"
            />
            {errors.title && (
              <p className="text-xs text-red-500 font-medium">
                {errors.title.message as string}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <span className="text-[11px] text-muted-foreground">
                {descriptionValue.length} / 600
              </span>
            </div>
            <Textarea
              id="description"
              placeholder="Exam Management system using Node.js, MongoDB, JavaScript, jQuery and AJAX"
              className="min-h-[140px] resize-none text-sm"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-xs text-red-500 font-medium">
                {errors.description.message as string}
              </p>
            )}
          </div>

          {/* Link (optional) */}
          <div className="space-y-2">
            <Label htmlFor="link" className="text-sm font-medium">
              Project Link (Optional)
            </Label>
            <Input
              id="link"
              placeholder="https://github.com/your-repo or deployed URL"
              {...register("link")}
              className="w-full"
            />
            {errors.link && (
              <p className="text-xs text-red-500 font-medium">
                {errors.link.message as string}
              </p>
            )}
          </div>

          {/* Actions */}
          <DialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-0 pt-2">
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
              {initialData ? "Save Changes" : "Add Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default memo(ProjectAddModal)