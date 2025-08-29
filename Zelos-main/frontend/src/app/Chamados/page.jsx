"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import ChamadoCard from "../Components/dashboard/ChamadoCard";
import ModalEditarChamado from "../Components/Modals/ModalEditarChamado";
import ModalCreateChamado from "../Components/Modals/ModalCriarChamado";

export default function Chamados() {
  const [chamados, setChamados] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [selectedChamado, setSelectedChamado] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const API = "http://localhost:8080/api/chamados";

  // Carregar dados ao iniciar
  useEffect(() => {
    fetchChamados();
    fetchTecnicos();
  }, []);

  const fetchChamados = async () => {
    const res = await axios.get(API);
    setChamados(res.data);
  };

  const fetchTecnicos = async () => {
    const res = await axios.get(`${API}/tecnicos`);
    setTecnicos(res.data);
  };

  const handleCreate = async (novoChamado) => {
    await axios.post(API, novoChamado);
    fetchChamados();
  };

  const handleSave = async (chamadoAtualizado) => {
    await axios.put(`${API}/${chamadoAtualizado.id}`, chamadoAtualizado);
    fetchChamados();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchChamados();
  };

  return (
    <div className="p-6 mt-20">
      <h1 className="text-5xl font-bold mb-4">Gerenciamento de chamados</h1>

      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-500 mt-6"
      >
        + Novo Chamado
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {chamados.map((chamado) => (
          <ChamadoCard
            key={chamado.id}
            chamado={chamado}
            onClick={() => setSelectedChamado(chamado)}
          />
        ))}
      </div>

      <ModalEditarChamado
        isOpen={!!selectedChamado}
        onClose={() => setSelectedChamado(null)}
        chamado={selectedChamado}
        onSave={handleSave}
        onDelete={handleDelete}
      />

      <ModalCreateChamado
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreate}
        tecnicos={tecnicos}
      />
    </div>
  );
}
