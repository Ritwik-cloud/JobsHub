'use client'

import { memo, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
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
import * as yup from "yup";
import type { InferType } from "yup";

// Define the schema
const userSchema = yup.object().shape({
  name: yup.string().required("Name is required").min(2, "Name must be at least 2 chars"),
  dob: yup.string().required("Date of birth is required"),
  phone: yup.string()
    .matches(/^[0-9]+$/, "Phone must be only digits")
    .min(10, "Phone must be at least 10 digits")
    .required("Phone is required"),
  gender: yup.string().required("Gender is required"),
  address: yup.string().required("Address is required"),
  workstatus: yup.string().required("Work status is required"),
  
  // Handling numbers properly
  availabilityToJoin: yup
    .number()
    .transform((value, original) => (original === "" ? undefined : value))
    .typeError("Must be a number")
    .min(0, "Cannot be negative")
    .required("Required"),
    
  currentSalary: yup
    .number()
    .transform((value, original) => (original === "" ? undefined : value))
    .typeError("Must be a number")
    .min(0, "Salary cannot be negative")
    .required("Required"),

  // Nested object validation
  totalExperience: yup.object().shape({
    years: yup
      .number()
      .transform((value, original) => (original === "" ? undefined : value))
      .typeError("Must be number")
      .min(0)
      .required(),
    months: yup
      .number()
      .transform((value, original) => (original === "" ? undefined : value))
      .typeError("Must be number")
      .min(0)
      .max(11, "Max 11 months")
      .required()
  })
});

// Infer TypeScript type from Yup schema
type UserFormData = InferType<typeof userSchema>;

//  component props interface
interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: UserFormData | null;
  onSave: (data: UserFormData) => void;
}

 function EditProfileModal({ 
  open, 
  onOpenChange, 
  data, 
  onSave 
}: EditProfileModalProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: "",
      dob: "",
      phone: "",
      gender: "",
      address: "",
      workstatus: "",
      currentSalary: 0,
      availabilityToJoin: 0,
      totalExperience: { years: 0, months: 0 },
    },
  });

  // Reset form with new data when the modal opens or data changes
  useEffect(() => {
    if (data && open) {
      reset(data);
    }
  }, [data, open, reset]);

  const onSubmit: SubmitHandler<UserFormData> = (formData) => {
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit User Details</DialogTitle>
          <DialogDescription>
            Update the user's personal and professional information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 py-4">
            {/* Personal Details Section */}
            <div className="grid gap-4">
              <h4 className="font-medium leading-none text-primary">Personal Information</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" {...register("name")} />
                  {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" {...register("dob")} />
                  {errors.dob && <span className="text-red-500 text-xs">{errors.dob.message}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" {...register("phone")} />
                  {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.gender && <span className="text-red-500 text-xs">{errors.gender.message}</span>}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" {...register("address")} />
                {errors.address && <span className="text-red-500 text-xs">{errors.address.message}</span>}
              </div>
            </div>

            {/* Professional Details Section */}
            <div className="grid gap-4 border-t pt-4">
              <h4 className="font-medium leading-none text-primary">Professional Information</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="workstatus">Work Status</Label>
                  <Controller
                    name="workstatus"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="experienced">Experienced</SelectItem>
                          <SelectItem value="fresher">Fresher</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.workstatus && <span className="text-red-500 text-xs">{errors.workstatus.message}</span>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="availabilityToJoin">Availability (Days)</Label>
                  <Input 
                    id="availabilityToJoin" 
                    type="number" 
                    {...register("availabilityToJoin", {
                      valueAsNumber: true,
                    })} 
                  />
                  {errors.availabilityToJoin && <span className="text-red-500 text-xs">{errors.availabilityToJoin.message}</span>}
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Total Experience</Label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Input 
                        type="number" 
                        {...register("totalExperience.years", {
                          valueAsNumber: true,
                        })} 
                        className="w-full"
                      />
                      <span className="text-sm text-muted-foreground">Years</span>
                    </div>
                    {errors.totalExperience?.years && (
                      <span className="text-red-500 text-xs">
                        {errors.totalExperience.years.message}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Input 
                        type="number" 
                        {...register("totalExperience.months", {
                          valueAsNumber: true,
                        })} 
                        className="w-full"
                      />
                      <span className="text-sm text-muted-foreground">Months</span>
                    </div>
                    {errors.totalExperience?.months && (
                      <span className="text-red-500 text-xs">
                        {errors.totalExperience.months.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="currentSalary">Current Salary</Label>
                <Input 
                  id="currentSalary" 
                  type="number" 
                  {...register("currentSalary", {
                    valueAsNumber: true,
                  })} 
                />
                {errors.currentSalary && <span className="text-red-500 text-xs">{errors.currentSalary.message}</span>}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-700 cursor-pointer hover:bg-blue-800">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default memo(EditProfileModal)