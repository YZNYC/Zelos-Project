'use client'
import { useState, useEffect } from "react";
import CardStat from "../Components/dashboard/CardStat";
import CardChartPie from "../Components/dashboard/CardChartPie";
import CardChartLine from "../Components/dashboard/CardChartLine";
import CardTableRecent from "../Components/dashboard/CardTableRecent";
import {
  genCounters,
  genPieData,
  genLineData,
  genRecentRows,
} from "../lib/mockDashBoardData";


export default function dashBoard() {
  // ===== MOCK: gere dados aleatórios a cada render =====
  // TODO: Substituir por dados reais vindos do seu backend.
  const [counters, setCounters] = useState(null);
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    setCounters(genCounters());
    setPieData(genPieData());
    setLineData(genLineData());
    setRecent(genRecentRows(100)); // muitos dados para testar scroll
  }, []);

  if (!counters) {
    return (
      <main className="ml-[22.5rem] mt-[165px] p-6">Carregando...</main>
    );
  }
  return (
    // <RotaProtegidaAdm requiredRole="responsavel">
    <>
   <main className="ml-[22.5rem] mt-[165px] p-6 overflow-y-auto h-[calc(100vh-165px)]">
      <div className="grid grid-cols-12 gap-6">
        {/* Topo: 4 cards */}
        <div className="col-span-12 grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6 xl:col-span-3">
            <CardStat title="Chamados abertos" value={counters.abertos} />
          </div>
          <div className="col-span-12 sm:col-span-6 xl:col-span-3">
            <CardStat title="Chamados em andam." value={counters.andamento} />
          </div>
          <div className="col-span-12 sm:col-span-6 xl:col-span-3">
            <CardStat title="Chamados finalizados" value={counters.finalizados} />
          </div>
          <div className="col-span-12 sm:col-span-6 xl:col-span-3">
            <CardStat title="Tempo médio de resolução" value={counters.tempoMedioHoras} suffix="h" />
          </div>
        </div>

        {/* Meio: gráficos */}
        <div className="col-span-12 xl:col-span-4">
          <CardChartPie data={pieData} />
        </div>
        <div className="col-span-12 xl:col-span-8">
          <CardChartLine data={lineData} />
        </div>

        {/* Base: tabela */}
        <div className="col-span-12">
          <CardTableRecent rows={recent} />
        </div>
      </div>
    </main>
      </>
  );
}