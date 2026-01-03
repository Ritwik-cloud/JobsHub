import { AxiosInstance } from "@/api/axios/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { Cookies } from "react-cookie";
import { endPoints } from "@/api/endPoints/endPoints";
import {
  candidateRegisterPayload,
  ILoginResponse,
  IRegisterResponse,
  loginPayload,
  recruiterRegisterPayload,
} from "@/typeScript/auth_interface/auth.interface";

interface AuthState {
  isLogin: boolean;
  user: any;
}

const initialState: AuthState = {
  isLogin: false,
  user: {},
};

const cookie = new Cookies();

// --- Async Thunks (Register & Login) ---

export const candidateRegister = createAsyncThunk<
  IRegisterResponse,
  candidateRegisterPayload,
  { rejectValue: { status: false; message: string } }
>("candidateRegister", async (formData, thunkAPI) => {
  try {
    const res = await AxiosInstance.post<IRegisterResponse>(
      endPoints.auth.candidate.register,
      formData
    );
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue({
      status: false,
      message: err?.response?.data?.message || "Registration failed",
    });
  }
});

export const recruiterRegister = createAsyncThunk<
  IRegisterResponse,
  recruiterRegisterPayload,
  { rejectValue: { status: false; message: string } }
>("recruiterRegister", async (formData, thunkAPI) => {
  try {
    const res = await AxiosInstance.post<IRegisterResponse>(
      endPoints.auth.recruiter.register,
      formData
    );
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue({
      status: false,
      message: err?.response?.data?.message || "Registration failed",
    });
  }
});

export const candidateLogin = createAsyncThunk<
  ILoginResponse,
  loginPayload,
  { rejectValue: { status: false; message: string } }
>("candidateLogin", async (formData, thunkAPI) => {
  try {
    const res = await AxiosInstance.post<ILoginResponse>(
      endPoints.auth.candidate.login,
      formData
    );
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue({
      status: false,
      message: err?.response?.data?.message || "Login failed",
    });
  }
});

export const recruiterLogin = createAsyncThunk<
  ILoginResponse,
  loginPayload,
  { rejectValue: { status: false; message: string } }
>("recruiterLogin", async (formData, thunkAPI) => {
  try {
    const res = await AxiosInstance.post<ILoginResponse>(
      endPoints.auth.recruiter.login,
      formData
    );
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue({
      status: false,
      message: err?.response?.data?.message || "Login failed",
    });
  }
});

// --- Slice ---

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    handleLoggedout: (state) => {
      // Remove all auth cookies
      cookie.remove("token", { path: "/" });
      cookie.remove("userId", { path: "/" });
      cookie.remove("userData", { path: "/" }); // Remove user data cookie
      
      state.isLogin = false;
      state.user = {};
    },
   check_token: (state) => {
      const token = cookie.get("token");
      if (token !== null && token !== undefined) {
        state.isLogin = true;
      }
    },
  },
  extraReducers: (builder) => {
    // Candidate Register
    builder
      .addCase(candidateRegister.fulfilled, (state, action: PayloadAction<IRegisterResponse>) => {
        if (action.payload.status === true) {
          toast.success(action.payload.message);
          state.isLogin = false;
        }
      })
      .addCase(candidateRegister.rejected, (state, action) => {
        toast.error(action.payload?.message || "Registration failed");
      })

      // Recruiter Register
      .addCase(recruiterRegister.fulfilled, (state, action: PayloadAction<IRegisterResponse>) => {
        if (action.payload.status === true) {
          toast.success(action.payload.message);
          state.isLogin = false;
        }
      })
      .addCase(recruiterRegister.rejected, (state, action) => {
        toast.error(action.payload?.message || "Registration failed");
      })

      // Candidate Login
      .addCase(candidateLogin.fulfilled, (state, action: PayloadAction<ILoginResponse>) => {
        if (action.payload.status === true) {
          // Set Token
          cookie.set("token", action.payload.token, {
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
          });

          // Set User ID
          cookie.set("userId", action.payload.user._id, {
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
          });

          // Set Full User Data in Cookie (Replaces LocalStorage)
          // react-cookie automatically stringifies objects
          cookie.set("userData", action.payload.user, {
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
          });

          state.isLogin = true;
          state.user = action.payload.user;
          toast.success(action.payload.message);
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(candidateLogin.rejected, (state, action) => {
        toast.error(action.payload?.message || "Login failed");
      })

      // Recruiter Login
      .addCase(recruiterLogin.fulfilled, (state, action: PayloadAction<ILoginResponse>) => {
        if (action.payload.status === true) {
          // Set Token
          cookie.set("token", action.payload.token, {
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
          });

          // Set User ID
          cookie.set("userId", action.payload.user._id, {
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
          });

          // Set Full User Data in Cookie
          cookie.set("userData", action.payload.user, {
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
          });

          state.isLogin = true;
          state.user = action.payload.user;
          toast.success(action.payload.message);
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(recruiterLogin.rejected, (state, action) => {
        toast.error(action.payload?.message || "Login failed");
      });
  },
});

export const { handleLoggedout, check_token } = authSlice.actions;
export default authSlice;
