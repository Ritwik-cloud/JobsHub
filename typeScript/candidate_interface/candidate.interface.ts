export interface Skill {
  _id: string;
  // Add other skill fields if available (e.g. name)
}

export interface WorkExperience {
  companyName: string;
  currentEmployment: boolean;
  jobTitle: string;
  joiningDate: string;
  workTillDate: string | null;
  skillsUsed: string[]; // Assuming these are skill IDs
  jobProfile: string;
  _id: string;
}

export interface Education {
  level: string;
  boardOrUniversity: string;
  course: string | null; // Assuming course ID or null
  specialization: string | null; // Assuming specialization ID or null
  marksPercentage: number;
  passingOutYear: string | null;
  durationFrom: string | null;
  durationTo: string | null;
  _id: string;
}

export interface Project {
  title: string;
  description: string;
  link: string | null;
  _id: string;
}

export interface Resume {
  originalName: string;
  path: string;
}

export interface TotalExperience {
  years: number;
  months: number;
}

export interface CandidateProfile {
  totalExperience: TotalExperience;
  resume: Resume;
  dob: string;
  phone: string;
  gender: string;
  workstatus: string;
  availabiltyToJoin: number;
  currentSalary: number;
  address: string;
  skills: string[]; // Array of Skill IDs
  workExperience: WorkExperience[];
  education: Education[];
  certifications: Certification[];
  profileSummary: string;
  preferredIndustry: string; // ID
  preferredJobCategory: string; // ID
  preferredLocations: string[]; // Array of IDs
  prefferedShift: string;
  bookmarkedJobs: string[]; // Array of Job IDs
  preferredWorkMode: string[];
  projects: Project[];
}

export interface CandidateDetail {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  role: string;
  isRemoved: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  profile: CandidateProfile;
  profilePicture?: string;
  isActive: boolean;
}

export interface CandidateDashboardData {
  candidateDetail: CandidateDetail;
  applicationsCount: number;
  acceptedApplicationsCount: number;
  pendingApplicationsCount: number;
  recommendedJobs: any[]; // Empty in example
  totalRecommendedJobs: number;
}

export interface CandidateDashboardApiResponse {
  status: boolean;
  message: string;
  data: CandidateDashboardData;
}



// candidate profile 

export interface TotalExperience {
  years: number;
  months: number;
}

export interface UserProfile {
  dob: string; // ISO Date string
  phone: string;
  gender: string;
  workstatus: string;
  availabiltyToJoin: number;
  totalExperience: TotalExperience;
  currentSalary: number;
  address: string;
}

export interface UserData {
  _id: string;
  name: string;
  email: string;
  updatedAt: string; 
  profile: CandidateProfile;
  profilePicture: string;
}

export interface CandidateProfileApiResponse {
  status: boolean;
  message: string;
  data: UserData;
}

//// candidate basic details ////
// types/candidate.types.ts

// Total experience
export interface CandidateTotalExperience {
  years: number;
  months: number;
}

// Candidate profile
export interface CandidateProfileData {
  dob: string;
  phone: string;
  gender: "male" | "female" | "other" | string;
  workstatus: "fresher" | "experienced" | string;
  availabiltyToJoin: number; // Days
  totalExperience: CandidateTotalExperience;
  currentSalary: number;
  address: string;
}

// Candidate data
export interface CandidateData {
  _id: string;
  name: string;
  email: string;
  updatedAt: string;
  profile: CandidateProfile;
  profilePicture?: string;
}

// Candidate basic details Response
export interface CandidateBasicDetailsResponse {
  status: boolean;
  message: string;
  data: CandidateData;
}


//// candidate baic details update ////

// types/candidate.types.ts

// Total Experience
export interface TotalExperience {
  years: number;
  months: number;
}

// Resume
export interface CandidateResume {
  originalName: string;
  path: string;
}

// Work Experience
export interface CandidateWorkExperience {
  _id: string;
  companyName: string;
  currentEmployment: boolean;
  jobTitle: string;
  joiningDate: string;
  workTillDate: string | null;
  skillsUsed: string[]; // Array of skill IDs
  jobProfile: string;
}

// Education
export interface CandidateEducation {
  _id: string;
  level: "Tenth" | "Twelfth" | "Diploma" | "Graduation" | "Post Graduation" | string;
  boardOrUniversity: string;
  course: string | null;
  specialization: string | null;
  marksPercentage: number;
  passingOutYear: string | null;
  durationFrom: string | null;
  durationTo: string | null;
}

// Project
export interface CandidateProject {
  _id: string;
  title: string;
  description: string;
  link: string;
}

// Full Profile Data
export interface CandidateFullProfile {
  totalExperience: TotalExperience;
  resume: CandidateResume;
  dob: string;
  phone: string;
  gender: "male" | "female" | "other" | string;
  workstatus: "fresher" | "experienced" | string;
  availabiltyToJoin: number;
  currentSalary: number;
  address: string;
  skills: string[]; // Array of skill IDs
  workExperience: CandidateWorkExperience[];
  education: CandidateEducation[];
  certifications: Certification[]; // Use Certification[] for consistency
  profileSummary: string;
  preferredIndustry: string;
  preferredJobCategory: string;
  preferredLocations: string[];
  prefferedShift: "day" | "night" | "flexible" | string;
  bookmarkedJobs: string[];
  preferredWorkMode: string[];
  projects: CandidateProject[];
}

// Updated Candidate Data
export interface UpdatedCandidateData {
  _id: string;
  name: string;
  updatedAt: string;
  profile: CandidateFullProfile;
}

// Update Payload
export interface UpdateCandidateBasicDetailsPayload {
  name: string;
  dob: string;
  phone: string;
  gender: "male" | "female" | "other" | string;
  address: string;
  availabilityToJoin: number;
  currentSalary: number;
  totalExperience: TotalExperience;
  workstatus: "fresher" | "experienced" | string;
}

// Update Response
export interface UpdateCandidateBasicDetailsResponse {
  status: boolean;
  message: string;
  data: UpdatedCandidateData;
}


///////  profile summary ///


export interface profileSummaryResponse {
  status: boolean;
  message: string;
  data: string;
}


////    Update Profile Summary ///


// Update Profile Summary Payload
export interface UpdateProfileSummaryPayload {
  profileSummary: string;
}

// Profile Summary Data
export interface ProfileSummaryData {
  _id: string;
  profile: {
    profileSummary: string;
  };
}

// Update Profile Summary Response
export interface UpdateProfileSummaryResponse {
  status: boolean;
  message: string;
  data: ProfileSummaryData;
}


// types/skill.types.ts

// Skill
export interface Skill {
  _id: string;
  name: string;
}

// Skills List Response
export interface SkillsListResponse {
  status: boolean;
  message: string;
  data: Skill[];
}


////// --------------  update ----------------////

// Update Skills Payload
export interface UpdateSkillsPayload {
  skills: string[]; 
}

// Skills Data
export interface SkillsData {
  _id: string;
  profile: {
    skills: string[];
  };
}

// Update Skills Response
export interface UpdateSkillsResponse {
  status: boolean;
  message: string;
  data: SkillsData;
}


///// add education types

// REQUEST & RESPONSE TYPES  


// What you send to the API (with IDs)
export interface AddEducationPayload {
  level: string;
  boardOrUniversity: string;
  course: string;
  specialization?: string;
  durationFrom: string; // Format: "YYYY-MM"
  durationTo: string; // Format: "YYYY-MM"
  marksPercentage?: number;
  passingOutYear?: string; // Format: "YYYY"
}

// What you receive from the API (with resolved names)
export interface EducationData {
  _id?: string;
  level: string;
  boardOrUniversity: string;
  course: string; 
  specialization?: string; 
  durationFrom?: string;
  durationTo?: string;
  marksPercentage?: number;
  passingOutYear?: string;
}



// List response
export interface EducationListApiResponse {
  status: boolean;
  message: string;
  data: EducationData[];
}

////

// types/candidate.types.ts

// ============================================
// NESTED OBJECT TYPES
// ============================================

// Total Experience
export interface TotalExperience {
  years: number;
  months: number;
}

// Resume
export interface Resume {
  originalName: string;
  path: string;
}

// Skill (just ID reference in profile)
export type SkillId = string;

// Work Experience
export interface WorkExperience {
  _id: string;
  companyName: string;
  currentEmployment: boolean;
  jobTitle: string;
  joiningDate: string; // ISO date string
  workTillDate: string | null; // ISO date string
  skillsUsed: string[]; // Array of skill IDs
  jobProfile: string;
}

// Education
export interface Education {
  _id: string;
  level: string;
  boardOrUniversity: string;
  course: string | null; // Can be ID or resolved name
  specialization: string | null; // Can be ID or resolved name
  marksPercentage: number;
  passingOutYear: string | null;
  durationFrom: string | null; // Format: "YYYY-MM"
  durationTo: string | null; // Format: "YYYY-MM"
}

// Certification
export interface Certification {
  _id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

// Project
export interface Project {
  _id: string;
  title: string;
  description: string;
  link: string | null;
}

// Profile (nested object)
export interface CandidateProfile {
  totalExperience: TotalExperience;
  resume: Resume;
  dob: string; // ISO date string
  phone: string;
  gender: string;
  workstatus: string; // "experienced" | "fresher"
  availabiltyToJoin: number; // Note: typo in API (availability)
  currentSalary: number;
  address: string;
  skills: SkillId[]; 
  workExperience: WorkExperience[];
  education: Education[];
  certifications: Certification[];
  profileSummary: string;
  preferredIndustry: string; // Industry ID
  preferredJobCategory: string; // Category ID
  preferredLocations: string[]; // Array of location IDs
  prefferedShift: string; // Note: typo in API (preferred)
  bookmarkedJobs: string[]; // Array of job IDs
  preferredWorkMode: string[]; // ["work from office", "remote", "hybrid"]
  projects: Project[];
  
}



// export interface CandidateData {
//   _id: string;
//   name: string;
//   email: string;
//   password: string; 
//   isVerified: boolean;
//   role: string;
//   isRemoved: boolean;
//   createdAt: string; 
//   updatedAt: string; 
//   __v: number;
//   profile: CandidateProfile;
//   profilePicture?: string;
//   isActive: boolean;
// }



// Delete Education Response
export interface DeleteEducationResponse {
  status: boolean;
  message: string;
  data: CandidateProfileData; 
}



//////   add project ////


export interface AddProjectPayload {
  title: string;
  description: string;
  link: string;
}

// Project data structure
export interface Project {
  _id: string;
  title: string;
  description: string;
  link: string | null;
}

// Add Project Response
export interface AddProjectApiResponse {
  status: boolean;
  message: string;
  data: Project;
}


///// delete project ///

// Delete Work Experience Response
export interface DeleteWorkExperienceResponse {
  status: boolean;
  message: string;
  data: CandidateProfileData;
}



///// career preference ////

interface PreferredLocation {
  _id: string;
  name: string;
  normalized: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface PreferredIndustry {
  _id: string;
  name: string;
  normalized: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface PreferredJobCategory {
  _id: string;
  name: string;
  normalized: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface CareerPreferencesData {
  preferredLocations: PreferredLocation[];
  preferredIndustry: PreferredIndustry;
  preferredJobCategory: PreferredJobCategory;
  preferredWorkMode: string[]; 
  prefferedShift: string;    
}

export interface CareerPreferencesResponse {
  status: boolean;
  message: string;
  data: CareerPreferencesData;
}


//// update careerpreferences ///

export interface UpdateCareerPreferencesPayload {
  preferredIndustry: string;
  preferredJobCategory: string;
  preferredLocations: string[];
  preferredWorkMode: string[];
  prefferedShift: string;
}

export interface UpdateCareerPreferencesResponse {
  status: boolean;
  message: string;
  data: CandidateProfileData;
}



/////   resume update ///

// Resume type
export interface Resume {
  originalName: string;
  path: string;
}

// Update Resume Response
export interface UpdateResumeResponse {
  status: boolean;
  message: string;
  data: Resume;
}

