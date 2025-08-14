"use client";
import CardShell from "./CardShell";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#ED1C24", "#335BFF", "#001F54"]; // Zelos/SENAI

export default function CardChartPie({
  title = "Chamados por tipo",
  data = [],
}) {
  return (
    <CardShell title={title} className="h-[320px]">
      <div className="h-[260px] flex">
        {/* gráfico à esquerda */}
        <div className="flex-[2] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={42}
                outerRadius={70}
                paddingAngle={4}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* legenda à direita, dentro do card */}
        <div className="flex-[1] pl-4 flex flex-col justify-center gap-3">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span className="text-sm text-gray-700">{d.name}</span>
            </div>
          ))}
        </div>
      </div>
    </CardShell>
  );
}
