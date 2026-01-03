import { AxiosInstance } from "@/api/axios/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { endPoints } from "@/api/endPoints/endPoints";
import { 
  AddEducationPayload, 
  AddProjectApiResponse, 
  AddProjectPayload, 
  CandidateBasicDetailsResponse, 
  CandidateDashboardApiResponse, 
  CandidateData, 
  CandidateProfileApiResponse, 
  CareerPreferencesResponse, 
  DeleteEducationResponse, 
  DeleteWorkExperienceResponse, 
  EducationListApiResponse, 
  profileSummaryResponse, 
  Resume, 
  SkillsListResponse, 
  UpdateCandidateBasicDetailsPayload, 
  UpdateCandidateBasicDetailsResponse, 
  UpdateCareerPreferencesPayload, 
  UpdateCareerPreferencesResponse, 
  UpdateProfileSummaryPayload, 
  UpdateProfileSummaryResponse, 
  UpdateResumeResponse, 
  UpdateSkillsPayload, 
  UpdateSkillsResponse 
} from "@/typeScript/candidate_interface/candidate.interface";
import { AxiosError } from "axios";

//  Define proper state interface
interface CandidateState {
  candidateDashboardData: any;
  isLoading: boolean;
  error: string | null;
  candidateProfileData: CandidateData | null; 
  candidateProfileDetailsData: any;
  candidateProfileSummaryData: any;
  candidateSkillsData: any[];
  candidateCareerPreference: any;
  resumeData: Resume | null; 
}

const initialState: CandidateState = {
  candidateDashboardData: {},
  isLoading: false,
  error: null,
  candidateProfileData: null, 
  candidateProfileDetailsData: {},
  candidateProfileSummaryData: {},
  candidateSkillsData: [],
  candidateCareerPreference: {},
  resumeData: null, 
};


//  Define ApiError interface
interface ApiError {
  status: boolean;
  message: string;
}

// 1. DASHBOARD
export const candidateDashboard = createAsyncThunk<
  CandidateDashboardApiResponse,
  void,
  { rejectValue: ApiError }
>(
  "candidateDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.get<CandidateDashboardApiResponse>(
        endPoints.cms.candidate.dashboard
      );
      return res?.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch candidate dashboard";
      return rejectWithValue({ status: false, message });
    }
  }
);

// 2. PROFILE
export const candidateProfile = createAsyncThunk<
  CandidateProfileApiResponse,
  void,
  { rejectValue: ApiError }
>(
  "candidateProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.get<CandidateProfileApiResponse>(
        endPoints.cms.candidate.profile
      );
      return res?.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch profile";
      return rejectWithValue({ status: false, message });
    }
  }
);

// 3. PROFILE DETAILS
export const candidateProfileDetails = createAsyncThunk<
  CandidateBasicDetailsResponse,
  void,
  { rejectValue: ApiError }
>(
  "candidateProfileDetails",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.get<CandidateBasicDetailsResponse>(
        endPoints.cms.candidate.profiledetails
      );
      return res?.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue({
        status: false,
        message: error.response?.data?.message || error.message || "Failed to fetch profile details",
      });
    }
  }
);

// 4. PROFILE DETAILS UPDATE
export const candidateProfileDetailsUpdate = createAsyncThunk<
  UpdateCandidateBasicDetailsResponse,
  UpdateCandidateBasicDetailsPayload,
  { rejectValue: ApiError }
>(
  "candidateProfileDetailsUpdate",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.put<UpdateCandidateBasicDetailsResponse>(
        endPoints.cms.candidate.profileDetailsUpdate,
        formData
      );
      return res?.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue({
        status: false,
        message: error.response?.data?.message || error.message || "Failed to update profile",
      });
    }
  }
);

// 5. PROFILE SUMMARY
export const candidateProfileSummary = createAsyncThunk<
  profileSummaryResponse,
  void,
  { rejectValue: ApiError }
>(
  "candidateProfileSummary",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.get<profileSummaryResponse>(
        endPoints.cms.candidate.profileSummary
      );
      return res?.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue({
        status: false,
        message: error.response?.data?.message || error.message || "Failed to fetch summary",
      });
    }
  }
);

// 6. PROFILE SUMMARY UPDATE
export const candidateProfileSummaryUpdate = createAsyncThunk<
  UpdateProfileSummaryResponse,
  UpdateProfileSummaryPayload,
  { rejectValue: ApiError }
>(
  "candidateProfileSummaryUpdate",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.put<UpdateProfileSummaryResponse>(
        endPoints.cms.candidate.profileSummaryUpdate,
        formData
      );
      return res?.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue({
        status: false,
        message: error.response?.data?.message || error.message || "Failed to update summary",
      });
    }
  }
);

// 7. CANDIDATE SKILLS (GET)
export const candidateSkills = createAsyncThunk<
  SkillsListResponse,
  void,
  { rejectValue: ApiError }
>(
  "candidateSkills",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.get<SkillsListResponse>(
        endPoints.cms.candidate.skills
      );
      return res?.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue({
        status: false,
        message: error.response?.data?.message || error.message || "Failed to fetch skills",
      });
    }
  }
);

// 8. SKILLS UPDATE
export const candidateskillsUpdate = createAsyncThunk<
  UpdateSkillsResponse,
  UpdateSkillsPayload,
  { rejectValue: ApiError }
>(
  "candidateskillsUpdate",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.put<UpdateSkillsResponse>(
        endPoints.cms.candidate.skillsUpdate,
        formData
      );
      return res?.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue({
        status: false,
        message: error.response?.data?.message || error.message || "Failed to update skills",
      });
    }
  }
);

// 9. ADD EDUCATION
export const candidateAddEducation = createAsyncThunk<
  EducationListApiResponse,
  AddEducationPayload,
  { rejectValue: ApiError }
>(
  "candidateAddEducation",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.post<EducationListApiResponse>(
        endPoints.cms.candidate.addEducation,
        formData
      );
      return res?.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue({
        status: false,
        message: error.response?.data?.message || error.message || "Failed to add education",
      });
    }
  }
);

// 10. DELETE EDUCATION
export const candidateDeleteEducation = createAsyncThunk<
  DeleteEducationResponse,
  string,
  { rejectValue: ApiError }
>(
  "candidateDeleteEducation",
  async (id, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.delete<DeleteEducationResponse>(
        `${endPoints.cms.candidate.deleteEducation}${id}/delete`
      );
      return res?.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue({
        status: false,
        message: error.response?.data?.message || error.message || "Failed to delete education",
      });
    }
  }
);

// 11. ADD PROJECT
export const candidateAddProjects = createAsyncThunk<
  AddProjectApiResponse,
  AddProjectPayload,
  { rejectValue: ApiError }
>(
  "candidateAddProjects",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.post<AddProjectApiResponse>(
        endPoints.cms.candidate.addProjects,
        formData
      );
      return res?.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue({
        status: false,
        message: error.response?.data?.message || error.message || "Failed to add project",
      });
    }
  }
);

// 12. DELETE PROJECT
export const candidateDeleteProject = createAsyncThunk<
  DeleteWorkExperienceResponse,
  string,
  { rejectValue: ApiError }
>(
  "candidateDeleteProject",
  async (id, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.delete<DeleteWorkExperienceResponse>(
        `${endPoints.cms.candidate.deleteProject}${id}/delete`
      );
      return res?.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue({
        status: false,
        message: error.response?.data?.message || error.message || "Failed to delete project",
      });
    }
  }
);

// 13. GET CAREER PREFERENCE
export const getCareerPreference = createAsyncThunk<
  CareerPreferencesResponse,
  void,
  { rejectValue: ApiError }
>(
  "getCareerPreference",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.get<CareerPreferencesResponse>(
        endPoints.cms.candidate.getCareerPreference
      );
      return res?.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue({
        status: false,
        message: error.response?.data?.message || error.message || "Failed to fetch career preference",
      });
    }
  }
);

// 14. UPDATE CAREER PREFERENCE
export const updateCareerpreference = createAsyncThunk<
  UpdateCareerPreferencesResponse,
  UpdateCareerPreferencesPayload,
  { rejectValue: ApiError }
>(
  "updateCareerpreference",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.put<UpdateCareerPreferencesResponse>(
        endPoints.cms.candidate.updateCareerpreference,
        formData
      );
      return res?.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue({
        status: false,
        message: error.response?.data?.message || error.message || "Failed to update career preference",
      });
    }
  }
);

///// update resume ////
export const updateResume = createAsyncThunk<
  UpdateResumeResponse,
  FormData, 
  { rejectValue: ApiError }
>(
  "updateResume",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.put<UpdateResumeResponse>(
        endPoints.cms.candidate.resumeUpdate,
        formData,
      );
      return res?.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue({
        status: false,
        message: error.response?.data?.message || error.message || "Failed to update resume",
      });
    }
  }
);

export const candidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- Dashboard ---
      .addCase(candidateDashboard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(candidateDashboard.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload?.status) {
          toast.success(payload.message);
          state.candidateDashboardData = payload.data;
        }
      })
      .addCase(candidateDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch dashboard";
        toast.error(state.error);
      })

      // --- Profile ---
      .addCase(candidateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(candidateProfile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload?.status) {
          toast.success(payload.message);
          state.candidateProfileData = payload.data;
          state.resumeData = payload?.data?.profile?.resume;
        }
      })
      .addCase(candidateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch profile";
        toast.error(state.error);
      })

      // --- Profile Details ---
      .addCase(candidateProfileDetails.fulfilled, (state, { payload }) => {
        if (payload?.status) {
          state.candidateProfileDetailsData = payload.data;
        }
      })

      // --- Profile Details Update ---
      .addCase(candidateProfileDetailsUpdate.fulfilled, (state, { payload }) => {
        if (payload?.status) {
          toast.success(payload.message);
        }
      })

      // --- Profile Summary ---
      .addCase(candidateProfileSummary.fulfilled, (state, { payload }) => {
        if (payload?.status) {
          state.candidateProfileSummaryData = { summary: payload.data };
        }
      })

      // --- Profile Summary Update ---
      .addCase(candidateProfileSummaryUpdate.fulfilled, (state, { payload }) => {
        if (payload?.status) {
          toast.success(payload.message);
        }
      })
      .addCase(candidateProfileSummaryUpdate.rejected, (state, action) => {
        toast.error(action.payload?.message || "Failed to update summary");
      })

      // --- Skills ---
      .addCase(candidateSkills.fulfilled, (state, { payload }) => {
        if (payload?.status) {
          state.candidateSkillsData = payload.data;
        }
      })
      .addCase(candidateSkills.rejected, (state, action) => {
        toast.error(action.payload?.message || "Failed to fetch skills");
      })

      // --- Skills Update ---
      .addCase(candidateskillsUpdate.fulfilled, (state, { payload }) => {
        if (payload?.status) {
          toast.success(payload.message);
        }
      })
      .addCase(candidateskillsUpdate.rejected, (state, action) => {
        toast.error(action.payload?.message || "Failed to update skills");
      })

      // --- Add Education ---
      .addCase(candidateAddEducation.fulfilled, (state, { payload }) => {
        if (payload?.status) {
          toast.success(payload.message);
        }
      })
      .addCase(candidateAddEducation.rejected, (state, action) => {
        toast.error(action.payload?.message || "Failed to add education");
      })

      // --- Delete Education ---
      .addCase(candidateDeleteEducation.fulfilled, (state, { payload }) => {
        if (payload?.status) {
          toast.success(payload.message);
        }
      })
      .addCase(candidateDeleteEducation.rejected, (state, action) => {
        toast.error(action.payload?.message || "Failed to delete education");
      })

      // --- Add Project ---
      .addCase(candidateAddProjects.fulfilled, (state, { payload }) => {
        if (payload?.status) {
          toast.success(payload.message);
        }
      })
      .addCase(candidateAddProjects.rejected, (state, action) => {
        toast.error(action.payload?.message || "Failed to add project");
      })

      // --- Delete Project ---
      .addCase(candidateDeleteProject.fulfilled, (state, { payload }) => {
        if (payload?.status) {
          toast.success(payload.message);
        }
      })
      .addCase(candidateDeleteProject.rejected, (state, action) => {
        toast.error(action.payload?.message || "Failed to delete project");
      })

      // --- Get Career Preference ---
      .addCase(getCareerPreference.fulfilled, (state, { payload }) => {
        if (payload?.status) {
          toast.success(payload.message);
          state.candidateCareerPreference = payload.data;
        }
      })
      .addCase(getCareerPreference.rejected, (state, action) => {
        toast.error(action.payload?.message || "Failed to fetch career preference");
      })

      // --- Update Career Preference ---
      .addCase(updateCareerpreference.fulfilled, (state, { payload }) => {
        if (payload?.status) {
          toast.success(payload.message);
        }
      })
      .addCase(updateCareerpreference.rejected, (state, action) => {
        toast.error(action.payload?.message || "Failed to update career preference");
      })


      // --- Update Career Preference ---
      .addCase(updateResume.fulfilled, (state, { payload }) => {
        if (payload?.status) {
          toast.success(payload.message);
          state.resumeData = payload?.data;
        }
      })
      .addCase(updateResume.rejected, (state, action) => {
        toast.error(action.payload?.message || "Failed to update career preference");
      });




  },
});

export const {} = candidateSlice.actions;
export default candidateSlice;
