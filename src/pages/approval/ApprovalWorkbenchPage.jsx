import {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchApprovals,
} from "../../app/approvalSlice";

import {
  Container,
  Typography,
  Snackbar,
  Alert,
  Stack,
  Chip,
  Box,
} from "@mui/material";

import ApprovalSearchBar from "../../components/approval/ApprovalSearchBar";
import ApprovalTable from "../../components/approval/ApprovalTable";

export default function ApprovalWorkbenchPage() {
  const dispatch = useDispatch();

  const {
    approvals,
    loading,
  } = useSelector((state) => state.approval);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    dispatch(fetchApprovals());
  }, [dispatch]);

  const filteredApprovals = useMemo(() => {
    return approvals.filter((item) => {
      const matchesSearch =
        `${item.requestId} ${item.department} ${item.requester}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "" || item.status === status;

      const matchesPriority =
        priority === "" || item.priority === priority;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    approvals,
    search,
    status,
    priority,
  ]);

  const handleExport = useCallback(() => {
    if (filteredApprovals.length === 0) {
      alert("No approval records found.");
      return;
    }

    const headers = [
      "Approval ID",
      "Request ID",
      "Department",
      "Requester",
      "Item",
      "Priority",
      "Status",
      "Amount",
    ];

    const rows = filteredApprovals.map((item) => [
      item.id,
      item.requestId,
      item.department,
      item.requester,
      item.item,
      item.priority,
      item.status,
      item.amount,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "ApprovalWorkbench.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setOpenSnackbar(true);
  }, [filteredApprovals]);

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Typography variant="h5">
          Loading Approval Workbench...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 3, justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" } }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Approval Workbench
          </Typography>
          <Typography color="text.secondary">
            Review queues, approve or reject requests, and manage escalations.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
          <Chip label={`${filteredApprovals.filter((item) => item.status === "Pending").length} Pending`} color="warning" />
          <Chip label={`${filteredApprovals.filter((item) => item.status === "Approved").length} Approved`} color="success" />
          <Chip label={`${filteredApprovals.filter((item) => item.status === "Escalated").length} Escalated`} color="error" />
        </Stack>
      </Stack>

      <ApprovalSearchBar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
        onExport={handleExport}
        onAddClick={() =>
          alert("Approval requests are generated from Procurement.")
        }
      />

      <ApprovalTable
        rows={filteredApprovals}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() =>
          setOpenSnackbar(false)
        }
      >
        <Alert
          severity="success"
          variant="filled"
        >
          CSV Exported Successfully
        </Alert>
      </Snackbar>

    </Container>
  );
}