'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import ChamadoCard from "../Components/dashboard/ChamadoCard";

export default function TecnicosChamados({ usuarioLogado }) {
  const [tecnicos, setTecnicos] = useState([]);
  const [chamados, setChamados] = useState([]);
  const [expandedTecnico, setExpandedTecnico] = useState(null);
  const [filtros, setFiltros] = useState({}); // { tecnicoId: "status" }

  const [novoTecnico, setNovoTecnico] = useState({ nome: "", numeroUsuario: "", senha: "" });

  const API = "http://localhost:8080/api";

  useEffect(() => {
    fetchTecnicos();
    fetchChamados();
  }, []);

  const fetchTecnicos = async () => {
    try {
      const res = await axios.get(`${API}/chamados/tecnicos`);
      setTecnicos(res.data);
    } catch (error) {
      console.error("Erro ao buscar técnicos:", error);
    }
  };

  const fetchChamados = async () => {
    try {
      const res = await axios.get(`${API}/chamados`);
      setChamados(res.data);
    } catch (error) {
      console.error("Erro ao buscar chamados:", error);
    }
  };

  const handleFiltroChange = (tecnicoId, status) => {
    setFiltros((prev) => ({ ...prev, [tecnicoId]: status }));
  };

  const getChamadosDoTecnico = (tecnicoId) => {
    const chamadosDoTecnico = chamados.filter(c => c.tecnico_id === tecnicoId);
    const filtro = filtros[tecnicoId] || "todos";
    if (filtro === "todos") return chamadosDoTecnico;
    return chamadosDoTecnico.filter(c => c.status === filtro);
  };

  const handleCadastrarTecnico = async (e) => {
    e.preventDefault();
    if (!novoTecnico.nome || !novoTecnico.numeroUsuario || !novoTecnico.senha) {
      alert("Preencha todos os campos!");
      return;
    }

    if (usuarioLogado?.funcao !== "admin") {
      alert("Apenas admins podem cadastrar técnicos.");
      return;
    }

    try {
      const res = await axios.post(`${API}/usuarios`, {
        ...novoTecnico,
        funcao: "tecnico"
      });
      setTecnicos(prev => [...prev, res.data]);
      setNovoTecnico({ nome: "", numeroUsuario: "", senha: "" });
      alert("Técnico cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar técnico:", error);
      alert("Erro ao cadastrar técnico.");
    }
  };

  return (
    <div className="p-6 mt-20">
      <h1 className="text-4xl font-bold mb-6">Técnicos e seus Chamados</h1>

      {/* Formulário só aparece se for admin */}
      {usuarioLogado?.funcao === "admin" && (
        <div className="mb-8 border p-4 rounded-lg shadow-sm bg-gray-50">
          <h2 className="text-2xl font-semibold mb-4">Cadastrar Novo Técnico</h2>
          <form className="space-y-4" onSubmit={handleCadastrarTecnico}>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Nome do técnico"
                value={novoTecnico.nome}
                onChange={(e) => setNovoTecnico({ ...novoTecnico, nome: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Número de usuário"
                value={novoTecnico.numeroUsuario}
                onChange={(e) => setNovoTecnico({ ...novoTecnico, numeroUsuario: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded-lg"
              />
              <input
                type="password"
                placeholder="Senha"
                value={novoTecnico.senha}
                onChange={(e) => setNovoTecnico({ ...novoTecnico, senha: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Cadastrar Técnico
            </button>
          </form>
        </div>
      )}

      {/* Lista de técnicos e chamados */}
      <div className="space-y-4">
        {tecnicos.map((tecnico) => {
          const chamadosDoTecnico = getChamadosDoTecnico(tecnico.id);
          const isOpen = expandedTecnico === tecnico.id;
          const filtroAtual = filtros[tecnico.id] || "todos";

          return (
            <div key={tecnico.id} className="border border-gray-300 rounded-lg shadow-sm">
              <button
                onClick={() => setExpandedTecnico(isOpen ? null : tecnico.id)}
                className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-t-lg"
              >
                <span className="text-lg font-semibold">
                  {tecnico.nome} - id: {tecnico.id}
                </span>
                <span className="text-sm text-gray-600 cursor-pointer">
                  {isOpen ? "▲ Recolher" : "▼ Ver chamados"}
                </span>
              </button>

              {isOpen && (
                <div className="p-4">
                  <div className="mb-4">
                    <label className="mr-2 font-medium">Filtrar por status:</label>
                    <select
                      value={filtroAtual}
                      onChange={(e) => handleFiltroChange(tecnico.id, e.target.value)}
                      className="p-2 border border-gray-300 rounded-lg cursor-pointer bg-white"
                    >
                      <option value="todos">Todos</option>
                      <option value="pendente">Pendente</option>
                      <option value="em andamento">Em andamento</option>
                      <option value="concluido">Concluído</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {chamadosDoTecnico.length > 0 ? (
                      chamadosDoTecnico.map((chamado) => (
                        <ChamadoCard
                          key={chamado.id}
                          chamado={chamado}
                          onClick={usuarioLogado?.funcao === "admin" ? () => alert(`Editar chamado ${chamado.id}`) : undefined}
                        />
                      ))
                    ) : (
                      <p className="col-span-full text-gray-500 text-center">
                        Nenhum chamado atribuído a este técnico.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
