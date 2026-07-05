import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProcurementRequests,
  createProcurementRequest,
  updateProcurementRequest,
  deleteProcurementRequest,
} from "../services/procurementService";

export const fetchRequests = createAsyncThunk(
  "procurement/fetchRequests",
  async () => {
    return await getProcurementRequests();
  }
);

export const createRequest = createAsyncThunk(
  "procurement/createRequest",
  async (requestData) => {
    return await createProcurementRequest(requestData);
  }
);

export const updateRequest = createAsyncThunk(
  "procurement/updateRequest",
  async ({ id, data }) => {
    return await updateProcurementRequest(id, data);
  }
);

export const deleteRequest = createAsyncThunk(
  "procurement/deleteRequest",
  async (id) => {
    return await deleteProcurementRequest(id);
  }
);

const initialState = {
  requests: [],
  loading: false,
  error: null,
  selectedRequest: null,
  filters: {
    status: "",
    department: "",
    dateRange: "30days",
  },
  sorting: {
    field: "dateCreated",
    order: "desc",
  },
};

const procurementSlice = createSlice({
  name: "procurement",

  initialState,

  reducers: {
    addRequest: (state, action) => {
      state.requests.unshift(action.payload);
    },

    approveRequest: (state, action) => {
      const request = state.requests.find(
        (item) => item.id === action.payload
      );

      if (request) {
        request.status = "Approved";
      }
    },

    rejectRequest: (state, action) => {
      const request = state.requests.find(
        (item) => item.id === action.payload
      );

      if (request) {
        request.status = "Rejected";
      }
    },

    cancelRequest: (state, action) => {
      const request = state.requests.find(
        (item) => item.id === action.payload
      );

      if (request) {
        request.status = "Cancelled";
      }
    },

    setSelectedRequest: (state, action) => {
      state.selectedRequest = action.payload;
    },

    addCommentToRequest: (state, action) => {
      const { requestId, comment } = action.payload;
      const normalizedComment = {
        user: comment.user || "Current User",
        text: comment.text || comment,
        date: comment.date || new Date().toISOString().split("T")[0],
      };

      const request = state.requests.find((item) => item.id === requestId);

      if (request) {
        request.comments = [...(request.comments || []), normalizedComment];
      }

      if (state.selectedRequest?.id === requestId) {
        state.selectedRequest = {
          ...state.selectedRequest,
          comments: [
            ...(state.selectedRequest.comments || []),
            normalizedComment,
          ],
        };
      }
    },

    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    setSorting: (state, action) => {
      state.sorting = action.payload;
    },

    clearFilters: (state) => {
      state.filters = {
        status: "",
        department: "",
        dateRange: "30days",
      };
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch Requests
      .addCase(fetchRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.loading = false;
        if (state.requests.length === 0) {
          state.requests = action.payload;
        }
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load requests";
      })
      // Create Request
      .addCase(createRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests.unshift(action.payload);
      })
      .addCase(createRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create request";
      })
      // Update Request
      .addCase(updateRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRequest.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.requests.findIndex(
          (r) => r.id === action.payload.id
        );
        if (index >= 0) {
          state.requests[index] = action.payload;
        }
      })
      .addCase(updateRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update request";
      })
      // Delete Request
      .addCase(deleteRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = state.requests.filter(
          (r) => r.id !== action.payload
        );
      })
      .addCase(deleteRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete request";
      });
  },
});

export const {
  addRequest,
  approveRequest,
  rejectRequest,
  cancelRequest,
  setSelectedRequest,
  addCommentToRequest,
  setFilters,
  setSorting,
  clearFilters,
} = procurementSlice.actions;

export default procurementSlice.reducer;

/* -------------------------
   Selectors
------------------------- */

export const selectAllRequests = (state) =>
  state.procurement.requests;

export const selectProcurementLoading = (state) =>
  state.procurement.loading;

export const selectProcurementError = (state) =>
  state.procurement.error;

export const selectSelectedRequest = (state) =>
  state.procurement.selectedRequest;

export const selectProcurementFilters = (state) =>
  state.procurement.filters;

export const selectProcurementSorting = (state) =>
  state.procurement.sorting;

export const selectRequestById = (id) => (state) =>
  state.procurement.requests.find((r) => r.id === id);