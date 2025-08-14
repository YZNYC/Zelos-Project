import CardShell from "./CardShell";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function CardChartLine({ title = "Chamados finalizados x abertos", data = [] }) {
  return (
    <CardShell title={title} className="h-[320px]">
      <div className="h-[260px] flex">
        {/* gráfico à esquerda */}
        <div className="flex-[3] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="abertos" stroke="#ef4444" strokeWidth={3} dot={{ r: 5 }} />
              <Line type="monotone" dataKey="finalizados" stroke="#2563eb" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* legenda à direita */}
        <div className="flex-[1] pl-4 flex flex-col justify-center gap-3">
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
