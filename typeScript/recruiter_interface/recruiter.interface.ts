 

//// dashboard type ////

  // Inner "data" object
export interface RecruiterDashboardData {
  totalJobs: number;
  activeJobs: number;
  activeJobsClosingSoon: number;
  totalApllicationsCount: number;     
  jobsWithLeftDays: any[];           
  pendingApplictionsCount: number;
  acceptedApplictionsCount: number;
  rejectedApplictionsCount: number;
  company: string;
  recruiterName: string;
  designation: string;
}

// Recruiter Profile nested object
export interface RecruiterProfile {
  designation: string;
  companyRole: "admin_recruiter" | "recruiter"; // or just string if more roles exist
  isActive: boolean;
  approvalStatus: "approved" | "pending" | "rejected"; // or just string
}

// Inner "data" object
export interface RecruiterProfileData {
  isActive: boolean;
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  role: string;
  recruiterProfile: RecruiterProfile;
  createdAt: string; // or Date if you parse it
  updatedAt: string; // or Date if you parse it
  __v: number;
  company: string;
  isRemoved: boolean;
  profilePicture: string;
}
// Recruiter Profile nested object
export interface RecruiterProfileInfo {
  designation: string;
  companyRole: "admin_recruiter" | "basic_recruiter" | string;
  compnayRole?: string; // typo in API - keep for compatibility
  approvalStatus: "approved" | "pending" | "rejected" | string;
  isActive: boolean;
}

// Individual Recruiter object
export interface RecruiterData {
  isActive: boolean;
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  role: string;
  recruiterProfile: RecruiterProfileInfo;
  createdAt: string; // or Date if you parse it
  updatedAt: string; // or Date if you parse it
  __v: number;
  company: string;
  isRemoved: boolean;
  createdAtFormatted: string;
}

// Full API response (array of recruiters)
export interface ManageRecruitersResponse {
  status: boolean;
  message: string;
  data: RecruiterData[];
}

// Nested interfaces - build from innermost to outermost
export interface Location {
  _id: string;
  name: string;
  normalized: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface JobCategory {
  _id: string;
  name: string;
  normalized: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Industry {
  _id: string;
  name: string;
  normalized: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Skill {
  _id: string;
  name: string;
  normalized: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Main Job object
export interface Job {
  _id: string;
  title: string;
  slug: string;
  description: string;
  company: string;
  postedBy: string;
  location: Location[];
  jobCategory: JobCategory;
  industry: Industry;
  jobType: "full-time" | "part-time" | "contract" | "internship" | string;
  workMode: "work from office" | "work from home" | "hybrid" | string;
  experienceLevel: "fresher" | "entry-level" | "mid-level" | "senior" | null | string;
  minimumExperience: number;
  maximumExperience: number;
  minimumSalary: number | null;
  maximumSalary: number | null;
  skillsRequired: Skill[];
  applicationDeadline: string;
  status: "active" | "inactive" | "closed" | string;
  vacancies: number | null;
  views: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Job creation payload type

export interface CreateJobPayload {
  title: string;
  description: string;
  location: string[]; // Array of location IDs
  industry: string; // Industry ID
  jobCategory: string; // Job category ID
  jobType: "full-time" | "part-time" | "contract" | "internship" | string;
  workMode: "remote" | "work from office" | "hybrid" | string;
  experienceLevel: "fresher" | "entry-level" | "mid-level" | "senior" | string;
  minimumExperience: number;
  maximumExperience: number;
  minimumSalary: number;
  maximumSalary: number;
  skillsRequired: string[];
  applicationDeadline: string; 
  vacancies: number;
}


// Company update payload type
export interface UpdateCompanyPayload {
  name: string;
  email: string;
  website: string;
  description: string;
  logo?: File | string; // Optional - can be a file or existing path
}

// Company data object
export interface CompanyData {
  _id: string;
  name: string;
  slug: string;
  recruiters: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  createdBy: string;
  email: string;
  logo: string;
  website: string;
  isActive: boolean;
  description: string;
}

export interface EditJobFormData {
  title: string;
  description: string;
  location: string[];
  industry: string;
  jobCategory: string;
  jobType: string;
  workMode: string;
  experienceLevel: string;
  minimumExperience: number;
  maximumExperience: number;
  minimumSalary: number | null;
  maximumSalary: number | null;
  skillsRequired: string[];
  applicationDeadline: string;
  vacancies: number | null;
}


// Candidate info in application
export interface ApplicationCandidate {
  _id: string;
  name: string;
}

// Job info in application
export interface ApplicationJob {
  _id: string;
  title: string;
}

// Resume info
export interface ApplicationResume {
  path: string;
  originalName: string;
}

// Individual Application object
export interface Application {
  _id: string;
  candidate: ApplicationCandidate;
  job: ApplicationJob;
  status: "pending" | "accepted" | "rejected" | "shortlisted" | string;
  resume: ApplicationResume;
  applicationDate: string; 
}
export type ApplicationStatus = "" | "pending" | "rejected" | "accepted" | "shortlisted";
// Job Applications Query Parameters
export interface JobApplicationsParams {
  jobId: string;
  page?: number;
  limit?: number;
  search?: string;
  status?:  ApplicationStatus;
}

// Full API response
export interface ApplicationsListResponse {
  status: boolean;
  message: string;
  data: Application[];
  totalApplications: number;
}


// Company update response type
export interface UpdateCompanyResponse {
  status: boolean;
  message: string;
  data: CompanyData;
}

// Also update the getCompanyDetails response type
export interface GetCompanyDetailsResponse {
  status: boolean;
  message: string;
  data: CompanyData;
}

// Delete Job Response
export interface DeleteJobResponse {
  status: boolean;
  message: string;
}


// Job status update payload type
export interface JobStatusUpdatePayload {
  id: string;
  status: "active" | "inactive" | "closed" | string;
}

// Job status update response type
export interface JobStatusUpdateResponse {
  status: boolean;
  message: string;
  jobStatus: "active" | "inactive" | "closed" | string;
}

// Job creation response type
export interface CreateJobResponse {
  status: boolean;
  message: string;
}


// Full API response with pagination
export interface AllJobsResponse {
  status: boolean;
  message: string;
  data: Job[];
  page: number;
  totalPages: number;
}

// Full API response
export interface RecruiterProfileResponse {
  status: boolean;
  message: string;
  data: RecruiterProfileData;
}

// Full API response
export interface RecruiterDashboardResponse {
  status: boolean;
  message: string;
  data: RecruiterDashboardData;
}




// application details

// Education entry
export interface Education {
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

// Work experience entry
export interface WorkExperience {
  _id: string;
  companyName: string;
  designation: string;
  startDate: string;
  endDate: string | null;
  currentlyWorking: boolean;
  description?: string;
}

// Skill
export interface Skill {
  _id: string;
  name: string;
  normalized: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Total experience
export interface TotalExperience {
  years: number;
  months: number;
}

// Candidate profile
export interface CandidateProfile {
  phone: string;
  totalExperience: TotalExperience;
  workstatus: "fresher" | "experienced" | string;
  education: Education[];
  workExperience: WorkExperience[];
  skills: Skill[];
}

// Candidate info in application details
export interface ApplicationCandidateInfo {
  _id: string;
  name: string;
  email: string;
  profile: CandidateProfile;
  profilePicture: string;
}

// Resume details
export interface ApplicationResumeDetails {
  originalName: string;
  path: string;
}

// Application details data
export interface ApplicationDetailsData {
  _id: string;
  status: "pending" | "accepted" | "rejected" | "shortlisted" | string;
  applicationDate: string;
  candidateInfo: ApplicationCandidateInfo;
  resume: ApplicationResumeDetails;
}


export interface ApplicationDetailsParams {
  id: string;
}

// Full API response
export interface ApplicationDetailsResponse {
  status: boolean;
  message: string;
  data: ApplicationDetailsData;
}


///// job details types---///



// Company info in job details
export interface JobCompany {
  _id: string;
  name: string;
  logo: string;
}

// Posted by info
export interface JobPostedBy {
  _id: string;
  name: string;
  email: string;
  designation: string;
}

// Job category
export interface JobCategory {
  _id: string;
  name: string;
}

// Industry
export interface Industry {
  _id: string;
  name: string;
}

// Location (simplified)
export interface JobLocation {
  _id: string;
  name: string;
}
// Define interface for the params
export interface GetAllJobsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

// Skill (simplified)
export interface JobSkill {
  _id: string;
  name: string;
}

// Job Details Data
export interface JobDetailsData {
  _id: string;
  title: string;
  description: string;
  company: JobCompany;
  postedBy: JobPostedBy;
  jobCategory: JobCategory;
  industry: Industry;
  jobType: "full-time" | "part-time" | "contract" | "internship" | string;
  workMode: "work from office" | "work from home" | "hybrid" | "remote" | string;
  experienceLevel: "fresher" | "entry-level" | "mid-level" | "senior" | string;
  minimumExperience: number;
  maximumExperience: number;
  minimumSalary: number | null;
  maximumSalary: number | null;
  applicationDeadline: string;
  status: "active" | "inactive" | "closed" | string;
  vacancies: number | null;
  createdAt: string;
  updatedAt: string;
  location: JobLocation[];
  skillsRequired: JobSkill[];
}

export interface JobDetailsParams {
  id: string;
}
// Job Details Response
export interface JobDetailsResponse {
  status: boolean;
  message: string;
  data: JobDetailsData;
}


/////   company details type ----////



// Company Data
export interface CompanyData {
  _id: string;
  name: string;
  slug: string;
  recruiters: string[]; // Array of recruiter IDs
  createdAt: string;
  updatedAt: string;
  __v: number;
  createdBy: string;
  email: string;
  logo: string;
  website: string;
  isActive: boolean;
  description: string;
}

// Company Details Response
export interface CompanyDetailsResponse {
  status: boolean;
  message: string;
  data: CompanyData;
}


///// update job types ---///

// types/job.types.ts

// Update Job Payload
export interface UpdateJobPayload {
  title: string;
  description: string;
  location: string[];
  industry: string;
  jobCategory: string;
  jobType: "full-time" | "part-time" | "contract" | "internship" | string;
  workMode: "work from office" | "work from home" | "hybrid" | "remote" | string;
  experienceLevel: "fresher" | "entry-level" | "mid-level" | "senior" | string;
  minimumExperience: number;
  maximumExperience: number;
  minimumSalary: number | null;
  maximumSalary: number | null;
  skillsRequired: string[];
  applicationDeadline: string; // YYYY-MM-DD format
  vacancies: number | null;
}

// Validation Error Response
export interface ValidationErrorResponse {
  status: false;
  errors: {
    [key: string]: string; // Dynamic field errors
  };
}



// Update Job Response
export interface UpdateJobResponse {
  status: boolean;
  message: string;
  data?: JobDetailsData;
}
