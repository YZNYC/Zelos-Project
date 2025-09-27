"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import jwt_decode from "jwt-decode";

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
  const [funcao, setfuncao] = useState(null);
  const [userId, setUserId] = useState(null);

  // Redireciona para página inicial se não estiver logado, somente quando loading terminar
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }
  }, [loading, user, router]);
    const decoded = jwt_decode(token);
    setfuncao(decoded.funcao); // admin | tecnico | user
    setUserId(decoded.id);  // id do usuário logado

    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        // Mesmos endpoints para todos
        const [resCounters, resPie, resLine, resRecent] = await Promise.all([
          axios.get("http://localhost:8080/api/dashboard/counters", { headers }),
          axios.get("http://localhost:8080/api/dashboard/pie", { headers }),
          axios.get("http://localhost:8080/api/dashboard/line", { headers }),
          axios.get("http://localhost:8080/api/dashboard/recent", { headers }),
        ]);

        let filteredRecent = resRecent.data;

        if (decoded.funcao === "tecnico") {
          // mostra apenas chamados atribuídos ao técnico
          filteredRecent = resRecent.data.filter(c => c.tecnicoId === decoded.id);
        } else if (decoded.funcao === "user") {
          // mostra apenas chamados criados pelo usuário
          filteredRecent = resRecent.data.filter(c => c.userId === decoded.id);
        }


        setCounters(resCounters.data);
        setPieData(resPie.data);
        setLineData(resLine.data);
        setRecent(filteredRecent);
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.replace("/"); // redireciona para login
        }
      }
    };

    fetchDashboardData();
  }, [user, router]);

  const handleUpdateStatus = async (chamadoId, novoStatus) => {
    if (funcao !== "tecnico") return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/api/chamados/${chamadoId}/status`,
        { status: novoStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Atualiza o status localmente
      setRecent(prev => prev.map(c => c.id === chamadoId ? { ...c, status: novoStatus } : c));
    } catch (err) {
      console.error("Erro ao atualizar status do chamado:", err);
    }
  };

  if (!counters) return <div className="p-4">Carregando...</div>;

  return (
    <main className="ml-0 mt-[88px] sm:mt-[80px] p-4 overflow-y-auto">
      <div className="grid grid-cols-12 gap-6">
        {/* Estatísticas */}
        <div className="col-span-12 grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6 xl:col-span-3">
            <CardStat title="Chamados abertos" value={counters.abertos} />
          </div>

          {(funcao === "admin" || funcao === "tecnico") && (
            <div className="col-span-12 sm:col-span-6 xl:col-span-3">
              <CardStat title="Chamados em andamento" value={counters.andamento} />
            </div>
          )}

          {funcao === "admin" && (
            <div className="col-span-12 sm:col-span-6 xl:col-span-3">
              <CardStat title="Chamados finalizados" value={counters.finalizados} />
            </div>
          )}

          <div className="col-span-12 sm:col-span-6 xl:col-span-3">
            <CardStat title="Tempo médio de resolução" value={counters.tempoMedioHoras} suffix="h" />
          </div>
        </div>
        {/* Gráficos */}
        {(funcao === "admin" || funcao === "tecnico") && (
          <div className="col-span-12 xl:col-span-4 min-h-[300px]">
            <CardChartPie data={pieData} />
          </div>
        )}

        {(funcao === "admin" || funcao === "tecnico") && (
          <div className="col-span-12 xl:col-span-8 min-h-[300px]">
            <CardChartLine data={lineData} />
          </div>
        )}

        {/* Tabela de chamados */}
        <div className="col-span-12">
          <CardTableRecent
            rows={recent}
            funcao={funcao}
            userId={userId}
            onUpdateStatus={funcao === "tecnico" ? handleUpdateStatus : null}
          />
        </div>
      </div>
    </main>
  );
}
