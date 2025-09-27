"use client";

import CardShell from "./CardShell";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// 1. Mapeia o nome da categoria para uma cor específica
const COLOR_MAP = {
  manutencao: "#ED1C24", // Vermelho
  limpeza: "#335BFF", // Azul Claro
  apoio_tecnico: "#03307d", // Azul Escuro (TI)
  externo: "#2c2c2c", // Cinza Escuro
};

// Função para formatar os títulos para exibição
function formatTitulo(titulo) {
  if (titulo === "apoio_tecnico") return "TI";
  if (!titulo) return "";
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
                {/* 2. Usa o mapa de cores para preencher cada célula */}
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLOR_MAP[entry.name] || '#CCCCCC'} />
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
                // 3. Usa o mapa de cores também para a legenda
                style={{ backgroundColor: COLOR_MAP[d.name] || '#CCCCCC' }}
              />
              <span className="text-sm text-gray-700">{formatTitulo(d.name)}</span>
            </div>
          ))}
        </div>
      </div>
    </CardShell>
  );
}

