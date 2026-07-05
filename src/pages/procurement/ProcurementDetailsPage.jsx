import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
  Breadcrumbs,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";

import procurementData from "../../mocks/procurementData";
import {
  addCommentToRequest,
  selectAllRequests,
  selectSelectedRequest,
  setSelectedRequest,
} from "../../app/procurementSlice";
import ProcurementOverviewTab from "../../components/procurement/ProcurementOverviewTab";
import ProcurementAttachmentsTab from "../../components/procurement/ProcurementAttachmentsTab";
import ProcurementApprovalHistoryTab from "../../components/procurement/ProcurementApprovalHistoryTab";
import ProcurementCommentsTab from "../../components/procurement/ProcurementCommentsTab";
import ProcurementAuditLogsTab from "../../components/procurement/ProcurementAuditLogsTab";

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function ProcurementDetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { requestId } = useParams();
  const [tabValue, setTabValue] = useState(0);

  const requests = useSelector(selectAllRequests);
  const selectedRequest = useSelector(selectSelectedRequest);

  const request = useMemo(() => {
    const fromRedux = requests.find((item) => item.id === requestId);
    if (fromRedux) {
      return fromRedux;
    }

    if (selectedRequest?.id === requestId) {
      return selectedRequest;
    }

    return procurementData.find((item) => item.id === requestId) || null;
  }, [requestId, requests, selectedRequest]);

  useEffect(() => {
    if (request) {
      dispatch(setSelectedRequest(request));
    }
  }, [dispatch, request]);

  const handleTabChange = useCallback((_, newValue) => {
    setTabValue(newValue);
  }, []);

  const handleBack = useCallback(() => {
    navigate("/procurement");
  }, [navigate]);

  const handleAddComment = useCallback(
    (commentText) => {
      if (!request?.id) {
        return;
      }

      dispatch(
        addCommentToRequest({
          requestId: request.id,
          comment: {
            text: commentText,
            user: "Current User",
          },
        })
      );
    },
    [dispatch, request?.id]
  );

  const breadcrumbs = useMemo(
    () => [
      { label: "Dashboard", to: "/dashboard" },
      { label: "Procurement", to: "/procurement" },
      { label: request?.id || "Request Details" },
    ],
    [request?.id]
  );

  if (!request) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h5" fontWeight="600" gutterBottom>
            Request Not Found
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            The requested procurement record could not be found. Please return to the procurement list and select a valid request.
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
          >
            Back to Procurement
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <RouterLink to="/dashboard" style={{ color: "inherit", textDecoration: "none" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <HomeIcon fontSize="small" />
            <span>Dashboard</span>
          </Box>
        </RouterLink>
        <RouterLink to="/procurement" style={{ color: "inherit", textDecoration: "none" }}>
          Procurement
        </RouterLink>
        <Typography color="text.primary">{request.id}</Typography>
      </Breadcrumbs>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mb: 3, alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between" }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Procurement Request Details
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Review request information, approvals, files, and activity logs.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5}>
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handleBack}>
            Back
          </Button>
          <Chip label={request.status || "Pending"} color="info" />
        </Stack>
      </Stack>

      <Paper elevation={3}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab label="Overview" id="tab-0" aria-controls="tabpanel-0" />
          <Tab label="Attachments" id="tab-1" aria-controls="tabpanel-1" />
          <Tab label="Approval History" id="tab-2" aria-controls="tabpanel-2" />
          <Tab label="Comments" id="tab-3" aria-controls="tabpanel-3" />
          <Tab label="Audit Logs" id="tab-4" aria-controls="tabpanel-4" />
        </Tabs>

        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          <TabPanel value={tabValue} index={0}>
            <ProcurementOverviewTab request={request} />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <ProcurementAttachmentsTab attachments={request.attachments || []} />
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <ProcurementApprovalHistoryTab approvalHistory={request.approvalHistory || []} />
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <ProcurementCommentsTab
              comments={request.comments || []}
              onAddComment={handleAddComment}
            />
          </TabPanel>

          <TabPanel value={tabValue} index={4}>
            <ProcurementAuditLogsTab auditLogs={request.auditLogs || []} />
          </TabPanel>
        </Box>
      </Paper>
    </Container>
  );
}

export default memo(ProcurementDetailsPage);
