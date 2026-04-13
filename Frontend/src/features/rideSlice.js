import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  cancelRideService,
  createRideService,
  deleteRideService,
  getJoinedRidesService,
  getMyRidesService,
  getSingleRideService,
  getRidesService,
  joinRideService,
  leaveRideService,
  updateRideService,
} from "../services/rideServices";

/* =========================
   THUNKS
========================= */

// CREATE
export const createRide = createAsyncThunk(
  "rides/createRide",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createRideService(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// GET ALL
export const getRides = createAsyncThunk(
  "rides/getRides",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getRidesService();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// GET SINGLE
export const getSingleRide = createAsyncThunk(
  "rides/getSingleRide",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getSingleRideService(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// UPDATE
export const updateRide = createAsyncThunk(
  "rides/updateRide",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateRideService(id, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// DELETE
export const deleteRide = createAsyncThunk(
  "rides/deleteRide",
  async (id, { rejectWithValue }) => {
    try {
      await deleteRideService(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// JOIN
export const joinRide = createAsyncThunk(
  "rides/joinRide",
  async (id, { rejectWithValue }) => {
    try {
      const res = await joinRideService(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// LEAVE
export const leaveRide = createAsyncThunk(
  "rides/leaveRide",
  async (id, { rejectWithValue }) => {
    try {
      const res = await leaveRideService(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// CANCEL
export const cancelRide = createAsyncThunk(
  "rides/cancelRide",
  async (id, { rejectWithValue }) => {
    try {
      const res = await cancelRideService(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// MY RIDES
export const getMyRides = createAsyncThunk(
  "rides/getMyRides",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMyRidesService();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// JOINED RIDES
export const getJoinedRides = createAsyncThunk(
  "rides/getJoinedRides",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getJoinedRidesService();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

/* =========================
   SLICE
========================= */

const rideSlice = createSlice({
  name: "rides",
  initialState: {
    rides: [],
    singleRide: null,
    myRides: [],
    joinedRides: [],

    status: {
      getRides: "idle",
      createRide: "idle",
      getSingleRide: "idle",
      getMyRides: "idle",
      getJoinedRides: "idle",
      updateRide: "idle",
      deleteRide: "idle",
      joinRide: "idle",
      leaveRide: "idle",
      cancelRide: "idle",
    },

    error: null,
    message: null,
  },

  reducers: {
    clearRideError: (state) => {
      state.error = null;
    },
    clearRideMessage: (state) => {
      state.message = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ================= GET ALL ================= */
      .addCase(getRides.pending, (state) => {
        state.status.getRides = "loading";
      })
      .addCase(getRides.fulfilled, (state, action) => {
        state.status.getRides = "succeeded";
        state.rides = action.payload;
      })
      .addCase(getRides.rejected, (state, action) => {
        state.status.getRides = "failed";
        state.error = action.payload;
      })

      /* ================= SINGLE ================= */
      .addCase(getSingleRide.fulfilled, (state, action) => {
        state.singleRide = action.payload;
      })

      /* ================= CREATE ================= */
      .addCase(createRide.pending, (state) => {
        state.status.createRide = "loading";
      })
      .addCase(createRide.fulfilled, (state, action) => {
        state.status.createRide = "succeeded";
        state.rides.unshift(action.payload);
        state.message = "Ride created successfully";
      })
      .addCase(createRide.rejected, (state, action) => {
        state.status.createRide = "failed";
        state.error = action.payload;
      })

      /* ================= DELETE ================= */
      .addCase(deleteRide.fulfilled, (state, action) => {
        state.rides = state.rides.filter((r) => r._id !== action.payload);
      })

      /* ================= JOIN ================= */
      .addCase(joinRide.fulfilled, (state) => {
        state.message = "Joined ride!";
      })

      /* ================= LEAVE ================= */
      .addCase(leaveRide.fulfilled, (state) => {
        state.message = "Left ride!";
      })

      /* ================= CANCEL ================= */
      .addCase(cancelRide.fulfilled, (state) => {
        state.message = "Ride cancelled!";
      })

      /* ================= MY RIDES ================= */
      .addCase(getMyRides.pending, (state) => {
        state.status.getMyRides = "loading";
      })
      .addCase(getMyRides.fulfilled, (state, action) => {
        state.status.getMyRides = "succeeded";
        state.myRides = action.payload;
      })
      .addCase(getMyRides.rejected, (state, action) => {
        state.status.getMyRides = "failed";
        state.error = action.payload;
      })

      /* ================= JOINED RIDES ================= */
      .addCase(getJoinedRides.pending, (state) => {
        state.status.getJoinedRides = "loading";
      })
      .addCase(getJoinedRides.fulfilled, (state, action) => {
        state.status.getJoinedRides = "succeeded";
        state.joinedRides = action.payload;
      })
      .addCase(getJoinedRides.rejected, (state, action) => {
        state.status.getJoinedRides = "failed";
        state.error = action.payload;
      });
  },
});

/* =========================
   EXPORTS
========================= */

export const { clearRideError, clearRideMessage } = rideSlice.actions;

export default rideSlice.reducer;

/* =========================
   SELECTORS
========================= */

export const selectRides = (state) => state.rides.rides;
export const selectSingleRide = (state) => state.rides.singleRide;
export const selectMyRides = (state) => state.rides.myRides;
export const selectJoinedRides = (state) => state.rides.joinedRides;
export const selectRideStatus = (state) => state.rides.status;
export const selectRideError = (state) => state.rides.error;
export const selectRideMessage = (state) => state.rides.message;