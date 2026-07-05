import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
} from "recharts";

import {
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import {
  procurementTrend,
  riskTrend,
  complianceTrend,
  departmentSpending,
} from "../../mocks/dashboardData";

const COLORS = [
  "#1976d2",
  "#2e7d32",
  "#ed6c02",
  "#d32f2f",
];

export default function DashboardCharts() {
  return (
    <Grid container spacing={3}>

      {/* Procurement Trend */}

      <Grid size={{ xs: 12, md: 6 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>

          <Typography variant="h6" sx={{ mb: 2 }}>
            Monthly Procurement Trend
          </Typography>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={procurementTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="requests"
                stroke="#1976d2"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>

        </Paper>
      </Grid>

      {/* Risk Trend */}

      <Grid size={{ xs: 12, md: 6 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>

          <Typography variant="h6" sx={{ mb: 2 }}>
            Risk Trend
          </Typography>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riskTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="risks"
                fill="#d32f2f"
              />
            </BarChart>
          </ResponsiveContainer>

        </Paper>
      </Grid>

      {/* Compliance Trend */}

      <Grid size={{ xs: 12, md: 6 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>

          <Typography variant="h6" sx={{ mb: 2 }}>
            Compliance Trend
          </Typography>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={complianceTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="compliance"
                stroke="#2e7d32"
                fill="#81c784"
              />
            </AreaChart>
          </ResponsiveContainer>

        </Paper>
      </Grid>

      {/* Department Spending */}

      <Grid size={{ xs: 12, md: 6 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>

          <Typography variant="h6" sx={{ mb: 2 }}>
            Department Spending
          </Typography>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentSpending}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {departmentSpending.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />

            </PieChart>
          </ResponsiveContainer>

        </Paper>
      </Grid>

    </Grid>
  );
}