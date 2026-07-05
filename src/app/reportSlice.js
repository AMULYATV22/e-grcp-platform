import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getReports,
  createReport,
  updateReport,
  deleteReport,
  saveReport,
} from "../services/reportService";

export const fetchReports = createAsyncThunk(
  "report/fetchReports",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getReports();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch reports"
      );
    }
  }
);

export const createNewReport = createAsyncThunk(
  "report/create",
  async (data) => createReport(data)
);

export const updateReportData = createAsyncThunk(
  "report/update",
  async ({ id, data }) => updateReport(id, data)
);

export const deleteReportData = createAsyncThunk(
  "report/delete",
  async (id) => deleteReport(id)
);

export const saveReportAsync = createAsyncThunk(
  "report/save",
  async ({ id, name }) => saveReport(id, name)
);

const initialState = {
  reports: [],
  loading: false,
  error: null,
  selectedReport: null,
  savedReports: [],
  filters: { type: "", dateRange: "" },
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    addReport: (state, action) => {
      state.reports.unshift(action.payload);
    },
    setSelectedReport: (state, action) => {
      state.selectedReport = action.payload;
    },
    setReportFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    archiveReport: (state, action) => {
      const report = state.reports.find((r) => r.id === action.payload);
      if (report) report.archived = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.loading = false;
        if (state.reports.length === 0) {
          state.reports = action.payload;
        }
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load reports";
      })
      .addCase(createNewReport.fulfilled, (state, action) => {
        state.reports.unshift(action.payload);
      })
      .addCase(updateReportData.fulfilled, (state, action) => {
        const index = state.reports.findIndex((r) => r.id === action.payload.id);
        if (index >= 0) state.reports[index] = action.payload;
      })
      .addCase(deleteReportData.fulfilled, (state, action) => {
        state.reports = state.reports.filter((r) => r.id !== action.payload);
      })
      .addCase(saveReportAsync.fulfilled, (state, action) => {
        state.savedReports.push(action.payload);
      });
  },
});

export const {
  addReport,
  setSelectedReport,
  setReportFilters,
  archiveReport,
} = reportSlice.actions;

export default reportSlice.reducer;

export const selectAllReports = (state) => state.reports.reports;
export const selectReportLoading = (state) => state.reports.loading;
export const selectReportError = (state) => state.reports.error;
export const selectSelectedReport = (state) => state.reports.selectedReport;
export const selectSavedReports = (state) => state.reports.savedReports;
export const selectReportFilters = (state) => state.reports.filters;