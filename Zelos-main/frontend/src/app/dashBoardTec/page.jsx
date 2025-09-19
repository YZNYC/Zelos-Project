"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import CardStat from "../../components/dashboard/CardStat";
import CardChartPie from "../../components/dashboard/CardChartPie";
import CardChartLine from "../../components/dashboard/CardChartLine";
import CardTableRecent from "../../components/dashboard/CardTableRecent";
import ModalCreateChamado from "../../components/Modals/ModalCriarChamado";

export default function DashBoardTecnico() {
  const router = useRouter();

  // Estados para dashboard técnico
  const [countersTec, setCountersTec] = useState(null);
  const [pieDataTec, setPieDataTec] = useState([]);
  const [lineDataTec, setLineDataTec] = useState([]);
  const [meusChamados, setMeusChamados] = useState([]);
  const [outrosChamados, setOutrosChamados] = useState([]);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tecnicos, setTecnicos] = useState([]);
  const [tipos, setTipos] = useState([]);

  // Estados para dashboard geral
  const [counters, setCounters] = useState(null);
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));

    // Se não estiver logado ou não for técnico, só carrega dashboard geral
    if (!token || !userData) {
      fetchDashboardGeral(token);
      return;
    }

    setUser(userData);

    // Se for técnico, carrega ambos
    fetchDashboardTec(token);
    fetchDashboardGeral(token);
  }, [router]);

  // Dashboard técnico
  const fetchDashboardTec = async (token) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [
        resCounters,
        resPie,
        resLine,
        resMeus,
        resOutros,
        resTecnicos,
        resTipos,
      ] = await Promise.all([
        axios.get("http://localhost:8080/api/tecnico/dashboard/counters", { headers }),
        axios.get("http://localhost:8080/api/tecnico/dashboard/pie", { headers }),
        axios.get("http://localhost:8080/api/tecnico/dashboard/line", { headers }),
        axios.get("http://localhost:8080/api/tecnico/chamados/meus", { headers }),
        axios.get("http://localhost:8080/api/tecnico/chamados/outros", { headers }),
        axios.get("http://localhost:8080/api/usuarios/tecnicos", { headers }),
        axios.get("http://localhost:8080/api/chamados/tipos", { headers }),
      ]);

      setCountersTec(resCounters.data);
      setPieDataTec(resPie.data);
      setLineDataTec(resLine.data);
      setMeusChamados(resMeus.data);
      setOutrosChamados(resOutros.data);
      setTecnicos(resTecnicos.data);
      setTipos(resTipos.data);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/");
      }
    }
  };

  // Dashboard geral
  const fetchDashboardGeral = async (token) => {
    if (!token) {
      router.push("/");
      return;
    }
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [
        resCounters,
        resPie,
        resLine,
        resRecent,
      ] = await Promise.all([
        axios.get("http://localhost:8080/api/dashboard/counters", { headers }),
        axios.get("http://localhost:8080/api/dashboard/pie", { headers }),
        axios.get("http://localhost:8080/api/dashboard/line", { headers }),
        axios.get("http://localhost:8080/api/dashboard/recent", { headers }),
      ]);
      setCounters(resCounters.data);
      setPieData(resPie.data);
      setLineData(resLine.data);
      setRecent(resRecent.data);
    } catch (error) {
      console.error("Erro ao carregar dados do dashboard:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        router.push("/");
      }
    }
  };

  // Função para atualizar a lista quando um chamado for criado
  const handleNovoChamado = (chamadoCriado) => {
    if (chamadoCriado.tecnico_id === user?.id) {
      setMeusChamados((prev) => [chamadoCriado, ...prev]);
    } else {
      setOutrosChamados((prev) => [chamadoCriado, ...prev]);
    }
  };

  // Atualiza o status de um chamado do técnico
  const handleAtualizarStatus = async (idChamado, novoStatus) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:8080/api/tecnico/chamados/${idChamado}/status`,
        { status: novoStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMeusChamados((prev) =>
        prev.map((c) => (c.id === idChamado ? { ...c, status: novoStatus } : c))
      );
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  // Solicitar ajuda em um chamado de outro técnico
  const handleRequestHelp = async (idChamado) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `http://localhost:8080/api/tecnico/chamados/${idChamado}/request-help`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Solicitação de ajuda enviada!");
    } catch (error) {
      console.error("Erro ao solicitar ajuda:", error);
    }
  };

  // Renderização condicional: técnico vê ambos, outros só o geral
  if (user?.funcao === "tecnico") {
    if (!countersTec) return <div className="p-4">Carregando...</div>;
    return (
      <main className="ml-0 mt-[88px] sm:mt-[165px] p-4 overflow-y-auto">
        <div className="grid grid-cols-12 gap-6">
          {/* Cards de estatísticas técnico */}
          <div className="col-span-12 grid grid-cols-12 gap-6 mb-6">
            <div className="col-span-12 sm:col-span-6 xl:col-span-3">
              <CardStat title="Chamados abertos" value={countersTec.abertos} />
            </div>
            <div className="col-span-12 sm:col-span-6 xl:col-span-3">
              <CardStat title="Em andamento" value={countersTec.andamento} />
            </div>
            <div className="col-span-12 sm:col-span-6 xl:col-span-3">
              <CardStat title="Finalizados" value={countersTec.finalizados} />
            </div>
            <div className="col-span-12 sm:col-span-6 xl:col-span-3">
              <CardStat
                title="Tempo médio de resolução"
                value={countersTec.tempoMedioHoras}
                suffix="h"
              />
            </div>
          </div>
          {/* Gráficos técnico */}
          <div className="col-span-12 xl:col-span-4 min-h-[300px]">
            <CardChartPie data={pieDataTec} />
          </div>
          <div className="col-span-12 xl:col-span-8 min-h-[300px]">
            <CardChartLine data={lineDataTec} />
          </div>
          {/* Tabela de meus chamados */}
          <div className="col-span-12 mt-6">
            <h2 className="text-xl font-bold mb-2">Meus Chamados</h2>
            <CardTableRecent
              rows={meusChamados}
              onUpdateStatus={handleAtualizarStatus}
              tecnicoId={user.id}
            />
          </div>
          {/* Tabela de chamados de outros técnicos */}
          <div className="col-span-12 mt-6">
            <h2 className="text-xl font-bold mb-2">Chamados de outros técnicos</h2>
            <CardTableRecent
              rows={outrosChamados}
              onRequestHelp={handleRequestHelp}
              tecnicoId={user.id}
            />
          </div>
        </div>
      </main>
    );
  } else {
    // Dashboard geral para outros usuários
    if (!counters) return <div className="p-4">Carregando...</div>;
    return (
      <main className="mt-[88px] p-4 overflow-y-auto">
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
}