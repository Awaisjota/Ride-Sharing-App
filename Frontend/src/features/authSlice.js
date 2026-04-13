import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  forgotServices,
  loginServices,
  registerServices,
  resetServices,
} from "../services/authServices";

// REGISTER
export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await registerServices(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Register Failed" },
      );
    }
  },
);

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await loginServices(credentials);

      const token = res.data?.token;

      if (token) {
        localStorage.setItem("token", token);
      }

      localStorage.setItem("refreshToken", res.data?.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.data?.user));
      localStorage.setItem("role", res.data?.user?.role);

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Login Failed!" },
      );
    }
  },
);

// FORGOT PASSWORD (SEND OTP)
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await forgotServices({ email });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "OTP send failed!" },
      );
    }
  },
);

// RESET PASSWORD
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await resetServices(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Reset Failed!" },
      );
    }
  },
);

const getUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user && user !== "undefined" ? JSON.parse(user) : null;
  } catch (e) {
    return null;
  }
};


// INITIAL STATE
const initialState = {
  user: getUser(),
  users: [],
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  status: "idle",
  error: null,
  message: null,
};

// SLICE
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.status = "idle";
      state.error = null;
      state.message = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
    },
    clearError: (state) => {
      state.error = null;
    },
    clearFieldError: (state, action) => {
      if (state.error?.errors) {
        state.error.errors = state.error.errors.filter(
          (e) => e.path !== action.payload,
        );
      }   
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // LOGIN
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;

        state.token = action.payload.token;
        state.user = action.payload.user;
        state.role = action.payload.user.role;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // FORGOT PASSWORD
      .addCase(forgotPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // RESET PASSWORD
      .addCase(resetPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// EXPORTS
export const { logout, clearError, clearMessage, clearFieldError} = authSlice.actions;
export default authSlice.reducer;

// SELECTORS
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectAuthRole = (state) => state.auth.role;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthMessage = (state) => state.auth.message;
export const selectAllUsers = (state) => state.auth.users;
