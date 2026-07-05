import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getVendors,
  createVendor,
  updateVendor,
  deleteVendor,
} from "../services/vendorService";

export const fetchVendors = createAsyncThunk(
  "vendor/fetchVendors",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getVendors();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch vendors"
      );
    }
  }
);

export const addNewVendor = createAsyncThunk(
  "vendor/addNew",
  async (vendorData) => {
    return await createVendor(vendorData);
  }
);

export const updateVendorData = createAsyncThunk(
  "vendor/update",
  async ({ id, data }) => {
    return await updateVendor(id, data);
  }
);

export const deleteVendorData = createAsyncThunk(
  "vendor/delete",
  async (id) => {
    return await deleteVendor(id);
  }
);

const initialState = {
  vendors: [],
  loading: false,
  error: null,
  selectedVendor: null,
  filters: {
    category: "",
    risk: "",
    status: "",
  },
  sorting: {
    field: "name",
    order: "asc",
  },
};

const vendorSlice = createSlice({
  name: "vendor",

  initialState,

  reducers: {
    addVendor: (state, action) => {
      state.vendors.unshift(action.payload);
    },

    toggleVendorStatus: (state, action) => {
      const vendor = state.vendors.find(
        (v) => v.id === action.payload
      );
      if (vendor) {
        vendor.status =
          vendor.status === "Active" ? "Inactive" : "Active";
      }
    },

    setSelectedVendor: (state, action) => {
      state.selectedVendor = action.payload;
    },

    setVendorFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    setVendorSorting: (state, action) => {
      state.sorting = action.payload;
    },

    clearVendorFilters: (state) => {
      state.filters = {
        category: "",
        risk: "",
        status: "",
      };
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch Vendors
      .addCase(fetchVendors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.loading = false;
        if (state.vendors.length === 0) {
          state.vendors = action.payload;
        }
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to load vendor data";
      })
      // Add Vendor
      .addCase(addNewVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors.unshift(action.payload);
      })
      .addCase(addNewVendor.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to add vendor";
      })
      // Update Vendor
      .addCase(updateVendorData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVendorData.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.vendors.findIndex(
          (v) => v.id === action.payload.id
        );
        if (index >= 0) {
          state.vendors[index] = action.payload;
        }
      })
      .addCase(updateVendorData.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to update vendor";
      })
      // Delete Vendor
      .addCase(deleteVendorData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVendorData.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors = state.vendors.filter(
          (v) => v.id !== action.payload
        );
      })
      .addCase(deleteVendorData.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to delete vendor";
      });
  },
});

export const {
  addVendor,
  toggleVendorStatus,
  setSelectedVendor,
  setVendorFilters,
  setVendorSorting,
  clearVendorFilters,
} = vendorSlice.actions;

export default vendorSlice.reducer;

/* -------------------------
   Selectors
------------------------- */

export const selectAllVendors = (state) =>
  state.vendors.vendors;

export const selectVendorLoading = (state) =>
  state.vendors.loading;

export const selectVendorError = (state) =>
  state.vendors.error;

export const selectSelectedVendor = (state) =>
  state.vendors.selectedVendor;

export const selectVendorFilters = (state) =>
  state.vendors.filters;

export const selectVendorSorting = (state) =>
  state.vendors.sorting;

export const selectVendorById = (id) => (state) =>
  state.vendors.vendors.find((v) => v.id === id);

export const selectVendorsByStatus = (status) => (state) =>
  state.vendors.vendors.filter((v) => v.status === status);

export const selectVendorsByRisk = (risk) => (state) =>
  state.vendors.vendors.filter((v) => v.risk === risk);