import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRisks,
  createRisk,
  updateRisk,
  deleteRisk,
  mitigateRisk,
} from "../services/riskService";

export const fetchRisks = createAsyncThunk(
  "risk/fetchRisks",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getRisks();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch risks"
      );
    }
  }
);

export const createNewRisk = createAsyncThunk(
  "risk/create",
  async (riskData) => {
    return await createRisk(riskData);
  }
);

export const updateRiskData = createAsyncThunk(
  "risk/update",
  async ({ id, data }) => {
    return await updateRisk(id, data);
  }
);

export const deleteRiskData = createAsyncThunk(
  "risk/delete",
  async (id) => {
    return await deleteRisk(id);
  }
);

export const mitigateRiskData = createAsyncThunk(
  "risk/mitigate",
  async ({ id, mitigationPlan }) => {
    return await mitigateRisk(id, mitigationPlan);
  }
);

const initialState = {
  risks: [],
  loading: false,
  error: null,
  selectedRisk: null,
  filters: {
    level: "",
    status: "",
    category: "",
  },
  sorting: {
    field: "createdAt",
    order: "desc",
  },
};

const riskSlice = createSlice({
  name: "risk",
  initialState,
  reducers: {
    addRisk: (state, action) => {
      state.risks.unshift(action.payload);
    },
    closeRisk: (state, action) => {
      const risk = state.risks.find((r) => r.id === action.payload);
      if (risk) {
        risk.status = "Closed";
      }
    },
    setSelectedRisk: (state, action) => {
      state.selectedRisk = action.payload;
    },
    setRiskFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setRiskSorting: (state, action) => {
      state.sorting = action.payload;
    },
    clearRiskFilters: (state) => {
      state.filters = { level: "", status: "", category: "" };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRisks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRisks.fulfilled, (state, action) => {
        state.loading = false;
        if (state.risks.length === 0) {
          state.risks = action.payload;
        }
      })
      .addCase(fetchRisks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch risks";
      })
      .addCase(createNewRisk.fulfilled, (state, action) => {
        state.risks.unshift(action.payload);
      })
      .addCase(updateRiskData.fulfilled, (state, action) => {
        const index = state.risks.findIndex((r) => r.id === action.payload.id);
        if (index >= 0) {
          state.risks[index] = action.payload;
        }
      })
      .addCase(deleteRiskData.fulfilled, (state, action) => {
        state.risks = state.risks.filter((r) => r.id !== action.payload);
      })
      .addCase(mitigateRiskData.fulfilled, (state, action) => {
        const index = state.risks.findIndex((r) => r.id === action.payload.id);
        if (index >= 0) {
          state.risks[index] = action.payload;
        }
      });
  },
});

export const {
  addRisk,
  closeRisk,
  setSelectedRisk,
  setRiskFilters,
  setRiskSorting,
  clearRiskFilters,
} = riskSlice.actions;

export default riskSlice.reducer;

/* -------------------------
   Selectors
------------------------- */

export const selectAllRisks = (state) => state.risk.risks;
export const selectRiskLoading = (state) => state.risk.loading;
export const selectRiskError = (state) => state.risk.error;
export const selectSelectedRisk = (state) => state.risk.selectedRisk;
export const selectRiskFilters = (state) => state.risk.filters;
export const selectRiskSorting = (state) => state.risk.sorting;
export const selectRiskById = (id) => (state) =>
  state.risk.risks.find((r) => r.id === id);
export const selectHighRisks = (state) =>
  state.risk.risks.filter((r) => r.level === "High");
export const selectActiveRisks = (state) =>
  state.risk.risks.filter((r) => r.status === "Open");