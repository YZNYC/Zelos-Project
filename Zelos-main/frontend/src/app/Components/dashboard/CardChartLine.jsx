"use client";

import CardShell from "./CardShell";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function CardChartLine({
  title = "Chamados finalizados x abertos",
  data = []
}) {
  return (
    <CardShell title={title} className="h-auto">
      <div className="flex flex-col md:flex-row h-full">
        {/* gráfico */}
        <div className="w-full md:flex-[3] flex items-center justify-center h-[250px] md:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="abertos" stroke="#ef4444" strokeWidth={3} dot={{ r: 5 }} />
              <Line type="monotone" dataKey="finalizados" stroke="#2563eb" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* legenda */}
        <div className="w-full md:flex-[1] flex md:flex-col justify-center items-center md:items-start gap-4 p-4">
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-red-600" />
            <span className="text-sm text-gray-700">Abertos</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-600" />
            <span className="text-sm text-gray-700">Finalizados</span>
          </div>
        </div>
      </div>
    </CardShell>
  );
}
