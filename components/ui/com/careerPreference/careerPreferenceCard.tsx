'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  MonitorSmartphone, 
  Building2,
  Pencil,
  Edit
} from "lucide-react";

//  Updated to match API response structure
interface Location {
  _id: string;
  name: string;
  normalized?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface Industry {
  _id: string;
  name: string;
  normalized?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface JobCategory {
  _id: string;
  name: string;
  normalized?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

//  Updated interface to match API
interface PreferenceData {
  preferredIndustry: Industry | string; 
  preferredJobCategory: JobCategory | string;
  preferredWorkMode: string[];
  prefferedShift: string;
  preferredLocations: Location[] | string[]; 
}

// Reference data (for fallback mapping if IDs are provided)
interface ReferenceData {
  industries: Array<{ _id: string; name: string }>;
  categories: Array<{ _id: string; name: string }>;
  locations: Array<{ _id: string; name: string }>;
}

interface CareerPreferenceCardProps {
  data: PreferenceData | null;
  references?: ReferenceData;
  onEdit?: () => void;
}

export default function CareerPreferenceCard({ 
  data, 
  references, 
  onEdit 
}: CareerPreferenceCardProps) {

  //  Helper to get name - handles both object and ID
  const getIndustryName = () => {
    if (!data?.preferredIndustry) return "Not specified";
    
    // If it's an object with name property
    if (typeof data.preferredIndustry === 'object' && 'name' in data.preferredIndustry) {
      return data.preferredIndustry.name;
    }
    
    // If it's just an ID, look it up in references
    const found = references?.industries.find(item => item._id === data.preferredIndustry);
    return found ? found.name : "Unknown";
  };

  const getCategoryName = () => {
    if (!data?.preferredJobCategory) return "Not specified";
    
    // If it's an object with name property
    if (typeof data.preferredJobCategory === 'object' && 'name' in data.preferredJobCategory) {
      return data.preferredJobCategory.name;
    }
    
    // If it's just an ID, look it up in references
    const found = references?.categories.find(item => item._id === data.preferredJobCategory);
    return found ? found.name : "Unknown";
  };

  const getLocationNames = () => {
    if (!data?.preferredLocations || data.preferredLocations.length === 0) {
      return [];
    }

    return data.preferredLocations.map(loc => {
      // If it's an object with name property
      if (typeof loc === 'object' && 'name' in loc) {
        return { id: loc._id, name: loc.name };
      }
      
      // If it's just an ID, look it up in references
      const found = references?.locations.find(item => item._id === loc);
      return { id: loc as string, name: found ? found.name : "Unknown" };
    });
  };

  if (!data) {
    return (
      <Card className="w-full max-w-5xl border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <Briefcase className="h-10 w-10 mb-2 opacity-20" />
          <p>No career preferences set.</p>
          <Button variant="link" onClick={onEdit} className="mt-2 bg-blue-700 cursor-pointer hover:bg-blue-800">
            Add Preferences
          </Button>
        </CardContent>
      </Card>
    );
  }

  const locationNames = getLocationNames();

  return (
    <div className="w-full max-w-5xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
            <Briefcase className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Career Preferences</h2>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onEdit}
          className="border-blue-700 text-blue-700 cursor-pointer hover:bg-blue-100 gap-1"
        >
          <Edit className="h-4 w-4" />
          Edit
        </Button>
      </div>

      <Card className="border-l-4 border-l-emerald-500 shadow-sm">
        <CardContent className="grid gap-6 sm:grid-cols-2 p-6">
          
          {/* Industry & Category */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="mt-0.5 p-2 bg-slate-50 rounded text-slate-500">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Preferred Industry
                </p>
                <p className="font-semibold text-gray-900 mt-0.5 text-lg">
                  {getIndustryName()}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="mt-0.5 p-2 bg-slate-50 rounded text-slate-500">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Job Category
                </p>
                <p className="font-semibold text-gray-900 mt-0.5 text-lg">
                  {getCategoryName()}
                </p>
              </div>
            </div>
          </div>

          {/* Work Mode, Shift, Location */}
          <div className="space-y-4">
            
            {/* Work Mode */}
            <div className="flex gap-3">
              <div className="mt-0.5 p-2 bg-slate-50 rounded text-slate-500">
                <MonitorSmartphone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1.5">
                  Work Mode
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.preferredWorkMode?.length > 0 ? (
                    data.preferredWorkMode.map((mode) => (
                      <Badge key={mode} variant="secondary" className="capitalize bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-100">
                        {mode}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400">Not specified</span>
                  )}
                </div>
              </div>
            </div>

            {/* Shift */}
            <div className="flex gap-3">
              <div className="mt-0.5 p-2 bg-slate-50 rounded text-slate-500">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Preferred Shift
                </p>
                <p className="font-medium text-gray-900 mt-0.5 capitalize">
                  {data.prefferedShift === 'day' ? 'Day Shift' : 
                   data.prefferedShift === 'night' ? 'Night Shift' : 
                   data.prefferedShift === 'flexible' ? 'Flexible / Rotational' : 
                   data.prefferedShift || "Flexible"}
                </p>
              </div>
            </div>

            {/* Locations */}
            <div className="flex gap-3">
              <div className="mt-0.5 p-2 bg-slate-50 rounded text-slate-500">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1.5">
                  Preferred Locations
                </p>
                <div className="flex flex-wrap gap-2">
                  {locationNames.length > 0 ? (
                    locationNames.map((loc) => (
                      <Badge key={loc.id} variant="outline" className="border-slate-300 text-slate-700 capitalize">
                        {loc.name}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400">Open to any</span>
                  )}
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}
