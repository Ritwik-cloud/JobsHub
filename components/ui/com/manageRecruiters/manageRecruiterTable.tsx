"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MoreHorizontal, Mail, ShieldCheck, Search } from "lucide-react";

type RecruiterProfile = {
  designation?: string;
  companyRole?: string;
  compnayRole?: string;
  approvalStatus?: string;
  isActive?: boolean;
};

type Recruiter = {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  role: string;
  isActive: boolean;
  isRemoved: boolean;
  company: string;
  createdAtFormatted: string;
  recruiterProfile?: RecruiterProfile;
};

interface ManageRecruitersTableProps {
  data: Recruiter[];
  onView?: (id: string) => void;
  onToggleActive?: (id: string, current: boolean) => void;
}

export function ManageRecruitersTable({
  data,
  onView,
  onToggleActive,
}: ManageRecruitersTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  //  Filter data based on search query
  const filteredData = data.filter((r) => {
    const query = searchQuery.toLowerCase();
    return (
      r.name.toLowerCase().includes(query) ||
      r.email.toLowerCase().includes(query) ||
      r.recruiterProfile?.designation?.toLowerCase().includes(query) ||
      r.recruiterProfile?.companyRole?.toLowerCase().includes(query)
    );
  });

  const getStatusBadge = (r: Recruiter) => {
    if (r.isRemoved)
      return (
        <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700 text-xs">
          Removed
        </Badge>
      );

    if (!r.isActive)
      return (
        <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700 text-xs">
          Inactive
        </Badge>
      );

    return (
      <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 text-xs">
        Active
      </Badge>
    );
  };

  const getApprovalBadge = (r: Recruiter) => {
    const status = r.recruiterProfile?.approvalStatus;
    if (!status) return null;

    if (status === "approved")
      return (
        <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px]">
          Approved
        </Badge>
      );

    if (status === "pending")
      return (
        <Badge className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px]">
          Pending
        </Badge>
      );

    return (
      <Badge className="bg-red-50 text-red-700 border border-red-200 text-[10px]">
        {status}
      </Badge>
    );
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/*  Header with Search Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-3 border-b bg-linear-to-r from-slate-50 to-blue-50">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Manage Recruiters
          </h2>
          <p className="text-xs text-gray-500">
            {filteredData.length} of {data.length} recruiter{data.length !== 1 && "s"}
          </p>
        </div>

        {/*  Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-9 text-sm"
          />
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <Table>
          <TableCaption className="text-xs text-gray-500">
            Recruiter access, roles, and statuses for the selected company.
          </TableCaption>
          <TableHeader className="bg-slate-50">
            <TableRow className="hover:bg-slate-50">
              <TableHead className="w-[240px]">Recruiter</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Company Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredData.map((r) => (
              <TableRow
                key={r._id}
                className="hover:bg-slate-50/80 transition-colors"
              >
                {/* Recruiter */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-slate-200">
                      <AvatarFallback className="bg-linear-to-br from-blue-500 to-indigo-500 text-white text-xs">
                        {getInitials(r.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium text-gray-900 line-clamp-1">
                          {r.name}
                        </span>
                        {r.isVerified && (
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-gray-500">
                        <Mail className="h-3 w-3" />
                        <span className="truncate max-w-[180px]">{r.email}</span>
                      </div>
                    </div>
                  </div>
                </TableCell>

                {/* Designation */}
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-800 line-clamp-1">
                      {r.recruiterProfile?.designation || "—"}
                    </span>
                    {r.recruiterProfile?.approvalStatus && (
                      <div className="mt-0.5">{getApprovalBadge(r)}</div>
                    )}
                  </div>
                </TableCell>

                {/* Company Role */}
                <TableCell>
                  <Badge
                    variant="outline"
                    className="text-[11px] capitalize border-blue-200 bg-blue-50 text-blue-700"
                  >
                    {r.recruiterProfile?.companyRole ||
                      r.recruiterProfile?.compnayRole ||
                      "basic_recruiter"}
                  </Badge>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <div className="flex flex-col gap-1">
                    {getStatusBadge(r)}
                    {r.recruiterProfile && (
                      <span className="text-[10px] text-gray-500">
                        Profile:{" "}
                        {r.recruiterProfile.isActive ? "Active" : "Inactive"}
                      </span>
                    )}
                  </div>
                </TableCell>

                {/* Joined */}
                <TableCell>
                  <span className="text-xs text-gray-700">
                    {r.createdAtFormatted}
                  </span>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 border-slate-200"
                      onClick={() => onView?.(r._id)}
                    >
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`h-7 text-xs ${
                        r.isActive
                          ? "border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100"
                          : "border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                      }`}
                      onClick={() => onToggleActive?.(r._id, r.isActive)}
                    >
                      {r.isActive ? "Deactivate" : "Activate"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <p className="text-sm text-gray-500">
                    {searchQuery
                      ? `No recruiters found matching "${searchQuery}"`
                      : "No recruiters found for this company."}
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
