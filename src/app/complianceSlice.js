import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCompliance,
  createComplianceRecord,
  updateComplianceRecord,
  deleteComplianceRecord,
} from "../services/complianceService";

export const fetchCompliance = createAsyncThunk(
  "compliance/fetchCompliance",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCompliance();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch compliance records"
      );
    }
  }
);

export const createComplianceItem = createAsyncThunk(
  "compliance/create",
  async (data) => createComplianceRecord(data)
);

export const updateComplianceItem = createAsyncThunk(
  "compliance/update",
  async ({ id, data }) => updateComplianceRecord(id, data)
);

export const deleteComplianceItem = createAsyncThunk(
  "compliance/delete",
  async (id) => deleteComplianceRecord(id)
);

const initialState = {
  compliance: [],
  loading: false,
  error: null,
  selectedItem: null,
  filters: { status: "", category: "", priority: "" },
  sorting: { field: "createdAt", order: "desc" },
};

const complianceSlice = createSlice({
  name: "compliance",
  initialState,
  reducers: {
    addCompliance: (state, action) => {
      state.compliance.unshift(action.payload);
    },
    markExpired: (state, action) => {
      const item = state.compliance.find((c) => c.id === action.payload);
      if (item) item.status = "Expired";
    },
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    setComplianceFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setComplianceSorting: (state, action) => {
      state.sorting = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompliance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompliance.fulfilled, (state, action) => {
        state.loading = false;
        if (state.compliance.length === 0) {
          state.compliance = action.payload;
        }
      })
      .addCase(fetchCompliance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load compliance records";
      })
      .addCase(createComplianceItem.fulfilled, (state, action) => {
        state.compliance.unshift(action.payload);
      })
      .addCase(updateComplianceItem.fulfilled, (state, action) => {
        const index = state.compliance.findIndex((c) => c.id === action.payload.id);
        if (index >= 0) state.compliance[index] = action.payload;
      })
      .addCase(deleteComplianceItem.fulfilled, (state, action) => {
        state.compliance = state.compliance.filter((c) => c.id !== action.payload);
      });
  },
});

export const {
  addCompliance,
  markExpired,
  setSelectedItem,
  setComplianceFilters,
  setComplianceSorting,
} = complianceSlice.actions;

export default complianceSlice.reducer;

export const selectAllCompliance = (state) => state.compliance.compliance;
export const selectComplianceLoading = (state) => state.compliance.loading;
export const selectComplianceError = (state) => state.compliance.error;
export const selectSelectedCompliance = (state) => state.compliance.selectedItem;
export const selectComplianceFilters = (state) => state.compliance.filters;
export const selectComplianceSorting = (state) => state.compliance.sorting;
export const selectExpiredCompliance = (state) =>
  state.compliance.compliance.filter((c) => c.status === "Expired");
export const selectViolations = (state) =>
  state.compliance.compliance.filter((c) => c.type === "Violation");