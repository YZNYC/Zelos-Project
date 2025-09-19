"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import CardStat from "../Components/dashboard/CardStat";
import CardChartPie from "../Components/dashboard/CardChartPie";
import CardChartLine from "../Components/dashboard/CardChartLine";
import CardTableRecent from "../Components/dashboard/CardTableRecent";
import useAuth from "../Hooks/useAuth";

export default function DashBoard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [counters, setCounters] = useState(null);
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [recent, setRecent] = useState([]);

  // Redireciona para página inicial se não estiver logado, somente quando loading terminar
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/"); // página inicial / login
    }
  }, [loading, user, router]);

  // Busca dados do dashboard quando user estiver definido
  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      let urlCounters = "http://localhost:8080/api/dashboard/counters";
      let urlPie = "http://localhost:8080/api/dashboard/pie";
      let urlLine = "http://localhost:8080/api/dashboard/line";
      let urlRecent = "http://localhost:8080/api/dashboard/recent";

      if (user.role === "tecnico") {
        urlCounters += `?tecnicoId=${user.id}`;
        urlPie += `?tecnicoId=${user.id}`;
        urlLine += `?tecnicoId=${user.id}`;
        urlRecent += `?tecnicoId=${user.id}`;
      } else if (user.role === "usuario") {
        urlCounters += `?usuarioId=${user.id}`;
        urlPie += `?usuarioId=${user.id}`;
        urlLine += `?usuarioId=${user.id}`;
        urlRecent += `?usuarioId=${user.id}`;
      }

      try {
        const [resCounters, resPie, resLine, resRecent] = await Promise.all([
          axios.get(urlCounters, { headers }),
          axios.get(urlPie, { headers }),
          axios.get(urlLine, { headers }),
          axios.get(urlRecent, { headers }),
        ]);

        setCounters(resCounters.data);
        setPieData(resPie.data);
        setLineData(resLine.data);
        setRecent(resRecent.data);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.replace("/"); // redireciona para login
        }
      }
    };

    fetchDashboardData();
  }, [user, router]);

  if (loading || !user || !counters) return <div className="p-4">Carregando...</div>;

  return (
    <main className="ml-0 mt-[88px] sm:mt-[80px] p-4 overflow-y-auto">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6 xl:col-span-3">
            <CardStat title="Chamados abertos" value={counters.abertos} />
          </div>
          <div className="col-span-12 sm:col-span-6 xl:col-span-3">
            <CardStat title="Chamados em andamento" value={counters.andamento} />
          </div>
          <div className="col-span-12 sm:col-span-6 xl:col-span-3">
            <CardStat title="Chamados finalizados" value={counters.finalizados} />
          </div>
          <div className="col-span-12 sm:col-span-6 xl:col-span-3">
            <CardStat title="Tempo médio de resolução" value={counters.tempoMedioHoras} suffix="h" />
          </div>
        </div>

        <div className="col-span-12 xl:col-span-4 min-h-[300px]">
          <CardChartPie data={pieData} />
        </div>
        <div className="col-span-12 xl:col-span-8 min-h-[300px]">
          <CardChartLine data={lineData} />
        </div>

        <div className="col-span-12">
          <CardTableRecent rows={recent} />
        </div>
      </div>
    </main>
  );
}
