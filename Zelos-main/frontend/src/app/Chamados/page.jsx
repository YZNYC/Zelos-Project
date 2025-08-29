// pages/Chamados.js
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import ChamadoCard from "../Components/dashboard/ChamadoCard";
import ModalEditarChamado from "../Components/Modals/ModalEditarChamado";
import ModalCreateChamado from "../Components/Modals/ModalCriarChamado";

export default function Chamados() {
  const [chamados, setChamados] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [tipos, setTipos] = useState([]); // Adicionado para os tipos de chamado
  const [selectedChamado, setSelectedChamado] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Estados para pesquisa e filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos"); // 'todos', 'pendente', 'em andamento', 'concluido'
  const [filterTipo, setFilterTipo] = useState("todos"); // ID do tipo, ou 'todos'
  const [filterTecnico, setFilterTecnico] = useState("todos"); // ID do técnico, ou 'todos'

  const API = "http://localhost:8080/api/chamados";

  useEffect(() => {
    fetchChamados();
    fetchTecnicos();
    fetchTipos(); // Buscar os tipos de chamado
  }, []);

  const fetchChamados = async () => {
    try {
      const res = await axios.get(API);
      setChamados(res.data);
    } catch (error) {
      console.error("Erro ao buscar chamados:", error);
    }
  };

  const fetchTecnicos = async () => {
    try {
      const res = await axios.get(`${API}/tecnicos`);
      setTecnicos(res.data);
    } catch (error) {
      console.error("Erro ao buscar técnicos:", error);
    }
  };

  const fetchTipos = async () => {
    try {
      const res = await axios.get(`${API}/tipos`);
      setTipos(res.data);
    } catch (error) {
      console.error("Erro ao buscar tipos:", error);
    }
  };

  const handleCreate = async (novoChamado) => {
    try {
      await axios.post(API, novoChamado);
      fetchChamados();
      setIsCreateModalOpen(false); // Fecha o modal após criar
    } catch (error) {
      console.error("Erro ao criar chamado:", error);
    }
  };

  const handleSave = async (chamadoAtualizado) => {
    try {
      await axios.put(`${API}/${chamadoAtualizado.id}`, chamadoAtualizado);
      fetchChamados();
      setSelectedChamado(null); // Fecha o modal após salvar
    } catch (error) {
      console.error("Erro ao salvar chamado:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchChamados();
      setSelectedChamado(null); // Fecha o modal após deletar
    } catch (error) {
      console.error("Erro ao deletar chamado:", error);
    }
  };

  // Lógica de filtragem e pesquisa no frontend
  const filteredChamados = chamados.filter((chamado) => {
    const matchesSearchTerm =
      chamado.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chamado.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chamado.id.toString().includes(searchTerm.toLowerCase()) ||
      (chamado.tipo_nome && chamado.tipo_nome.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (chamado.tecnico_nome && chamado.tecnico_nome.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (chamado.usuario_nome && chamado.usuario_nome.toLowerCase().includes(searchTerm.toLowerCase()));


    const matchesStatus =
      filterStatus === "todos" || chamado.status === filterStatus;

    const matchesTipo =
      filterTipo === "todos" || chamado.tipo_id === parseInt(filterTipo);

    const matchesTecnico =
      filterTecnico === "todos" || chamado.tecnico_id === parseInt(filterTecnico);

    return matchesSearchTerm && matchesStatus && matchesTipo && matchesTecnico;
  });

  return (
    <div className="p-6 mt-20">
      <h1 className="text-5xl font-bold mb-4">Gerenciamento de chamados</h1>

      {/* Barra de Pesquisa e Filtros */}
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
              {tipo.titulo.charAt(0).toUpperCase() + tipo.titulo.slice(1).replace('_', ' ')} {/* Formata o título */}
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

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-500"
        >
          + Novo Chamado
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filteredChamados.length > 0 ? (
          filteredChamados.map((chamado) => (
            <ChamadoCard
              key={chamado.id}
              chamado={chamado}
              onClick={() => setSelectedChamado(chamado)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">Nenhum chamado encontrado.</p>
        )}
      </div>

      <ModalEditarChamado
        isOpen={!!selectedChamado}
        onClose={() => setSelectedChamado(null)}
        chamado={selectedChamado}
        onUpdate={fetchChamados} // Garante que a lista seja atualizada após edição/exclusão
      />

      <ModalCreateChamado
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={fetchChamados} // Garante que a lista seja atualizada após criação
        tecnicos={tecnicos}
        tipos={tipos} // Passa os tipos para o modal de criação
      />
    </div>
  );
}