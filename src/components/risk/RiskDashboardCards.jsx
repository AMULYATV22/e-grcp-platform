import { memo } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function RiskDashboardCards({ risks }) {
  const criticalCount = risks.filter(r => r.severity === "Critical").length;
  const highCount = risks.filter(r => r.severity === "High").length;
  const openCount = risks.filter(r => r.status === "Open").length;
  const mitigatedCount = risks.filter(r => r.status === "Mitigated").length;

  const KpiCard = ({ title, value, icon: Icon, color }) => (
    <Paper
      sx={{
        p: 2,
        textAlign: "center",
        backgroundColor: `${color}15`,
        borderLeft: `4px solid ${color}`,
      }}
    >
      <Icon sx={{ fontSize: 32, color, mb: 1 }} />
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        {value}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {title}
      </Typography>
    </Paper>
  );

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="Critical Risks"
          value={criticalCount}
          icon={ErrorIcon}
          color="#d32f2f"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="High Risks"
          value={highCount}
          icon={WarningIcon}
          color="#f57c00"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="Open Risks"
          value={openCount}
          icon={InfoIcon}
          color="#1976d2"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="Mitigated"
          value={mitigatedCount}
          icon={CheckCircleIcon}
          color="#388e3c"
        />
      </Grid>
    </Grid>
  );
}

export default memo(RiskDashboardCards);
