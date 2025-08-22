"use client";

import CardShell from "./CardShell";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CardChartLine({
  title = "Chamados dos últimos 7 dias",
  data = [],
}) {
  return (
    <CardShell title={title} className="h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="abertos"
            stroke="#ED1C24" // azul
            strokeWidth={2}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="andamento"
            stroke="#FFD700" // amarelo
            strokeWidth={2}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="finalizados"
            stroke="#335BFF" // vermelho
            strokeWidth={2}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </CardShell>
  );
}
