import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Typography } from "@mui/material";

import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import Loader from "../components/common/Loader";

// Authentication Pages
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const ForgotPasswordPage = lazy(() =>
  import("../pages/auth/ForgotPasswordPage")
);
const ResetPasswordPage = lazy(() =>
  import("../pages/auth/ResetPasswordPage")
);
const SessionExpiredPage = lazy(() =>
  import("../pages/auth/SessionExpiredPage")
);

// Dashboard
const DashboardPage = lazy(() =>
  import("../pages/dashboard/DashboardPage")
);

// Procurement
const ProcurementPage = lazy(() =>
  import("../pages/procurement/ProcurementPage")
);

const ProcurementDetailsPage = lazy(() =>
  import("../pages/procurement/ProcurementDetailsPage")
);

// Vendors
const VendorPage = lazy(() =>
  import("../pages/vendors/VendorPage")
);

const VendorDetailsPage = lazy(() =>
  import("../pages/vendors/VendorDetailsPage")
);

// Risk
const RiskPage = lazy(() =>
  import("../pages/risk/RiskPage")
);

// Compliance
const CompliancePage = lazy(() =>
  import("../pages/compliance/CompliancePage")
);

// Audit
const AuditPage = lazy(() =>
  import("../pages/audit/AuditPage")
);

// Approval Workbench
const ApprovalWorkbenchPage = lazy(() =>
  import("../pages/approval/ApprovalWorkbenchPage")
);

// Reports
const ReportsPage = lazy(() =>
  import("../pages/reports/ReportsPage")
);

// Notifications
const NotificationsPage = lazy(() =>
  import("../pages/notifications/NotificationsPage")
);

// Settings
const SettingsPage = lazy(() =>
  import("../pages/settings/SettingsPage")
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader label="Loading..." />}>
      <Routes>
        {/* Redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/forgot-password"
          element={<ForgotPasswordPage />}
        />
        <Route
          path="/reset-password"
          element={<ResetPasswordPage />}
        />
        <Route
          path="/session-expired"
          element={<SessionExpiredPage />}
        />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/procurement"
            element={<ProcurementPage />}
          />

          <Route
            path="/procurement/:requestId"
            element={<ProcurementDetailsPage />}
          />

          <Route
            path="/vendors"
            element={<VendorPage />}
          />

          <Route
            path="/vendors/:id"
            element={<VendorDetailsPage />}
          />

          <Route
            path="/risk"
            element={<RiskPage />}
          />

          <Route
            path="/compliance"
            element={<CompliancePage />}
          />

          <Route
            path="/audit"
            element={<AuditPage />}
          />

          <Route
            path="/approvals"
            element={<ApprovalWorkbenchPage />}
          />

          <Route
            path="/reports"
            element={<ReportsPage />}
          />

          <Route
            path="/notifications"
            element={<NotificationsPage />}
          />

          <Route
            path="/settings"
            element={<SettingsPage />}
          />
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <Typography variant="h4" sx={{ p: 4 }}>
              404 - Page Not Found
            </Typography>
          }
        />
      </Routes>
    </Suspense>
  );
}