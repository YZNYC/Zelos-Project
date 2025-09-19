"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ChamadoCard from "@/components/dashboard/ChamadoCard";

export default function ChamadosTec() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [filterTipo, setFilterTipo] = useState("todos");
  const [filterTecnico, setFilterTecnico] = useState("todos");

  const [tecnicos, setTecnicos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [meusChamados, setMeusChamados] = useState([]);
  const [outrosChamados, setOutrosChamados] = useState([]);

  const API = "http://localhost:8080/api";

  // -------------------- Fetch inicial --------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!token || !userData) {
      router.push("/");
      return;
    }

    setUser(userData);

    fetchTecnicos();
    fetchTipos();
    fetchChamados(userData.id);

    setLoading(false);
  }, []);

  // -------------------- Funções de fetch --------------------
  const fetchTecnicos = async () => {
    try {
      const res = await axios.get(`${API}/chamados/tecnicos`);
      setTecnicos(res.data);
    } catch (error) {
      console.error("Erro ao buscar técnicos:", error);
    }
  };

  const fetchTipos = async () => {
    try {
      const res = await axios.get(`${API}/chamados/tipos`);
      setTipos(res.data);
    } catch (error) {
      console.error("Erro ao buscar tipos:", error);
    }
  };

  const fetchChamados = async (userId) => {
    try {
      const res = await axios.get(`${API}/chamados`);
      const todosChamados = res.data;

      setMeusChamados(todosChamados.filter(c => c.tecnico_id === userId));
      setOutrosChamados(todosChamados.filter(c => c.tecnico_id !== userId));
    } catch (error) {
      console.error("Erro ao buscar chamados:", error);
    }
  };

  // -------------------- Função de filtragem --------------------
  const filterChamados = (lista) =>
    lista.filter((chamado) => {
      const matchesSearchTerm =
        chamado.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chamado.descricao?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chamado.id?.toString().includes(searchTerm.toLowerCase()) ||
        (chamado.tipo_nome && chamado.tipo_nome.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (chamado.tecnico_nome && chamado.tecnico_nome.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (chamado.usuario_nome && chamado.usuario_nome.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = filterStatus === "todos" || chamado.status === filterStatus;
      const matchesTipo = filterTipo === "todos" || chamado.tipo_id === parseInt(filterTipo);
      const matchesTecnico = filterTecnico === "todos" || chamado.tecnico_id === parseInt(filterTecnico);

      return matchesSearchTerm && matchesStatus && matchesTipo && matchesTecnico;
    });

  if (loading) return <div className="p-4">Carregando chamados...</div>;

  // -------------------- Render --------------------
  return (
    <div className="p-6 mt-20">
      <h1 className="text-5xl font-bold mb-8">Chamados</h1>

      {/* ----- Filtros ----- */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Pesquisar chamados..."
          className="p-2 border border-gray-300 rounded-lg w-full sm:w-auto flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg cursor-pointer bg-white"
        >
          <option value="todos">Todos os Status</option>
          <option value="pendente">Pendente</option>
          <option value="em andamento">Em Andamento</option>
          <option value="concluido">Concluído</option>
        </select>

        <select
          value={filterTipo}
          onChange={(e) => setFilterTipo(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg cursor-pointer bg-white"
        >
          <option value="todos">Todos os Tipos</option>
          {tipos.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.titulo.charAt(0).toUpperCase() + tipo.titulo.slice(1).replace("_", " ")}
            </option>
          ))}
        </select>

        <select
          value={filterTecnico}
          onChange={(e) => setFilterTecnico(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg cursor-pointer bg-white"
        >
          <option value="todos">Todos os Técnicos</option>
          {tecnicos.map((tecnico) => (
            <option key={tecnico.id} value={tecnico.id}>
              {tecnico.nome}
            </option>
          ))}
        </select>
      </div>

      {/* ----- Meus chamados ----- */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Atribuídos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {meusChamados.length > 0 ? (
            filterChamados(meusChamados).map((chamado) => (
              <ChamadoCard key={chamado.id} chamado={chamado} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Nenhum chamado atribuído a você.
            </p>
          )}
        </div>
      </section>

      {/* ----- Outros chamados ----- */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Chamados de outros técnicos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filterChamados(outrosChamados).length > 0 ? (
            filterChamados(outrosChamados).map((chamado) => (
              <ChamadoCard key={chamado.id} chamado={chamado} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">Nenhum chamado encontrado.</p>
          )}
        </div>
      </section>
    </div>
  );
}
