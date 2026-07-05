import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const data = [
  { name: "Low", value: 40 },
  { name: "Medium", value: 30 },
  { name: "High", value: 20 },
  { name: "Critical", value: 10 },
];

const COLORS = [
  "#4caf50",
  "#ff9800",
  "#f44336",
  "#9c27b0",
];

export default function RiskChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index]}
            />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}