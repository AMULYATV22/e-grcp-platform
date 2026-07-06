import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  profile: {
    name: "Administrator",
    email: "admin@egrcp.com",
    role: "Administrator",
  },
  preferences: {
    theme: "Light",
    language: "English",
    notifications: true,
  },
  loading: false,
  error: null,
  sessionExpired: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    login: (state, action) => {
      const profile = action.payload.profile || {
        name: action.payload.name || state.profile?.name || "Administrator",
        email: action.payload.email || state.profile?.email || "admin@egrcp.com",
        role: action.payload.role || state.profile?.role || "Administrator",
      };

      state.isAuthenticated = true;
      state.user = {
        ...(state.user || {}),
        ...action.payload,
        name: profile.name,
        email: profile.email,
        role: profile.role,
      };
      state.profile = profile;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
      state.sessionExpired = false;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.sessionExpired = false;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    setSessionExpired: (state) => {
      state.sessionExpired = true;
      state.isAuthenticated = false;
    },

    clearSessionExpired: (state) => {
      state.sessionExpired = false;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },

    updateProfile: (state, action) => {
      state.profile = {
        ...state.profile,
        ...action.payload,
      };

      state.user = {
        ...(state.user || {}),
        ...action.payload,
      };
    },

    updatePreferences: (state, action) => {
      state.preferences = {
        ...state.preferences,
        ...action.payload,
      };
    },

    updateToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {
  login,
  logout,
  setLoading,
  setError,
  clearError,
  setSessionExpired,
  clearSessionExpired,
  setUser,
  updateProfile,
  updatePreferences,
  updateToken,
} = authSlice.actions;

export default authSlice.reducer;

export const selectIsAuthenticated = (state) =>
  state.auth.isAuthenticated;

export const selectCurrentUser = (state) =>
  state.auth.user;

export const selectUserProfile = (state) =>
  state.auth.profile;

export const selectPreferences = (state) =>
  state.auth.preferences;

export const selectAuthLoading = (state) =>
  state.auth.loading;

export const selectAuthError = (state) =>
  state.auth.error;

export const selectSessionExpired = (state) =>
  state.auth.sessionExpired;

export const selectToken = (state) =>
  state.auth.token;