import { memo } from "react";
import { Paper, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function ComplianceStatusChart({ compliance }) {
  const statusData = [
    {
      name: "Compliant",
      count: compliance.filter(c => c.status === "Compliant").length,
    },
    {
      name: "Pending",
      count: compliance.filter(c => c.status === "Pending").length,
    },
    {
      name: "Expired",
      count: compliance.filter(c => c.status === "Expired").length,
    },
  ];

  return (
    <Paper sx={{ p: 2, height: 300 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Compliance Status Overview
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={statusData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default memo(ComplianceStatusChart);
