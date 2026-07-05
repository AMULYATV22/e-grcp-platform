import { memo } from "react";
import { Paper, Typography } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

function RiskDistributionChart({ risks }) {
  const severityData = [
    { name: "Critical", value: risks.filter(r => r.severity === "Critical").length },
    { name: "High", value: risks.filter(r => r.severity === "High").length },
    { name: "Medium", value: risks.filter(r => r.severity === "Medium").length },
    { name: "Low", value: risks.filter(r => r.severity === "Low").length },
  ];

  const COLORS = ["#d32f2f", "#f57c00", "#fbc02d", "#388e3c"];

  return (
    <Paper sx={{ p: 2, height: 300 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Risk Severity Distribution
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={severityData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {severityData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default memo(RiskDistributionChart);
