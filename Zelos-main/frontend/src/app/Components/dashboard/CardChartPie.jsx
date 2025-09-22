"use client";

import CardShell from "./CardShell";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// Cores Zelos: vermelho, azul claro e azul escuro
const COLORS = ["#ED1C24", "#335BFF", "#001F54", "#2c2c2c"];

// Função pra mapear títulos
function formatTitulo(titulo) {
  if (titulo === "apoio_tecnico") return "TI";
  return titulo.charAt(0).toUpperCase() + titulo.slice(1); // "Manutencao", "Limpeza"
}

export default function CardChartPie({ title = "Chamados por tipo", data = [] }) {
  if (!data || data.length === 0)
    return (
      <CardShell title={title} className="h-[350px] flex items-center justify-center">
        <span className="text-gray-500">Sem dados para exibir</span>
      </CardShell>
    );

  return (
    <CardShell title={title} className="h-auto">
      <div className="flex flex-col md:flex-row h-full">
        {/* Gráfico */}
        <div className="w-full md:flex-[2] flex items-center justify-center h-[250px] md:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
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
              <Tooltip
                formatter={(value, name) => [value, formatTitulo(name)]} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legenda */}
        <div className="w-full md:flex-[1] flex md:flex-col justify-center items-center md:items-start gap-4 p-4">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span className="text-sm text-gray-700">{formatTitulo(d.name)}</span>
            </div>
          ))}
        </div>
      </div>
    </CardShell>
  );
}
