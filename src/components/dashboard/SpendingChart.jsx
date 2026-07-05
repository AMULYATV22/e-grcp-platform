import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { dept: "IT", amount: 90 },
  { dept: "HR", amount: 45 },
  { dept: "Finance", amount: 80 },
  { dept: "Legal", amount: 30 },
  { dept: "Ops", amount: 65 },
];

export default function SpendingChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dept" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="amount"
          fill="#1976d2"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}