import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Container,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

import DashboardCharts from "../../components/dashboard/DashboardCharts";
import ActivityTimeline from "../../components/dashboard/ActivityTimeline";

import {
  fetchDashboardKPIs,
  selectKPIs,
  selectDashboardLoading,
} from "../../app/dashboardSlice";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const kpis = useSelector(selectKPIs);
  const loading = useSelector(selectDashboardLoading);

  useEffect(() => {
    dispatch(fetchDashboardKPIs());
  }, [dispatch]);

  return (
    <Container maxWidth="xl">
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 4 }}
      >
        Executive Dashboard
      </Typography>

      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {loading ? (
          <Grid
            size={{ xs: 12 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 200,
            }}
          >
            <CircularProgress />
          </Grid>
        ) : kpis.length > 0 ? (
          kpis.map((card) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              key={card.title}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  textAlign: "center",
                  height: "100%",
                  background: `linear-gradient(135deg, ${card.color || "#1976d2"}20 0%, transparent 100%)`,
                  border: `1px solid ${card.color || "#1976d2"}33`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                  },
                }}
              >
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  {card.title}
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    mt: 2,
                    color: card.color || "#1976d2",
                  }}
                >
                  {card.value}
                </Typography>
              </Paper>
            </Grid>
          ))
        ) : (
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                textAlign: "center",
                py: 4,
              }}
            >
              <Typography color="text.secondary">
                No KPI data available
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      
      <DashboardCharts />

     
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mt: 3,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 2 }}
        >
          Recent Activity
        </Typography>

        <ActivityTimeline />
      </Paper>
    </Container>
  );
}