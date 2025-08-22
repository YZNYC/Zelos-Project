'use client'
import { useState, useEffect } from "react";
import axios from "axios"; 
import CardStat from "../Components/dashboard/CardStat";
import CardChartPie from "../Components/dashboard/CardChartPie";
import CardChartLine from "../Components/dashboard/CardChartLine";
import CardTableRecent from "../Components/dashboard/CardTableRecent";

export default function dashBoard() {
  const [counters, setCounters] = useState(null);
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCounters = await axios.get("http://localhost:8080/api/dashboard/counters");
        const resPie = await axios.get("http://localhost:8080/api/dashboard/pie");
        const resLine = await axios.get("http://localhost:8080/api/dashboard/line");
        const resRecent = await axios.get("http://localhost:8080/api/dashboard/recent");

        setCounters(resCounters.data);
        setPieData(resPie.data);
        setLineData(resLine.data);
        setRecent(resRecent.data);
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
      }
    };

    fetchData();
  }, []);

  // Se ainda não carregou, renderiza só o loading centralizado, sem main nem margem
  if (!counters) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
        Carregando...
      </div>
    );
  }

  // Quando os dados carregarem, renderiza o main normalmente
  return (
    <main className="ml-0  mt-[88px] sm:mt-[165px] p-4 overflow-y-auto">
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
