"use client"

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  DollarSign,
  Clock,
  User,
  Camera,
  Edit,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

// Define TypeScript interface for user data
export interface UserData {
  name: string;
  email: string;
  dob: string;
  phone: string;
  address: string;
  workStatus: string;
  currentSalary: string;
  availabiltyToJoin: string;
  totalExperience: string;
  role: string;
  avatarUrl?: string;
}

// Define props interface
interface ProfileDetailsProps {
  userData: UserData;
  onEditProfile: () => void;
  onChangeProfilePicture: () => void;
}

export default function ProfileDetails({
  userData,
  onEditProfile,
  onChangeProfilePicture,
}: ProfileDetailsProps) {
  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 flex justify-center items-start">
      <Card className="w-full max-w-4xl shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        {/* Header Section with Avatar and Main Info */}
        <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8">
          {/* Avatar with Change Picture Button */}
          <div className="relative">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-white shadow-md">
              <AvatarImage src={userData.avatarUrl} alt={userData.name} />
              <AvatarFallback className="text-2xl font-bold bg-blue-50 text-blue-700">
                {userData?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="secondary"
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-lg"
              onClick={onChangeProfilePicture}
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col items-center sm:items-start space-y-2 text-center sm:text-left flex-1">
            <div className="space-y-1">
              <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">
                {userData.name}
              </CardTitle>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
              <Badge
                variant="secondary"
                className="px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                {userData.workStatus}
              </Badge>
              <Badge
                variant="outline"
                className="px-3 py-1 text-sm font-medium border-green-200 text-green-700 bg-green-50"
              >
                Available in {userData?.availabiltyToJoin}
              </Badge>
            </div>
          </div>

          <div className="flex gap-3 mt-4 sm:mt-0 cursor-pointer">
            <Button 
              variant="outline" 
              onClick={onEditProfile}
              className="border-blue-700 text-blue-700 cursor-pointer hover:bg-blue-100"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </CardHeader>

        <Separator className="mb-8" />

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-6 sm:px-10 pb-10">
          {/* Personal Details Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-700" />
              Personal Details
            </h3>

            <div className="space-y-5">
              <InfoItem
                icon={<Mail className="w-4 h-4 text-gray-500" />}
                label="Email Address"
                value={userData.email}
              />
              <InfoItem
                icon={<Phone className="w-4 h-4 text-gray-500" />}
                label="Phone Number"
                value={userData.phone}
              />
              <InfoItem
                icon={<Calendar className="w-4 h-4 text-gray-500" />}
                label="Date of Birth"
                value={userData.dob}
              />
              <InfoItem
                icon={<MapPin className="w-4 h-4 text-gray-500" />}
                label="Address"
                value={userData.address}
              />
            </div>
          </div>

          {/* Professional Information Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-700" />
              Professional Info
            </h3>

            <div className="space-y-5">
              <InfoItem
                icon={<Clock className="w-4 h-4 text-gray-500" />}
                label="Total Experience"
                value={userData.totalExperience}
              />
              <InfoItem
                icon={<DollarSign className="w-4 h-4 text-gray-500" />}
                label="Current Salary"
                value={userData.currentSalary}
              />
              <InfoItem
                icon={<Briefcase className="w-4 h-4 text-gray-500" />}
                label="Work Status"
                value={userData.workStatus}
              />
              <InfoItem
                icon={<Clock className="w-4 h-4 text-gray-500" />}
                label="Notice Period"
                value={userData.availabiltyToJoin}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Reusable Helper Component for Info Rows
function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 group">
      <div className="mt-1 p-2 rounded-full bg-gray-100 group-hover:bg-blue-50 transition-colors duration-200">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-base font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
