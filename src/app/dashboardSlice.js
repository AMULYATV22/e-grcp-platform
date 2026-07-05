import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Async thunk to fetch dashboard KPIs
 * In a real app, this would call an API endpoint
 */
export const fetchDashboardKPIs = createAsyncThunk(
  "dashboard/fetchKPIs",
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            title: "Total Requests",
            value: 120,
            icon: "assignment",
            color: "#1976d2",
          },
          {
            title: "Pending Requests",
            value: 18,
            icon: "schedule",
            color: "#ff6f00",
          },
          {
            title: "Approved Requests",
            value: 96,
            icon: "check_circle",
            color: "#2e7d32",
          },
          {
            title: "Rejected Requests",
            value: 6,
            icon: "cancel",
            color: "#d32f2f",
          },
          {
            title: "Total Vendors",
            value: 42,
            icon: "business",
            color: "#7b1fa2",
          },
          {
            title: "Risks",
            value: 7,
            icon: "warning",
            color: "#f57f17",
          },
          {
            title: "Compliance Issues",
            value: 3,
            icon: "rule",
            color: "#c62828",
          },
        ]);
      }, 1000);
    });
  }
);

const initialState = {
  kpis: [],
  loading: false,
  error: null,
  selectedMetric: null,
  filters: {
    dateRange: "30days",
    department: "all",
    status: "all",
  },
  lastUpdated: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    /**
     * Set selected metric for detailed view
     */
    setSelectedMetric: (state, action) => {
      state.selectedMetric = action.payload;
    },

    /**
     * Update dashboard filters
     */
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    /**
     * Reset filters to default
     */
    resetFilters: (state) => {
      state.filters = {
        dateRange: "30days",
        department: "all",
        status: "all",
      };
    },

    /**
     * Update a specific KPI value
     */
    updateKPI: (state, action) => {
      const { title, value } = action.payload;
      const kpiIndex = state.kpis.findIndex(
        (kpi) => kpi.title === title
      );
      if (kpiIndex >= 0) {
        state.kpis[kpiIndex].value = value;
      }
    },

    /**
     * Clear dashboard data
     */
    clearDashboard: (state) => {
      state.kpis = [];
      state.selectedMetric = null;
      state.lastUpdated = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchDashboardKPIs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchDashboardKPIs.fulfilled, (state, action) => {
        state.loading = false;
        state.kpis = action.payload;
        state.lastUpdated = new Date().toISOString();
      })

      .addCase(fetchDashboardKPIs.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Failed to fetch dashboard KPIs";
      });
  },
});

export const {
  setSelectedMetric,
  setFilters,
  resetFilters,
  updateKPI,
  clearDashboard,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;

/* -------------------------
   Selectors
------------------------- */

/**
 * Get all KPIs
 */
export const selectKPIs = (state) => state.dashboard.kpis;

/**
 * Get dashboard loading state
 */
export const selectDashboardLoading = (state) =>
  state.dashboard.loading;

/**
 * Get dashboard error
 */
export const selectDashboardError = (state) =>
  state.dashboard.error;

/**
 * Get selected metric
 */
export const selectSelectedMetric = (state) =>
  state.dashboard.selectedMetric;

/**
 * Get dashboard filters
 */
export const selectDashboardFilters = (state) =>
  state.dashboard.filters;

/**
 * Get a specific KPI by title
 */
export const selectKPIByTitle = (title) => (state) => {
  return state.dashboard.kpis.find(
    (kpi) => kpi.title === title
  );
};

/**
 * Get last updated timestamp
 */
export const selectLastUpdated = (state) =>
  state.dashboard.lastUpdated;