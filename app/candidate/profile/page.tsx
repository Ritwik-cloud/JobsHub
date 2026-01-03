"use client";

// IMPORTS - External Libraries
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

// IMPORTS - Redux Actions & Store
import {
  candidateAddEducation,
  candidateAddProjects,
  candidateDeleteEducation,
  candidateDeleteProject,
  candidateProfile,
  candidateProfileDetails,
  candidateProfileDetailsUpdate,
  candidateProfileSummary,
  candidateProfileSummaryUpdate,
  candidateSkills,
  candidateskillsUpdate,
  getCareerPreference,
  updateCareerpreference,
  updateResume,
} from "@/redux/slice/candidateSlice/candidateSlice";
import { AppDispatch, RootState } from "@/redux/store/store";

// IMPORTS - UI Components (Statically Loaded)
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ResumeCard from "@/components/ui/com/resume/resumeCard";
import UploadResumeModal from "@/components/ui/com/resume/uploadResume";
import Header from "@/pages/header/header";

// DYNAMIC IMPORTS - Main Components with Custom Loading States

/**
 * ProfileDetails Component - Displays user's basic profile information
 * Loaded dynamically to reduce initial bundle size
 */
const ProfileDetails = dynamic(
  () => import("@/components/ui/com/profileCard"),
  {
    loading: () => <ProfileDetailsSkeleton />,
    ssr: false,
  }
);

/**
 * ProfileSummaryCard Component - Shows professional summary
 */
const ProfileSummaryCard = dynamic(
  () => import("@/components/ui/com/profileSummarycard"),
  {
    loading: () => <SummaryCardSkeleton />,
    ssr: false,
  }
);

/**
 * SkillsCard Component - Displays user's technical skills
 */
const SkillsCard = dynamic(() => import("@/components/ui/com/skillsCard"), {
  loading: () => <SkillsCardSkeleton />,
  ssr: false,
});

/**
 * EducationList Component - Shows educational background
 */
const EducationList = dynamic(
  () => import("@/components/ui/com/education/educationList"),
  {
    loading: () => <EducationListSkeleton />,
    ssr: false,
  }
);

/**
 * ProjectCard Component - Displays user's projects
 */
const ProjectCard = dynamic(
  () => import("@/components/ui/com/projects/projectCard"),
  {
    loading: () => <ProjectCardSkeleton />,
    ssr: false,
  }
);

/**
 * CareerPreferenceCard Component - Shows job preferences
 */
const CareerPreferenceCard = dynamic(
  () => import("@/components/ui/com/careerPreference/careerPreferenceCard"),
  {
    loading: () => <CareerPreferenceSkeleton />,
    ssr: false,
  }
);

// DYNAMIC IMPORTS

/**
 * EditProfileModal - Modal for editing profile details
 * Only loaded when user clicks edit button
 */
const EditProfileModal = dynamic(
  () =>
    import("@/components/ui/com/modal").then((mod) => ({
      default: mod.EditProfileModal,
    })),
  {
    ssr: false,
    loading: () => null, // No loading state for modals
  }
);

/**
 * EditSummaryModal - Modal for editing professional summary
 */
const EditSummaryModal = dynamic(
  () =>
    import("@/components/ui/com/editSummaryModal").then((mod) => ({
      default: mod.EditSummaryModal,
    })),
  {
    ssr: false,
    loading: () => null,
  }
);

/**
 * EditSkillsModal - Modal for managing skills
 */
const EditSkillsModal = dynamic(
  () =>
    import("@/components/ui/com/editSkillsModal").then((mod) => ({
      default: mod.EditSkillsModal,
    })),
  {
    ssr: false,
    loading: () => null,
  }
);

/**
 * EducationAddModal - Modal for adding education entries
 */
const EducationAddModal = dynamic(
  () =>
    import("@/components/ui/com/education/educationAddModal").then((mod) => ({
      default: mod.EducationAddModal,
    })),
  {
    ssr: false,
    loading: () => null,
  }
);

/**
 * ProjectAddModal - Modal for adding project entries
 */
const ProjectAddModal = dynamic(
  () =>
    import("@/components/ui/com/projects/projectAddModal").then((mod) => ({
      default: mod.ProjectAddModal,
    })),
  {
    ssr: false,
    loading: () => null,
  }
);

/**
 * CareerPreferenceModal - Modal for updating job preferences
 */
const CareerPreferenceModal = dynamic(
  () =>
    import("@/components/ui/com/careerPreference/careerPreferenceModal").then(
      (mod) => ({ default: mod.CareerPreferenceModal })
    ),
  {
    ssr: false,
    loading: () => null,
  }
);

// SKELETON LOADING COMPONENTS

/**
 * ProfileDetailsSkeleton - Loading placeholder for profile details
 * Matches the exact layout of ProfileDetails component
 */
const ProfileDetailsSkeleton = () => (
  <Card className="w-full max-w-4xl shadow-lg border-0 bg-white/80 backdrop-blur-sm">
    <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8">
      {/* Avatar Skeleton */}
      <div className="relative">
        <Skeleton className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-gray-200" />
      </div>

      {/* Name and Badges Skeleton */}
      <div className="flex flex-col items-center sm:items-start space-y-2 text-center sm:text-left flex-1">
        <Skeleton className="h-8 w-48 bg-gray-200" />
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
          <Skeleton className="h-6 w-24 bg-gray-200 rounded-full" />
          <Skeleton className="h-6 w-32 bg-gray-200 rounded-full" />
        </div>
      </div>

      {/* Edit Button Skeleton */}
      <Skeleton className="h-10 w-32 bg-gray-200 rounded" />
    </CardHeader>

    <Separator className="mb-8" />

    {/* Personal and Professional Info Skeleton */}
    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-6 sm:px-10 pb-10">
      {/* Personal Details Column */}
      <div className="space-y-6">
        <Skeleton className="h-6 w-40 bg-gray-200" />
        <div className="space-y-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="h-10 w-10 rounded-full bg-gray-200" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-24 bg-gray-200" />
                <Skeleton className="h-5 w-full bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Info Column */}
      <div className="space-y-6">
        <Skeleton className="h-6 w-40 bg-gray-200" />
        <div className="space-y-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="h-10 w-10 rounded-full bg-gray-200" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-24 bg-gray-200" />
                <Skeleton className="h-5 w-full bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

/**
 * SummaryCardSkeleton - Loading placeholder for summary section
 */
const SummaryCardSkeleton = () => (
  <Card className="w-full max-w-4xl">
    <CardHeader className="flex flex-row items-center justify-between">
      <Skeleton className="h-6 w-40 bg-gray-200" />
      <Skeleton className="h-9 w-20 bg-gray-200 rounded" />
    </CardHeader>
    <CardContent className="space-y-3">
      <Skeleton className="h-4 w-full bg-gray-200" />
      <Skeleton className="h-4 w-full bg-gray-200" />
      <Skeleton className="h-4 w-3/4 bg-gray-200" />
    </CardContent>
  </Card>
);

/**
 * SkillsCardSkeleton - Loading placeholder for skills section
 */
const SkillsCardSkeleton = () => (
  <Card className="w-full max-w-4xl">
    <CardHeader className="flex flex-row items-center justify-between">
      <Skeleton className="h-6 w-32 bg-gray-200" />
      <Skeleton className="h-9 w-20 bg-gray-200 rounded" />
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 bg-gray-200 rounded-full" />
        ))}
      </div>
    </CardContent>
  </Card>
);

/**
 * EducationListSkeleton - Loading placeholder for education section
 */
const EducationListSkeleton = () => (
  <Card className="w-full max-w-4xl">
    <CardHeader className="flex flex-row items-center justify-between">
      <Skeleton className="h-6 w-32 bg-gray-200" />
      <Skeleton className="h-9 w-32 bg-gray-200 rounded" />
    </CardHeader>
    <CardContent className="space-y-4">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="border rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-start">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-48 bg-gray-200" />
              <Skeleton className="h-4 w-36 bg-gray-200" />
            </div>
            <Skeleton className="h-8 w-8 bg-gray-200 rounded" />
          </div>
          <Skeleton className="h-4 w-32 bg-gray-200" />
        </div>
      ))}
    </CardContent>
  </Card>
);

/**
 * ProjectCardSkeleton - Loading placeholder for projects section
 */
const ProjectCardSkeleton = () => (
  <Card className="w-full max-w-4xl">
    <CardHeader className="flex flex-row items-center justify-between">
      <Skeleton className="h-6 w-32 bg-gray-200" />
      <Skeleton className="h-9 w-32 bg-gray-200 rounded" />
    </CardHeader>
    <CardContent className="space-y-4">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="border rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-start">
            <Skeleton className="h-5 w-56 bg-gray-200" />
            <Skeleton className="h-8 w-8 bg-gray-200 rounded" />
          </div>
          <Skeleton className="h-4 w-full bg-gray-200" />
          <Skeleton className="h-4 w-3/4 bg-gray-200" />
        </div>
      ))}
    </CardContent>
  </Card>
);

/**
 * CareerPreferenceSkeleton - Loading placeholder for career preferences
 */
const CareerPreferenceSkeleton = () => (
  <Card className="w-full max-w-4xl">
    <CardHeader className="flex flex-row items-center justify-between">
      <Skeleton className="h-6 w-48 bg-gray-200" />
      <Skeleton className="h-9 w-20 bg-gray-200 rounded" />
    </CardHeader>
    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-32 bg-gray-200" />
          <Skeleton className="h-5 w-full bg-gray-200" />
        </div>
      ))}
    </CardContent>
  </Card>
);

/**
 * ProfilePageSkeleton - Full page loading state
 * Shown while initial data is being fetched
 */
const ProfilePageSkeleton = () => (
  <div className="flex flex-col items-center justify-center w-full min-h-screen p-4">
    <div className="w-full max-w-5xl space-y-6">
      <ProfileDetailsSkeleton />
      <SummaryCardSkeleton />
      <SkillsCardSkeleton />
      <EducationListSkeleton />
      <ProjectCardSkeleton />
      <CareerPreferenceSkeleton />
    </div>
  </div>
);

// TYPE DEFINITIONS

/**
 * PreferenceData - Shape expected by the career preference modal
 */
interface PreferenceData {
  preferredIndustry: string;
  preferredJobCategory: string;
  preferredWorkMode: string[];
  prefferedShift: string;
  preferredLocations: string[];
}

/**
 * ApiPreferenceData - Shape returned from the API/Redux
 * May contain nested objects that need to be flattened to IDs
 */
interface ApiPreferenceData {
  preferredIndustry?: { _id: string; name: string } | string;
  preferredJobCategory?: { _id: string; name: string } | string;
  preferredWorkMode?: string[];
  prefferedShift?: string;
  preferredLocations?: Array<{ _id: string; name: string }> | string[];
}

// HELPER FUNCTIONS

/**
 * Convert API preference data to modal-compatible format
 * Extracts IDs from nested objects
 *
 * @param api - Raw API data
 * @returns Flattened preference data with IDs only
 */
const toPreferenceData = (
  api: ApiPreferenceData | null | undefined
): PreferenceData | null => {
  if (!api) return null;

  // Extract ID from either string or object format
  const extractId = (val: any): string =>
    typeof val === "string" ? val : val?._id || "";

  // Extract location IDs from array
  const extractLocationIds = (locs: any): string[] =>
    Array.isArray(locs) ? locs.map((l) => extractId(l)).filter(Boolean) : [];

  return {
    preferredIndustry: extractId(api.preferredIndustry),
    preferredJobCategory: extractId(api.preferredJobCategory),
    preferredWorkMode: api.preferredWorkMode || [],
    prefferedShift: api.prefferedShift || "",
    preferredLocations: extractLocationIds(api.preferredLocations),
  };
};

// MAIN COMPONENT

function Profile() {
  const dispatch: AppDispatch = useDispatch();

  // STATE MANAGEMENT

  // Track if component is mounted (prevents hydration mismatch)
  const [mounted, setMounted] = useState(false);

  // Modal visibility states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [educationModalopen, setEducationModalopen] = useState(false);
  const [projectModalopen, setProjectModalopen] = useState(false);
  const [careerModalOpen, setCareerModalopen] = useState(false);
  const [resumeModalopen,setResumeModalopen] = useState(false)

  // Local loading state for specific operations
  const [localLoading, setLocalLoading] = useState(false);

  // REDUX STATE SELECTORS

  const {
    candidateProfileData,
    candidateProfileSummaryData,
    candidateProfileDetailsData,
    isLoading,
    candidateSkillsData,
    candidateCareerPreference,
    resumeData,
    error,
  } = useSelector((state: RootState) => state.Candidate);

  // Convert career preference data to modal-compatible format
  const rawCareerPref = candidateCareerPreference as ApiPreferenceData | null;
  const initialCareerPref = useMemo(
    () => toPreferenceData(rawCareerPref),
    [rawCareerPref]
  );

  // EFFECTS

  /**
   * Set mounted state on client side
   * Prevents hydration mismatch errors
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Fetch all profile data on component mount
   * Runs once when component first loads
   */
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Fetch all profile sections in parallel for better performance
        await Promise.all([
          dispatch(candidateProfile()),
          dispatch(candidateProfileDetails()),
          dispatch(candidateProfileSummary()),
          dispatch(candidateSkills()),
          dispatch(getCareerPreference()),
        ]);
      } catch (err) {
        console.error("Profile fetch failed:", err);
      }
    };

    fetchProfileData();
  }, [dispatch]);

  // STATIC DATA - Reference Lists

  /**
   * Reference lists for dropdowns and selections
   * In production, these should come from API
   */
  const referenceLists = {
    industries: [
      { _id: "684063dc2da1edfbf0b16d15", name: "Information Technology" },
      { _id: "684063dc2da1edfbf0b16d16", name: "Finance" },
    ],
    categories: [
      { _id: "68428ff075fcc3ce407f9e6d", name: "Digital Marketing" },
      {
        _id: "68428e3375fcc3ce407f9e55",
        name: "Software Developer & engineer",
      },
    ],
    locations: [
      { _id: "6841c7c5ba1fc9d2864095de", name: "Kolkata" },
      { _id: "6841c7c5ba1fc9d2864095df", name: "Bangalore" },
    ],
  };

  /**
   * Educational courses list
   */
  const coursesList = [
    { _id: "68616592b11e24cda89a25bf", name: "M.Tech" },
    { _id: "687b3e587572e3fc22a5917d", name: "MBA" },
    { _id: "6861661fb11e24cda89a25cf", name: "MCA" },
  ];

  /**
   * Specialization/Major list
   */
  const specializationsList = [
    { _id: "68619af4df47df50932eee78", name: "Computer Science" },
    { _id: "68619ae6df47df50932eee74", name: "Electronics" },
    { _id: "68619afddf47df50932eee7c", name: "Civil" },
    {
      _id: "68619b12df47df50932eee80",
      name: "Electronics and Telecommunication",
    },
  ];

  /**
   * Available skills list for selection
   */
  const allSkillsList = [
    { _id: "684144750459de7cb39f6674", name: "JavaScript" },
    { _id: "6841487bc9c551d782ec8061", name: "HTML/CSS" },
    { _id: "6850ea054c9560057dcf5424", name: "Bootstrap" },
    { _id: "6850ea864c9560057dcf5434", name: "Redux" },
    { _id: "6850eaaf4c9560057dcf5438", name: "Tailwind CSS" },
    { _id: "6850eaf64c9560057dcf5444", name: "Next.js" },
    { _id: "691c047c9a43a4f6e58e395b", name: "React" },
    { _id: "691c048a9a43a4f6e58e395c", name: "TypeScript" },
    { _id: "691c049b9a43a4f6e58e395d", name: "Node.js" },
    { _id: "691c04ac9a43a4f6e58e395e", name: "MongoDB" },
    { _id: "691c04bd9a43a4f6e58e395f", name: "Express.js" },
    { _id: "691c04ce9a43a4f6e58e3960", name: "Python" },
    { _id: "691c04df9a43a4f6e58e3961", name: "Django" },
    { _id: "691c04f09a43a4f6e58e3962", name: "Flask" },
    { _id: "691c05019a43a4f6e58e3963", name: "PostgreSQL" },
    { _id: "691c05129a43a4f6e58e3964", name: "MySQL" },
    { _id: "691c05239a43a4f6e58e3965", name: "Git" },
    { _id: "691c05349a43a4f6e58e3966", name: "Docker" },
    { _id: "691c05459a43a4f6e58e3967", name: "AWS" },
    { _id: "691c05569a43a4f6e58e3968", name: "REST API" },
  ];

  // LOADING & ERROR STATES

  /**
   * Show full page skeleton while:
   * - Component is not yet mounted (SSR)
   * - Data is being loaded
   */
  if (!mounted || isLoading) {
    return <ProfilePageSkeleton />;
  }

  /**
   * Handle case where profile data doesn't exist
   */
  if (!candidateProfileData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">No Profile Data</h3>
          <p className="text-muted-foreground">Unable to load your profile.</p>
        </div>
      </div>
    );
  }

  // DATA FORMATTING

  /**
   * Format profile data for display in ProfileDetails component
   * Converts raw API data to user-friendly format
   */
  const formattedUserData = {
    name: candidateProfileData.name,
    email: candidateProfileData.email,
    avatarUrl: `http://localhost:3005/${candidateProfileData.profilePicture}`,
    dob: candidateProfileData.profile?.dob?.split("T")[0] || "N/A",
    phone: candidateProfileData.profile?.phone || "N/A",
    address: candidateProfileData.profile?.address || "N/A",
    workStatus: candidateProfileData.profile?.workstatus || "N/A",
    currentSalary:
      candidateProfileData.profile?.currentSalary?.toString() || "0",
    availabiltyToJoin: `${
      candidateProfileData.profile?.availabiltyToJoin || 0
    } Days`,
    totalExperience: `${
      candidateProfileData.profile?.totalExperience?.years || 0
    } years ${
      candidateProfileData.profile?.totalExperience?.months || 0
    } months`,
    role: "Candidate",
  };

  /**
   * Format profile data for editing in modal
   * Preserves original data structure for form submission
   */
  const formatProfileData =
    candidateProfileData && candidateProfileData.profile
      ? {
          name: candidateProfileData.name || "",
          dob: candidateProfileData.profile.dob?.split("T")[0] || "",
          phone: candidateProfileData.profile.phone || "",
          gender: candidateProfileData.profile.gender || "",
          address: candidateProfileData.profile.address || "",
          workstatus: candidateProfileData.profile.workstatus || "",
          currentSalary: candidateProfileData.profile.currentSalary || 0,
          availabilityToJoin:
            candidateProfileData.profile.availabiltyToJoin || 0,
          totalExperience: {
            years: candidateProfileData.profile.totalExperience?.years || 0,
            months: candidateProfileData.profile.totalExperience?.months || 0,
          },
        }
      : {
          name: "",
          dob: "",
          phone: "",
          gender: "",
          address: "",
          workstatus: "",
          currentSalary: 0,
          availabilityToJoin: 0,
          totalExperience: {
            years: 0,
            months: 0,
          },
        };

  // EVENT HANDLERS - Modal Controls
  console.log(candidateProfileData, "ritwikkk");
  

  const handleEditProfile = () => setIsModalOpen(true);
  const handleSkillsEdit = () => setIsSkillsModalOpen(true);
  const handleEditSummary = () => setIsSummaryModalOpen(true);
  const handleEducationModal = () => setEducationModalopen(true);
  const handleProjectModal = () => setProjectModalopen(true);
  const handleCareerModal = () => setCareerModalopen(true);
  const handleChangeProfilePicture = () => console.log("Change Pic");
  const handleResumeUpload = () => setResumeModalopen(true);

  // EVENT HANDLERS - Data Updates

  /**
   * Save updated profile details
   * Refreshes profile data after successful update
   */
  const handleSaveProfileDetails = async (formData: any) => {
    try {
      await dispatch(candidateProfileDetailsUpdate(formData)).unwrap();
      // Refresh both profile views
      dispatch(candidateProfile());
      dispatch(candidateProfileDetails());
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  /**
   * Update professional summary
   */
  const handleSummaryUpdate = async (formData: any) => {
    try {
      await dispatch(candidateProfileSummaryUpdate(formData))
        .unwrap()
        .then(() => dispatch(candidateProfileSummary()));
    } catch (err) {
      console.error("Summary update failed:", err);
    }
  };

  /**
   * Update skills list
   * Accepts array of skill IDs
   */
  const handleSkillsUpdate = async (skillIds: string[]) => {
    try {
      await dispatch(candidateskillsUpdate({ skills: skillIds })).unwrap();
      dispatch(candidateSkills());
    } catch (err) {
      console.error("Skills update failed:", err);
    }
  };

  /**
   * Add new education entry
   * Shows loading state during operation
   */
  const handleAddEducation = async (formData: any) => {
    setLocalLoading(true);
    try {
      await dispatch(candidateAddEducation(formData))
        .unwrap()
      await dispatch(candidateProfile()) .unwrap();
      setEducationModalopen(false);
    } catch (err) {
      console.error("Education add failed:", err);
    } finally {
      setLocalLoading(false);
    }
  };

  /**
   * Delete education entry
   */
  const handleDeleteEducation = async (eduItem: any) => {
    try {
      await dispatch(candidateDeleteEducation(eduItem._id))
        .unwrap()
      await dispatch(candidateProfile()).unwrap();
    } catch (err) {
      // console.error("Education delete failed:", err);
    }
  };

  /**
   * Add new project entry
   */
  const handleAddProject = async (formData: any) => {
    setLocalLoading(true);
    try {
      await dispatch(candidateAddProjects(formData))
        .unwrap();
       await dispatch(candidateProfile()).unwrap();
      setProjectModalopen(false);
    } catch (err) {
      console.error("Project add failed:", err);
    } finally {
      setLocalLoading(false);
    }
  };

  /**
   * Delete project entry
   */
  const handleProjectDelete = async (project: any) => {
    try {
      await dispatch(candidateDeleteProject(project._id))
        .unwrap();
       await  dispatch(candidateProfile()).unwrap();
    } catch (err) {
      console.error("Project delete failed:", err);
    }
  };

  /**
   * Save career preferences
   * Updates backend and refreshes local state
   */
  const handleSavePreferences = async (updatedData: PreferenceData) => {
    try {
      await dispatch(updateCareerpreference(updatedData))
        .unwrap()
        .then(() => dispatch(getCareerPreference()));
      setCareerModalopen(false);
      toast.success("Preferences updated successfully!");
    } catch (error) {
      console.error("Failed to save preferences:", error);
      toast.error("Failed to save changes.");
    }
  };

    const handleResumeUploadApi = async (formData: any) => {
      console.log("resume uploading");
      
    try {
      // If updatedData is a File or contains a file, create FormData
    
      await dispatch(updateResume(formData))
        .unwrap();

      setResumeModalopen(false);
      // toast.success("Preferences updated successfully!");
    } catch (error) {
      console.error("Failed to save preferences:", error);
      toast.error("Failed to save changes.");
    }
  };

  return (
    <>
   <Header/>
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4">
      <div className="w-full max-w-5xl space-y-6">
        {/* PROFILE DETAILS SECTION */}
        <ProfileDetails
          userData={formattedUserData}
          onEditProfile={handleEditProfile}
          onChangeProfilePicture={handleChangeProfilePicture}
        />

        {/* Edit Profile Modal */}
        <EditProfileModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          data={formatProfileData}
          onSave={handleSaveProfileDetails}
        />

        {/* resume  */}

        <ResumeCard resume={resumeData} onEdit={handleResumeUpload} />
        <UploadResumeModal open={resumeModalopen} onOpenChange={setResumeModalopen} onSave={handleResumeUploadApi} />


        {/* PROFESSIONAL SUMMARY SECTION */}
        <ProfileSummaryCard
          onEdit={handleEditSummary}
          data={candidateProfileSummaryData}
        />

        {/* Edit Summary Modal */}
        <EditSummaryModal
          open={isSummaryModalOpen}
          onOpenChange={setIsSummaryModalOpen}
          initialData={candidateProfileSummaryData}
          onSave={handleSummaryUpdate}
        />

        {/* SKILLS SECTION */}
        <SkillsCard data={candidateSkillsData} onEdit={handleSkillsEdit} />

        {/* Edit Skills Modal */}
        <EditSkillsModal
          open={isSkillsModalOpen}
          onOpenChange={setIsSkillsModalOpen}
          initialData={candidateSkillsData}
          skillsList={allSkillsList}
          onSave={handleSkillsUpdate}
        />

        {/* EDUCATION SECTION */}

        <EducationList
          educationList={candidateProfileData?.profile?.education}
          onAdd={handleEducationModal}
          onDelete={handleDeleteEducation}
        />

        {/* Add Education Modal */}
        <EducationAddModal
          open={educationModalopen}
          onOpenChange={setEducationModalopen}
          onSave={handleAddEducation}
          coursesList={coursesList}
          specializationsList={specializationsList}
        />

        {/* PROJECTS SECTION */}

        <ProjectCard
          data={candidateProfileData?.profile?.projects}
          onAdd={handleProjectModal}
          onDelete={handleProjectDelete}
        />

        {/* Add Project Modal */}
        <ProjectAddModal
          open={projectModalopen}
          onOpenChange={setProjectModalopen}
          onSave={handleAddProject}
          isLoading={localLoading}
        />

        {/* CAREER PREFERENCES SECTION */}

        <CareerPreferenceCard
          data={initialCareerPref}
          references={referenceLists}
          onEdit={handleCareerModal}
        />

        {/* Career Preference Modal */}
        <CareerPreferenceModal
          key={careerModalOpen ? "career-open" : "career-closed"}
          open={careerModalOpen}
          onOpenChange={setCareerModalopen}
          initialData={initialCareerPref}
          industries={referenceLists.industries}
          categories={referenceLists.categories}
          locations={referenceLists.locations}
          onSave={handleSavePreferences}
        />
      </div>
    </div>
    </>
  );
}

export default Profile;
