import {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  addRisk,
  fetchRisks,
} from "../../app/riskSlice";

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

import SearchBar from "../../components/risk/SearchBar";
import RiskDialog from "../../components/risk/RiskDialog";
import RiskTable from "../../components/risk/RiskTable";
import RiskDashboardCards from "../../components/risk/RiskDashboardCards";
import RiskDistributionChart from "../../components/risk/RiskDistributionChart";
import RiskMatrix from "../../components/risk/RiskMatrix";

export default function RiskPage() {
  const dispatch = useDispatch();

  const {
    risks,
  } = useSelector(
    (state) => state.risk
  );

  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    dispatch(fetchRisks());
  }, [dispatch]);

  const handleAddRisk = useCallback(
    (risk) => {
      dispatch(addRisk(risk));
      setOpenDialog(false);
      setOpenSnackbar(true);
    },
    [dispatch]
  );

  const filteredRisks = useMemo(() => {
    return risks.filter((risk) =>
      `${risk.title} ${risk.category} ${risk.owner}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [risks, search]);

  const summary = useMemo(() => ({
    critical: risks.filter((risk) => risk.severity === "Critical").length,
    high: risks.filter((risk) => risk.severity === "High").length,
    open: risks.filter((risk) => risk.status === "Open").length,
  }), [risks]);

  return (
    <Container maxWidth="xl">
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 3, justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" } }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Risk Center
          </Typography>
          <Typography color="text.secondary">
            Enterprise risk monitoring, mitigation tracking, and severity management.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
          <Chip label={`${summary.critical} Critical`} color="error" />
          <Chip label={`${summary.high} High`} color="warning" />
          <Chip label={`${summary.open} Open`} color="info" />
        </Stack>
      </Stack>

      <RiskDashboardCards risks={risks} />

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <RiskDistributionChart risks={risks} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <RiskMatrix risks={risks} />
        </Grid>
      </Grid>

      <SearchBar
        search={search}
        setSearch={setSearch}
        onAddClick={() => setOpenDialog(true)}
      />

      <RiskTable rows={filteredRisks} />

      <RiskDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleAddRisk}
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
          Risk Added Successfully
        </Alert>
      </Snackbar>

    </Container>
  );
}