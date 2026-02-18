"use client";

import { useState, useEffect, memo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Building2,
  Upload,
  Loader2,
  Globe,
  Mail,
  X,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

//  Fixed Validation Schema - Make optional fields properly optional
const companySchema = yup.object({
  name: yup
    .string()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must not exceed 100 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  website: yup
    .string()
    .url("Please enter a valid URL (e.g., https://example.com)")
    .optional() //  Changed from nullable + transform
    .default(""), //  Add default
  description: yup
    .string()
    .max(500, "Description must not exceed 500 characters")
    .optional() //  Changed from nullable + transform
    .default(""), //  Add default
});

type CompanyFormData = yup.InferType<typeof companySchema>;

interface EditCompanyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyData: any;
  onSave: (data: CompanyFormData, logoFile?: File) => Promise<void>;
}

function EditCompanyModal({
  open,
  onOpenChange,
  companyData,
  onSave,
}: EditCompanyModalProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setError,
  } = useForm<CompanyFormData>({
    resolver: yupResolver(companySchema),
    defaultValues: {
      name: "",
      email: "",
      website: "",
      description: "",
    },
  });

  const description = watch("description");

  // Load initial data
  useEffect(() => {
    if (companyData && open) {
      reset({
        name: companyData.name || "",
        email: companyData.email || "",
        website: companyData.website || "",
        description: companyData.description || "",
      });

      // Set logo preview
      if (companyData.logo) {
        const logoUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005"}/${companyData.logo.replace(
          /\\/g,
          "/"
        )}`;
        setLogoPreview(logoUrl);
      } else {
        setLogoPreview("");
      }

      setLogoFile(null);
    }
  }, [companyData, open, reset]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setLogoFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    if (companyData?.logo) {
      const logoUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005"}/${companyData.logo.replace(
        /\\/g,
        "/"
      )}`;
      setLogoPreview(logoUrl);
    } else {
      setLogoPreview("");
    }

    const fileInput = document.getElementById("logo-upload") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const onSubmit = async (data: CompanyFormData) => {
    try {
      console.log("📤 Submitting data:", data);
      console.log("📷 Logo file:", logoFile);

      await onSave(data, logoFile ?? undefined);

      onOpenChange(false);
      reset();
      setLogoFile(null);
      setLogoPreview("");
    } catch (error: any) {
      if (error?.errors) {
        Object.keys(error.errors).forEach((key) => {
          setError(key as keyof CompanyFormData, {
            type: "manual",
            message: error.errors[key],
          });
        });
      } else {
        toast.error(error?.message || "Failed to update company details");
      }
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Building2 className="h-5 w-5 text-blue-600" />
            Edit Company Profile
          </DialogTitle>
          <DialogDescription>
            Update your company information. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
          {/* Logo Upload Section */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Company Logo</Label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <Avatar className="h-24 w-24 rounded-xl border-2 border-gray-300 shadow-sm">
                <AvatarImage src={logoPreview} alt="Company Logo" className="object-cover" />
                <AvatarFallback className="bg-linear-to-br from-blue-500 to-purple-600 text-white text-2xl rounded-xl">
                 
                  {getInitials(watch("name") || "Company")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("logo-upload")?.click()}
                    className="flex items-center gap-2"
                    disabled={isSubmitting}
                  >
                    <Upload className="h-4 w-4" />
                    {logoFile ? "Change Logo" : "Upload Logo"}
                  </Button>
                  {logoFile && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleRemoveLogo}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      disabled={isSubmitting}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG or JPEG up to 5MB. Recommended size: 200x200px
                </p>
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleLogoChange}
                  className="hidden"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-gray-500" />
              Company Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter company name"
              className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="contact@company.com"
              className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Website */}
          <div className="space-y-2">
            <Label htmlFor="website" className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-500" />
              Website URL
            </Label>
            <Input
              id="website"
              type="url"
              {...register("website")}
              placeholder="https://www.company.com"
              className={errors.website ? "border-red-500 focus-visible:ring-red-500" : ""}
              disabled={isSubmitting}
            />
            {errors.website && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.website.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Company Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Brief description about your company, mission, and values..."
              rows={4}
              className={`resize-none ${errors.description ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              maxLength={500}
              disabled={isSubmitting}
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
              <p className="text-xs text-gray-500">{description?.length || 0}/500 characters</p>
            </div>
          </div>

          {/* Info Box */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>
                Changes will be reflected immediately across all job postings and candidate-facing pages.
              </span>
            </p>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" className="cursor-pointer bg-blue-700 hover:bg-blue-800" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default memo(EditCompanyModal);
