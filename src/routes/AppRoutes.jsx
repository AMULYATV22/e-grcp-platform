import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Typography } from "@mui/material";

import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import Loader from "../components/common/Loader";


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


const DashboardPage = lazy(() =>
  import("../pages/dashboard/DashboardPage")
);

const ProcurementPage = lazy(() =>
  import("../pages/procurement/ProcurementPage")
);

const ProcurementDetailsPage = lazy(() =>
  import("../pages/procurement/ProcurementDetailsPage")
);


const VendorPage = lazy(() =>
  import("../pages/vendors/VendorPage")
);

const VendorDetailsPage = lazy(() =>
  import("../pages/vendors/VendorDetailsPage")
);


const RiskPage = lazy(() =>
  import("../pages/risk/RiskPage")
);


const CompliancePage = lazy(() =>
  import("../pages/compliance/CompliancePage")
);


const AuditPage = lazy(() =>
  import("../pages/audit/AuditPage")
);


const ApprovalWorkbenchPage = lazy(() =>
  import("../pages/approval/ApprovalWorkbenchPage")
);


const ReportsPage = lazy(() =>
  import("../pages/reports/ReportsPage")
);


const NotificationsPage = lazy(() =>
  import("../pages/notifications/NotificationsPage")
);


const SettingsPage = lazy(() =>
  import("../pages/settings/SettingsPage")
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader label="Loading..." />}>
      <Routes>
        
        <Route path="/" element={<Navigate to="/login" replace />} />

        
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