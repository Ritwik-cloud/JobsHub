import { AxiosInstance } from "@/api/axios/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { endPoints } from "@/api/endPoints/endPoints";
import { AllJobsResponse, ApplicationDetailsParams, ApplicationDetailsResponse, ApplicationsListResponse, CompanyDetailsResponse, CreateJobPayload, CreateJobResponse, DeleteJobResponse, GetAllJobsParams, JobApplicationsParams, JobDetailsParams, JobDetailsResponse, JobStatusUpdatePayload, JobStatusUpdateResponse, ManageRecruitersResponse, RecruiterDashboardResponse, RecruiterProfileResponse, UpdateCompanyPayload, UpdateCompanyResponse, UpdateJobPayload, UpdateJobResponse } from "@/typeScript/recruiter_interface/recruiter.interface";

//  Define interfaces for type safety
interface RecruiterState {
  recruiterDashboardData: any;
  recruiterProfileData: any;
  isLoading: boolean;
  error: string | null;
  allJobsList: any[];
  companyDetails: any;
  manageRecruitersData: any[];
  applicationsList: any[];
  totalApplications: number;
  applicationDetails: any;
  jobDetails: any;
  totalPages: number;
}

const initialState:RecruiterState = {
  recruiterDashboardData: {},
  recruiterProfileData: {},
  isLoading: false,
  error: null,
    allJobsList: [],
    totalPages: 0,
    companyDetails: {},
    manageRecruitersData:[],
    applicationsList: [],
    totalApplications: 0,
    applicationDetails : {},
    jobDetails:{},

  };

// 1. DASHBOARD
export const recruiterDashboard = createAsyncThunk<RecruiterDashboardResponse>(
  "recruiterDashboard",
  async (_, { rejectWithValue }) => {
    try {
      let res = await AxiosInstance.get(endPoints.cms.recruiter.dashboard);
      return res?.data;
    } catch (error: any) {
      return rejectWithValue({ status: false, message: error.message });
    }
  }
);

// 2. PROFILE
export const recruiterProfile = createAsyncThunk<RecruiterProfileResponse>(
  "recruiterProfile",
  async (_, { rejectWithValue }) => {
    try {
      let res = await AxiosInstance.get(endPoints.cms.recruiter.profile);
      return res?.data;
    } catch (error: any) {
      return rejectWithValue({ status: false, message: error.message });
    }
  }
);

///// get all jobs////
export const getAllJobs = createAsyncThunk<AllJobsResponse, GetAllJobsParams | undefined >(
  "getAllJobs",
  async (params, { rejectWithValue }) => {
    try {
       const page = params?.page || 1;
      const limit = params?.limit || 10;
      const search = params?.search || "";
      const status = params?.status || "";

        const queryString = `?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}&status=${status}`;

      let res = await AxiosInstance.get<AllJobsResponse>(`${endPoints.cms.recruiter.allJobs}${queryString}`);
      return res?.data;
    } catch (error: any) {
      return rejectWithValue({ status: false, message: error.message });
    }
  }
);

//// manage recruiters//
export const manageRecruiters = createAsyncThunk<ManageRecruitersResponse>(
  "manageRecruiters",
  async (_, { rejectWithValue }) => {
    try {
      let res = await AxiosInstance.get(endPoints.cms.recruiter.recruiterManage);
      return res?.data;
    } catch (error: any) {
      return rejectWithValue({ status: false, message: error.message });
    }
  }
);


///// get company details////
export const getCompanyDetails = createAsyncThunk<CompanyDetailsResponse>(
  "getCompanyDetails",
  async (_, { rejectWithValue }) => {
    try {
      let res = await AxiosInstance.get(endPoints.cms.recruiter.companyDetails);
      return res?.data;
    } catch (error: any) {
      return rejectWithValue({ status: false, message: error.message });
    }
  }
);

///// update company details////
export const updateCompanyDetails = createAsyncThunk<
  UpdateCompanyResponse,
  { id: string; formdata: FormData | UpdateCompanyPayload }
>(
  "updateCompanyDetails",
  async ({ id, formdata }: { id: string; formdata: any }, { rejectWithValue }) => {
    try {
      let res = await AxiosInstance.put(
        `${endPoints.cms.recruiter.updateCompany}${id}/update`, 
        formdata
      );
      return res?.data;
    } catch (error: any) {
      return rejectWithValue({ status: false, message: error.message });
    }
  }
);


//// job status Update
export const jobStatusUpdate = createAsyncThunk<
  JobStatusUpdateResponse,
  JobStatusUpdatePayload
>(
  "jobStatusUpdate",
  async ({ id, status }: { id: string; status: string }, { rejectWithValue }) => {
    try {
      let res = await AxiosInstance.put(
        `${endPoints.cms.recruiter.statusUpdate}${id}/status-update`,
        { status } 
      );
      return res?.data;
    } catch (error: any) {
      return rejectWithValue({ status: false, message: error.message });
    }
  }
);


///// get Application details////
export const getApplicationDetails = createAsyncThunk<ApplicationDetailsResponse, ApplicationDetailsParams>(
  "getApplicationDetails",
  async ({ id }: ApplicationDetailsParams, { rejectWithValue }) => {
    try {
      let res = await AxiosInstance.get(`${endPoints.cms.recruiter.applicationDetails}${id}/details`);
      return res?.data;
    } catch (error: any) {
      return rejectWithValue({ status: false, message: error.message });
    }
  }
);

///// get Job details////
export const getJobDetails = createAsyncThunk<JobDetailsResponse, JobDetailsParams>(
  "getJobDetails",
  async (  {id}, { rejectWithValue }) => {
    try {
      let res = await AxiosInstance.get(`${endPoints.cms.recruiter.jobDetails}${id}/detail-information`);
      return res?.data;
    } catch (error: any) {
      return rejectWithValue({ status: false, message: error.message });
    }
  }
);




///// delete job ////
export const deleteJob = createAsyncThunk<DeleteJobResponse, string>(
  "deleteJob",
  async (id: string, { rejectWithValue }) => {
    try {
      let res = await AxiosInstance.put(`${endPoints.cms.recruiter.deleteJob}${id}/delete`);
      return res?.data;
    } catch (error: any) {
      return rejectWithValue({ status: false, message: error.message });
    }
  }
);


//// --- get all applications ----////

export const getJobApplications = createAsyncThunk<
  ApplicationsListResponse,
  JobApplicationsParams
>(
  "getJobApplications",
  async ({ 
    jobId, 
    page = 1, 
    limit = 5, 
    search = "", 
    status = "" 
  }: { 
    jobId: string; 
    page?: number; 
    limit?: number; 
    search?: string; 
    status?: string 
  }, { rejectWithValue }) => {
    try {
      const res = await AxiosInstance.get(
        `${endPoints.cms.recruiter.AllApplications}/${jobId}`,
        {
          params: {
            page,
            limit,
            search,
            status
          }
        }
      );
      return res?.data;
    } catch (error: any) {
      return rejectWithValue({ 
        status: false, 
        message: error?.response?.data?.message || error.message 
      });
    }
  }
);




//// add new job ///
export const addJob = createAsyncThunk<CreateJobResponse, CreateJobPayload>(
  "addJob",
  async (formData, { rejectWithValue }) => {
    try {
      let res = await AxiosInstance.post(
        endPoints.cms.recruiter.addJob, formData);
      return res?.data;
    } catch (error: any) {
      return rejectWithValue({ status: false, message: error.message });
    }
  }
);

///// update job////
export const updateJob = createAsyncThunk<
  UpdateJobResponse,
  { id: string; data: UpdateJobPayload }
>(
  "updateJob",
  async ({ id, data }: { id: string; data: UpdateJobPayload }, { rejectWithValue }) => {
    try {
      let res = await AxiosInstance.put(
        `${endPoints.cms.recruiter.updateJob}${id}/update`, 
        data
      );
      return res?.data  as UpdateJobResponse;
    } catch (error: any) {
      return rejectWithValue({ status: false, message: error.message });
    }
  }
);


export const recruiterSlice = createSlice({
  name: "Recruiter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- Dashboard ---
      .addCase(recruiterDashboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(recruiterDashboard.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload?.status) {
          // toast.success(payload.message); // ✅ Remove toast for silent fetch
          state.recruiterDashboardData = payload.data;
        }
      })
      .addCase(recruiterDashboard.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch dashboard";
        toast.error(state.error);
      })

      // --- Profile ---
      .addCase(recruiterProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(recruiterProfile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload?.status) {
          // toast.success(payload.message); //  Remove toast for silent fetch
          state.recruiterProfileData = payload.data;
        }
      })
      .addCase(recruiterProfile.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch profile";
        toast.error(state.error);
      })


      // --- Get All Jobs ---
.addCase(getAllJobs.pending, (state) => {
  state.isLoading = true;
})
.addCase(getAllJobs.fulfilled, (state, { payload }) => {
  state.isLoading = false;
  if (payload?.status) {
    state.allJobsList = payload.data;
     state.totalPages = payload.totalPages;
  }
})
.addCase(getAllJobs.rejected, (state, action: any) => {
  state.isLoading = false;
  toast.error(action.payload?.message || "Failed to fetch jobs");
})


.addCase(getCompanyDetails.pending, (state) => {
  state.isLoading = true;
})
.addCase(getCompanyDetails.fulfilled, (state, { payload }) => {
  state.isLoading = false;
  if (payload?.status) {
    state.companyDetails = payload.data;
  }
})
.addCase(getCompanyDetails.rejected, (state, action: any) => {
  state.isLoading = false;
  toast.error(action.payload?.message || "Failed to fetch jobs");
})



///  update company

.addCase(updateCompanyDetails.pending, (state) => {
  // state.isLoading = true;
})
.addCase(updateCompanyDetails.fulfilled, (state, { payload }) => {
  // state.isLoading = false;
  if (payload?.status) {
    state.companyDetails = payload.data;
  }
})
.addCase(updateCompanyDetails.rejected, (state, action: any) => {
  // state.isLoading = false;
  toast.error(action.payload?.message || "Failed to fetch jobs");
})


.addCase(manageRecruiters.pending, (state) => {
  // state.isLoading = true;
})
.addCase(manageRecruiters.fulfilled, (state, { payload }) => {
  // state.isLoading = false;
  if (payload?.status) {
    state.manageRecruitersData = payload.data;
  }
})
.addCase(manageRecruiters.rejected, (state, action: any) => {
  // state.isLoading = false;
  toast.error(action.payload?.message || "Failed to fetch jobs");
})


////   active job


.addCase(jobStatusUpdate.pending, (state) => {
  // state.isLoading = true;
})
.addCase(jobStatusUpdate.fulfilled, (state, { payload }) => {
  // state.isLoading = false;
  // if (payload?.status) {
  //   state.companyDetails = payload.data;
  // }
})
.addCase(jobStatusUpdate.rejected, (state, action: any) => {
  // state.isLoading = false;
  toast.error(action.payload?.message || "Failed to fetch jobs");
})


////   add job


.addCase(addJob.pending, (state) => {
  // state.isLoading = true;
})
.addCase(addJob.fulfilled, (state, { payload }) => {
  // state.isLoading = false;
  if (payload?.status) {
   toast.success(payload?.message)
  }
})
.addCase(addJob.rejected, (state, action: any) => {
  // state.isLoading = false;
  toast.error(action.payload?.message || "Failed to fetch jobs");
})


///// get all applications ///


.addCase(getJobApplications.pending, (state) => {
  // state.isLoading = true;
})
.addCase(getJobApplications.fulfilled, (state, { payload }) => {
  // state.isLoading = false;
  if (payload?.status) {
  //  toast.success(payload?.message)
  state.applicationsList = payload?.data || [];
    state.totalApplications = payload?.totalApplications || 0;
  }
})
.addCase(getJobApplications.rejected, (state, action: any) => {
  // state.isLoading = false;
  toast.error(action.payload?.message || "Failed to fetch jobs");
})


//// get application details----///


.addCase(getApplicationDetails.pending, (state) => {
  state.isLoading = true;
})
.addCase(getApplicationDetails.fulfilled, (state, { payload }) => {
  state.isLoading = false;
  if (payload?.status) {
    state.applicationDetails = payload?.data;
  }
})
.addCase(getApplicationDetails.rejected, (state, action: any) => {
  state.isLoading = false;
  toast.error(action.payload?.message || "Failed to fetch application details");
})


//// get application details----///


.addCase(deleteJob.pending, (state) => {
  // state.isLoading = true;
})
.addCase(deleteJob.fulfilled, (state, { payload }) => {
  // state.isLoading = false;
  // if (payload?.status) {
  //   state.applicationDetails = payload?.data;
  // }
})
.addCase(deleteJob.rejected, (state, action: any) => {
  // state.isLoading = false;
  toast.error(action.payload?.message || "Failed to fetch application details");
})


//// get job details----///


.addCase(getJobDetails.pending, (state) => {
  // state.isLoading = true;
})
.addCase(getJobDetails.fulfilled, (state, { payload }) => {
  // state.isLoading = false;
  if (payload?.status) {
    state.jobDetails = payload?.data;
  }
})
.addCase(getJobDetails.rejected, (state, action: any) => {
  // state.isLoading = false;
  toast.error(action.payload?.message || "Failed to fetch application details");
})

//// update job ///

.addCase(updateJob.pending, (state) => {
  // state.isLoading = true;
})
.addCase(updateJob.fulfilled, (state, { payload }) => {
  // state.isLoading = false;
  // if (payload?.status) {
  //   state.jobDetails = payload?.data;
  // }
})
.addCase(updateJob.rejected, (state, action: any) => {
  // state.isLoading = false;
  toast.error(action.payload?.message || "Failed to fetch application details");
})





  },
});

export const {} = recruiterSlice.actions;
export default recruiterSlice;
