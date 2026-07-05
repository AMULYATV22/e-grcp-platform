import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import storage from "./storage";

import authReducer from "./authSlice";
import dashboardReducer from "./dashboardSlice";
import procurementReducer from "./procurementSlice";
import vendorReducer from "./vendorSlice";
import riskReducer from "./riskSlice";
import complianceReducer from "./complianceSlice";
import auditReducer from "./auditSlice";
import reportReducer from "./reportSlice";
import notificationReducer from "./notificationSlice";
import approvalReducer from "./approvalSlice";
import uiReducer from "./uiSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  procurement: procurementReducer,
  vendors: vendorReducer,
  risk: riskReducer,
  compliance: complianceReducer,
  audit: auditReducer,
  reports: reportReducer,
  notifications: notificationReducer,
  approval: approvalReducer,
  ui: uiReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "auth",
    "dashboard",
    "procurement",
    "vendors",
    "risk",
    "compliance",
    "audit",
    "reports",
    "notifications",
    "approval",
    "ui",
  ],
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  devTools: true,
});

export const persistor = persistStore(store);