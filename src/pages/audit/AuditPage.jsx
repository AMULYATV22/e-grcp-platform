import {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  addAudit,
  fetchAudits,
} from "../../app/auditSlice";

import {
  Container,
  Typography,
  Snackbar,
  Alert,
  Box,
  TextField,
  Stack,
  Grid,
  Chip,
} from "@mui/material";

import AuditDialog from "../../components/audit/AuditDialog";
import AuditTable from "../../components/audit/AuditTable";
import AuditTimeline from "../../components/audit/AuditTimeline";

export default function AuditPage() {
  const dispatch = useDispatch();

  const {
    audits,
    loading,
  } = useSelector(
    (state) => state.audit
  );

  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    dispatch(fetchAudits());
  }, [dispatch]);

  const filteredRecords = useMemo(() => {
    return audits.filter((record) => {
      const matchesSearch =
        `${record.activity} ${record.user} ${record.module}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesModule =
        moduleFilter === "" || record.module === moduleFilter;

      return matchesSearch && matchesModule;
    });
  }, [audits, search, moduleFilter]);

  const handleAddAudit = useCallback(
    (record) => {
      dispatch(addAudit(record));
      setOpenDialog(false);
      setOpenSnackbar(true);
    },
    [dispatch]
  );

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Typography variant="h5">
          Loading Audit Data...
        </Typography>
      </Container>
    );
  }

  const modules = [...new Set(audits.map(a => a.module))];

  return (
    <Container maxWidth="xl">
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 3, justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" } }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Audit Center
          </Typography>
          <Typography color="text.secondary">
            Trace user actions, system activity, and governance events across the platform.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
          <Chip label={`${audits.length} Total Logs`} color="primary" />
          <Chip label={`${filteredRecords.filter((item) => item.status === "Pending").length} Pending`} color="warning" />
        </Stack>
      </Stack>

      <Box sx={{ mb: 3 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Search Activities"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{ flex: 1 }}
          />
          <TextField
            select
            label="Filter by Module"
            variant="outlined"
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
            size="small"
            slotProps={{
              select: {
                native: true,
              },
            }}
            sx={{ minWidth: 200 }}
          >
            <option value="">All Modules</option>
            {modules.map((module) => (
              <option key={module} value={module}>
                {module}
              </option>
            ))}
          </TextField>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <AuditTimeline auditLogs={filteredRecords.slice(0, 5)} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <AuditTable rows={filteredRecords} />
        </Grid>
      </Grid>

      <AuditDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleAddAudit}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" variant="filled">
          Audit Record Added Successfully
        </Alert>
      </Snackbar>
    </Container>
  );
}
  
