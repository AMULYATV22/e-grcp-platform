import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
  sidebarCollapsed: false,
};

const uiSlice = createSlice({
  name: "ui",

  initialState,

  reducers: {
    toggleTheme(state) {
      state.darkMode = !state.darkMode;
    },

    setThemeMode(state, action) {
      state.darkMode = Boolean(action.payload);
    },

    toggleSidebar(state) {
      state.sidebarCollapsed =
        !state.sidebarCollapsed;
    },
  },
});

export const {
  toggleTheme,
  setThemeMode,
  toggleSidebar,
} = uiSlice.actions;

export default uiSlice.reducer;

/* ---------- Selectors ---------- */

export const selectDarkMode = (state) =>
  state.ui.darkMode;

export const selectSidebarCollapsed = (state) =>
  state.ui.sidebarCollapsed;