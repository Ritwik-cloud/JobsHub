"use client";

import { memo, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, X } from "lucide-react";

// --- Types ---
interface OptionItem {
  _id: string;
  name: string;
}

interface PreferenceData {
  preferredIndustry: string;
  preferredJobCategory: string;
  preferredWorkMode: string[];
  prefferedShift: string;
  preferredLocations: string[];
}

// API Response structure (with full objects)
interface ApiPreferenceData {
  preferredIndustry: { _id: string; name: string } | string;
  preferredJobCategory: { _id: string; name: string } | string;
  preferredWorkMode: string[];
  prefferedShift: string;
  preferredLocations: Array<{ _id: string; name: string }> | string[];
}

interface CareerPreferenceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: ApiPreferenceData | PreferenceData | null;
  onSave: (data: PreferenceData) => void;
  isLoading?: boolean;
  industries?: OptionItem[];
  categories?: OptionItem[];
  locations?: OptionItem[];
}

// Work mode options
const WORK_MODES = [
  { id: "work from office", label: "Work from Office" },
  { id: "remote", label: "Remote" },
  { id: "hybrid", label: "Hybrid" },
] as const;

 function CareerPreferenceModal({
  open,
  onOpenChange,
  initialData,
  onSave,
  isLoading = false,
  industries = [],
  categories = [],
  locations = [],
}: CareerPreferenceModalProps) {
  const hasInitialized = useRef(false);

  // FIX 1: Add getValues to destructuring
  const { control, handleSubmit, reset, setValue, watch, getValues } = useForm<PreferenceData>({
    defaultValues: {
      preferredIndustry: "",
      preferredJobCategory: "",
      preferredWorkMode: [],
      prefferedShift: "",
      preferredLocations: [],
    },
  });

  const selectedWorkModes = watch("preferredWorkMode");
  const selectedLocationIds = watch("preferredLocations");

  // Helper function to extract ID from object or string
  const extractId = (value: any): string => {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (typeof value === "object" && value._id) return value._id;
    return "";
  };

  // Helper function to extract array of IDs
  const extractLocationIds = (locations: any): string[] => {
    if (!locations || !Array.isArray(locations)) return [];
    return locations.map((loc) => extractId(loc)).filter(Boolean);
  };

  // Reset form when modal opens
  useEffect(() => {
    if (!open) {
      hasInitialized.current = false;
      return;
    }

    if (hasInitialized.current) return;

    const industryId = extractId(initialData?.preferredIndustry);
    const categoryId = extractId(initialData?.preferredJobCategory);
    const locationIds = extractLocationIds(initialData?.preferredLocations);

    reset({
      preferredIndustry: industryId,
      preferredJobCategory: categoryId,
      preferredWorkMode: initialData?.preferredWorkMode || [],
      prefferedShift: initialData?.prefferedShift || "",
      preferredLocations: locationIds,
    });

    hasInitialized.current = true;
  }, [open, reset, initialData]);

  // Submit handler
  const onSubmit = (data: PreferenceData) => {
    onSave(data);
  };

  // Handle work mode selection
  const handleWorkModeSelect = (mode: string) => {
    // Use getValues to ensure we have the latest state
    const current = getValues("preferredWorkMode") || [];
    if (!current.includes(mode)) {
      setValue("preferredWorkMode", [...current, mode], {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true, // Forces re-render
      });
    }
  };

  // FIX 2: Updated Remove Logic for Work Mode
  const removeWorkMode = (e: React.MouseEvent, mode: string) => {
    e.preventDefault(); // Stop default behavior
    e.stopPropagation(); // Stop bubbling
    
    // Get absolute latest values
    const current = getValues("preferredWorkMode") || [];
    
    setValue(
      "preferredWorkMode",
      current.filter((m) => m !== mode),
      {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true, // This forces 'watch' to update the UI
      }
    );
  };

  // Handle location selection
  const handleLocationSelect = (locId: string) => {
    const current = getValues("preferredLocations") || [];
    if (!current.includes(locId)) {
      setValue("preferredLocations", [...current, locId], {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  };

  // FIX 3: Updated Remove Logic for Location
  const removeLocation = (e: React.MouseEvent, locId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const current = getValues("preferredLocations") || [];
    
    setValue(
      "preferredLocations",
      current.filter((id) => id !== locId),
      {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true, // This forces 'watch' to update the UI
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-xl p-0 gap-0 bg-white">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-gray-100">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Career Preferences
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500 mt-1">
              Customize your job search criteria to find the perfect role.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* 1. Industry & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">
                Preferred Industry
              </Label>
              <Controller
                name="preferredIndustry"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((item) => (
                        <SelectItem key={item._id} value={item._id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">
                Job Category
              </Label>
              <Controller
                name="preferredJobCategory"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((item) => (
                        <SelectItem key={item._id} value={item._id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* 2. Work Mode - Using Dropdown */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700">
              Work Mode
            </Label>

            <Select onValueChange={handleWorkModeSelect} value="">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Add work mode..." />
              </SelectTrigger>
              <SelectContent>
                {WORK_MODES.filter(
                  (mode) => !selectedWorkModes?.includes(mode.id)
                ).map((mode) => (
                  <SelectItem key={mode.id} value={mode.id}>
                    {mode.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex flex-wrap gap-2 mt-2 min-h-8 p-3 bg-gray-50 rounded-lg border border-gray-100">
              {selectedWorkModes && selectedWorkModes.length > 0 ? (
                selectedWorkModes.map((mode) => {
                  const modeLabel =
                    WORK_MODES.find((m) => m.id === mode)?.label || mode;
                  return (
                    <Badge
                      key={mode}
                      variant="secondary"
                      className="px-3 py-1.5 gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
                    >
                      {modeLabel}
                      {/* Wrapped X in a button-like div for better click handling */}
                      <div
                        role="button"
                        className="cursor-pointer hover:text-red-500 transition-colors p-0.5"
                        onMouseDown={(e) => {
                           // Use onMouseDown to trigger before select focus blur events
                           removeWorkMode(e, mode);
                        }}
                      >
                        <X className="h-3.5 w-3.5" />
                      </div>
                    </Badge>
                  );
                })
              ) : (
                <span className="text-xs text-gray-400 italic">
                  No work modes selected
                </span>
              )}
            </div>
          </div>

          {/* 3. Locations */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700">
              Preferred Locations
            </Label>

            <Select onValueChange={handleLocationSelect} value="">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Add a location..." />
              </SelectTrigger>
              <SelectContent>
                {locations
                  .filter((loc) => !selectedLocationIds?.includes(loc._id))
                  .map((item) => (
                    <SelectItem key={item._id} value={item._id}>
                      {item.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <div className="flex flex-wrap gap-2 mt-2 min-h-8 p-3 bg-gray-50 rounded-lg border border-gray-100">
              {selectedLocationIds && selectedLocationIds.length > 0 ? (
                selectedLocationIds.map((locId) => {
                  const locName =
                    locations.find((l) => l._id === locId)?.name ||
                    "Unknown Location";
                  return (
                    <Badge
                      key={locId}
                      variant="secondary"
                      className="px-3 py-1.5 gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
                    >
                      {locName}
                      <div
                         role="button"
                         className="cursor-pointer hover:text-red-500 transition-colors p-0.5"
                         onMouseDown={(e) => {
                            removeLocation(e, locId);
                         }}
                      >
                         <X className="h-3.5 w-3.5" />
                      </div>
                    </Badge>
                  );
                })
              ) : (
                <span className="text-xs text-gray-400 italic">
                  No locations selected
                </span>
              )}
            </div>
          </div>

          {/* 4. Shift */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Preferred Shift
            </Label>
            <Controller
              name="prefferedShift"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Shift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Day Shift</SelectItem>
                    <SelectItem value="night">Night Shift</SelectItem>
                    <SelectItem value="flexible">
                      Flexible / Rotational
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Footer */}
          <DialogFooter className="flex-col-reverse sm:flex-row gap-2 pt-2 border-t border-gray-100 mt-6">
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
              disabled={isLoading}
              className="w-full sm:w-auto bg-blue-700 cursor-pointer hover:bg-blue-800 text-white"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Preferences
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default memo(CareerPreferenceModal)