import { memo } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import ScheduleIcon from "@mui/icons-material/Schedule";

function ComplianceKpiCards({ compliance }) {
  const compliantCount = compliance.filter(c => c.status === "Compliant").length;
  const pendingCount = compliance.filter(c => c.status === "Pending").length;
  const expiredCount = compliance.filter(c => c.status === "Expired").length;
  const totalViolations = compliance.reduce((sum, c) => sum + (c.violations || 0), 0);

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
          title="Compliant"
          value={compliantCount}
          icon={CheckCircleIcon}
          color="#388e3c"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="Pending"
          value={pendingCount}
          icon={ScheduleIcon}
          color="#fbc02d"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="Expired"
          value={expiredCount}
          icon={ErrorIcon}
          color="#d32f2f"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="Total Violations"
          value={totalViolations}
          icon={WarningIcon}
          color="#f57c00"
        />
      </Grid>
    </Grid>
  );
}

export default memo(ComplianceKpiCards);
