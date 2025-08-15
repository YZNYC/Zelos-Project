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
  const [counters, setCounters] = useState(null);
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    setCounters(genCounters());
    setPieData(genPieData());
    setLineData(genLineData());
    setRecent(genRecentRows(100));
  }, []);

  if (!counters) {
    return (
      <main className="ml-0 sm:ml-[22.5rem] mt-[88px] sm:mt-[165px] p-4">
        Carregando...
      </main>
    );
  }

  return (
    <main className="ml-0sm:ml-[22.5rem] mt-[88px] sm:mt-[165px] p-4 overflow-y-auto">
    <div className="grid grid-cols-12 gap-6">
      
      {/* Cards do topo */}
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

      {/* Gráficos */}
      <div className="col-span-12 xl:col-span-4 min-h-[300px]">
        <CardChartPie data={pieData} />
      </div>
      <div className="col-span-12 xl:col-span-8 min-h-[300px]">
        <CardChartLine data={lineData} />
      </div>

      {/* Tabela */}
      <div className="col-span-12">
        <CardTableRecent rows={recent} />
      </div>
    </div>
  </main>
  );
}
