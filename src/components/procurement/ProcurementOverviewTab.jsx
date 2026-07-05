import { memo, useMemo } from "react";
import { Box, Chip, Grid, Paper, Typography } from "@mui/material";

function ProcurementOverviewTab({ request }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Pending":
        return "warning";
      case "Rejected":
        return "error";
      case "In Review":
        return "info";
      default:
        return "default";
    }
  };

  const overviewItems = useMemo(
    () => [
      { label: "Request ID", value: request.id },
      { label: "Title", value: request.title || request.item || "N/A" },
      { label: "Department", value: request.department },
      { label: "Vendor", value: request.vendor },
      { label: "Requested By", value: request.requestedBy },
      { label: "Amount", value: `$${Number(request.amount || 0).toLocaleString()}` },
      { label: "Priority", value: request.priority || "Medium" },
      { label: "Created Date", value: request.dateCreated },
    ],
    [request]
  );

  return (
    <Grid container spacing={3}>
      {overviewItems.map((item) => (
        <Grid size={{ xs: 12, sm: 6 }} key={item.label}>
          <Paper sx={{ p: 2, height: "100%" }}>
            <Typography variant="subtitle2" color="textSecondary">
              {item.label}
            </Typography>
            <Typography variant="h6" sx={{ mt: 0.5 }}>
              {item.value}
            </Typography>
          </Paper>
        </Grid>
      ))}

      <Grid size={{ xs: 12, sm: 6 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="textSecondary">
            Status
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Chip
              label={request.status}
              color={getStatusColor(request.status)}
              size="medium"
            />
          </Box>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="textSecondary">
            Description
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {request.description}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default memo(ProcurementOverviewTab);
