import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAudits,
  createAudit,
  updateAudit,
  deleteAudit,
} from "../services/auditService";

export const fetchAudits = createAsyncThunk(
  "audit/fetchAudits",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAudits();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch audit records"
      );
    }
  }
);

export const createAuditLog = createAsyncThunk(
  "audit/create",
  async (data) => createAudit(data)
);

export const updateAuditLog = createAsyncThunk(
  "audit/update",
  async ({ id, data }) => updateAudit(id, data)
);

export const deleteAuditLog = createAsyncThunk(
  "audit/delete",
  async (id) => deleteAudit(id)
);

const initialState = {
  audits: [],
  loading: false,
  error: null,
  selectedAudit: null,
  filters: { action: "", user: "", dateRange: "" },
  sorting: { field: "timestamp", order: "desc" },
};

const auditSlice = createSlice({
  name: "audit",
  initialState,
  reducers: {
    addAudit: (state, action) => {
      state.audits.unshift(action.payload);
    },
    setSelectedAudit: (state, action) => {
      state.selectedAudit = action.payload;
    },
    setAuditFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setAuditSorting: (state, action) => {
      state.sorting = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAudits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAudits.fulfilled, (state, action) => {
        state.loading = false;
        if (state.audits.length === 0) {
          state.audits = action.payload;
        }
      })
      .addCase(fetchAudits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load audit records";
      })
      .addCase(createAuditLog.fulfilled, (state, action) => {
        state.audits.unshift(action.payload);
      })
      .addCase(updateAuditLog.fulfilled, (state, action) => {
        const index = state.audits.findIndex((a) => a.id === action.payload.id);
        if (index >= 0) state.audits[index] = action.payload;
      })
      .addCase(deleteAuditLog.fulfilled, (state, action) => {
        state.audits = state.audits.filter((a) => a.id !== action.payload);
      });
  },
});

export const {
  addAudit,
  setSelectedAudit,
  setAuditFilters,
  setAuditSorting,
} = auditSlice.actions;

export default auditSlice.reducer;

export const selectAllAudits = (state) => state.audit.audits;
export const selectAuditLoading = (state) => state.audit.loading;
export const selectAuditError = (state) => state.audit.error;
export const selectSelectedAudit = (state) => state.audit.selectedAudit;
export const selectAuditFilters = (state) => state.audit.filters;
export const selectAuditSorting = (state) => state.audit.sorting;