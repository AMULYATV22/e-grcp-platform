import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import approvalData from "../mocks/approvalData";

export const fetchApprovals = createAsyncThunk(
  "approval/fetchApprovals",
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(approvalData);
      }, 1000);
    });
  }
);

const initialState = {
  approvals: [],
  loading: false,
  error: null,
  selectedApproval: null,
  filters: { queue: "", priority: "" },
  sorting: { field: "createdAt", order: "desc" },
};

const approvalSlice = createSlice({
  name: "approval",
  initialState,
  reducers: {
    addApproval: (state, action) => {
      state.approvals.unshift(action.payload);
    },

    approveRequest: (state, action) => {
      const request = state.approvals.find(
        (item) => item.id === action.payload
      );
      if (request) {
        request.status = "Approved";
      }
    },

    rejectRequest: (state, action) => {
      const request = state.approvals.find(
        (item) => item.id === action.payload
      );
      if (request) {
        request.status = "Rejected";
      }
    },

    sendBackRequest: (state, action) => {
      const request = state.approvals.find(
        (item) => item.id === action.payload
      );
      if (request) {
        request.status = "Pending";
      }
    },

    delegateRequest: (state, action) => {
      const request = state.approvals.find(
        (item) => item.id === action.payload
      );
      if (request) {
        request.status = "Escalated";
      }
    },

    setSelectedApproval: (state, action) => {
      state.selectedApproval = action.payload;
    },

    setApprovalFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    setApprovalSorting: (state, action) => {
      state.sorting = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchApprovals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApprovals.fulfilled, (state, action) => {
        state.loading = false;
        if (state.approvals.length === 0) {
          state.approvals = action.payload;
        }
      })
      .addCase(fetchApprovals.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to load approval requests";
      });
  },
});

export const {
  addApproval,
  approveRequest,
  rejectRequest,
  sendBackRequest,
  delegateRequest,
  setSelectedApproval,
  setApprovalFilters,
  setApprovalSorting,
} = approvalSlice.actions;

export default approvalSlice.reducer;

export const selectAllApprovals = (state) => state.approval.approvals;
export const selectApprovalLoading = (state) => state.approval.loading;
export const selectApprovalError = (state) => state.approval.error;
export const selectSelectedApproval = (state) => state.approval.selectedApproval;
export const selectApprovalFilters = (state) => state.approval.filters;
export const selectApprovalSorting = (state) => state.approval.sorting;
export const selectPendingApprovals = (state) =>
  state.approval.approvals.filter((a) => a.status === "Pending");
export const selectApprovedRequests = (state) =>
  state.approval.approvals.filter((a) => a.status === "Approved");
export const selectRejectedRequests = (state) =>
  state.approval.approvals.filter((a) => a.status === "Rejected");
export const selectEscalatedRequests = (state) =>
  state.approval.approvals.filter((a) => a.status === "Escalated");