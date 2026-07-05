import {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  addCompliance,
  fetchCompliance,
} from "../../app/complianceSlice";

import {
  Container,
  Typography,
  Snackbar,
  Alert,
  Grid,
  Stack,
  Chip,
  Box,
} from "@mui/material";

import SearchBar from "../../components/compliance/SearchBar";
import ComplianceDialog from "../../components/compliance/ComplianceDialog";
import ComplianceTable from "../../components/compliance/ComplianceTable";
import ComplianceKpiCards from "../../components/compliance/ComplianceKpiCards";
import ComplianceStatusChart from "../../components/compliance/ComplianceStatusChart";

export default function CompliancePage() {
  const dispatch = useDispatch();

  const {
    compliance,
  } = useSelector(
    (state) => state.compliance
  );

  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    dispatch(fetchCompliance());
  }, [dispatch]);

  const handleAddCompliance = useCallback(
    (record) => {
      dispatch(addCompliance(record));
      setOpenDialog(false);
      setOpenSnackbar(true);
    },
    [dispatch]
  );

  const filteredRecords = useMemo(() => {
    return compliance.filter((record) =>
      `${record.document} ${record.department} ${record.owner}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [compliance, search]);

  const summary = useMemo(() => ({
    expired: compliance.filter((item) => item.status === "Expired").length,
    pending: compliance.filter((item) => item.status === "Pending").length,
    violations: compliance.reduce((sum, item) => sum + (item.violations || 0), 0),
  }), [compliance]);

  return (
    <Container maxWidth="xl">
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 3, justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" } }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Compliance Center
          </Typography>
          <Typography color="text.secondary">
            Control monitoring, certification health, and exceptions overview.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
          <Chip label={`${summary.expired} Expired`} color="error" />
          <Chip label={`${summary.pending} Pending`} color="warning" />
          <Chip label={`${summary.violations} Violations`} color="info" />
        </Stack>
      </Stack>

      <ComplianceKpiCards compliance={compliance} />

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12 }}>
          <ComplianceStatusChart compliance={compliance} />
        </Grid>
      </Grid>

      <SearchBar
        search={search}
        setSearch={setSearch}
        onAddClick={() => setOpenDialog(true)}
      />

      <ComplianceTable rows={filteredRecords} />

      <ComplianceDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleAddCompliance}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          severity="success"
          variant="filled"
        >
          Compliance Record Added Successfully
        </Alert>
      </Snackbar>

    </Container>
  );
}