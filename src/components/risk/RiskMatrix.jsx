import { memo } from "react";
import { Paper, Typography } from "@mui/material";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

function RiskMatrix({ risks }) {
  const matrixData = risks.map((risk) => {
    const probability = Number(risk.probability);
    const impact = Number(risk.impact);

    return {
      x: Number.isFinite(probability) ? probability * 10 : 0,
      y: Number.isFinite(impact) ? impact * 10 : 0,
      name: risk.title,
      severity: risk.severity,
    };
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "#d32f2f";
      case "High":
        return "#f57c00";
      case "Medium":
        return "#fbc02d";
      case "Low":
        return "#388e3c";
      default:
        return "#1976d2";
    }
  };

  const renderDot = ({ cx, cy, payload }) => {
    if (cx == null || cy == null) return null;
    return <circle cx={cx} cy={cy} r={6} fill={getSeverityColor(payload.severity)} />;
  };

  return (
    <Paper sx={{ p: 2, height: 350 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Risk Matrix
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            type="number"
            name="Probability"
            label={{ value: "Probability", position: "insideBottomRight", offset: -5 }}
          />
          <YAxis
            dataKey="y"
            type="number"
            name="Impact"
            label={{ value: "Impact", angle: -90, position: "insideLeft" }}
          />
          <RechartsTooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={({ payload }) => {
              if (payload && payload.length) {
                return (
                  <div style={{ backgroundColor: "#fff", padding: "5px", border: "1px solid #ccc" }}>
                    <p>{payload[0].payload.name}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Scatter
            name="Risks"
            data={matrixData}
            shape={renderDot}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default memo(RiskMatrix);
