"use client";
import { useState } from "react";
import ChamadoCard from "../Components/dashboard/ChamadoCard";
import ModalEditarChamado from "../Components/Modals/ModalEditarChamado";

export default function Dashboard() {
  const [chamados, setChamados] = useState([
    { id: 1, protocolo: "8179247921", status: "Em aberto", descricao: "DataShow", data: "03/05/25", tecnico: "Rogério Amilton" },
    { id: 2, protocolo: "9179247911", status: "Em andamento", descricao: "Computador", data: "23/07/25", tecnico: "Manuel Vanderlei" },
    { id: 3, protocolo: "7179247944", status: "Finalizado", descricao: "Pacote Office", data: "10/06/25", tecnico: "Marcelo Gramado" },
  ]);

  const [selectedChamado, setSelectedChamado] = useState(null);

  const handleSave = (updatedChamado) => {
    const novosChamados = chamados.map(c =>
      c.id === updatedChamado.id ? updatedChamado : c
    );
    setChamados(novosChamados);
  };

  return (
    <div className="p-6 mt-20">
      <h1 className="text-5xl font-bold mb-4">Gerenciamento de chamados</h1>

      <div className="flex flex-col md:flex-row md:items-center mb-6 gap-4 mt-10">
        <input
          type="text"
          placeholder="Buscar por protocolos ou descrição"
          className="flex-1 border border-gray-300 rounded px-4 py-2"
        />
        <select className="border border-gray-300 rounded px-2 py-2 cursor-pointer">
          <option>Status</option>
          <option>Em aberto</option>
          <option>Em andamento</option>
          <option>Finalizado</option>
        </select>
        <select className="border border-gray-300 rounded px-2 py-2 cursor-pointer">
          <option>Tipos</option>
        </select>
        <button className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-500">+ Novo Chamado</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {chamados.map((chamado) => (
          <ChamadoCard
            key={chamado.id}
            chamado={chamado}
            onClick={() => setSelectedChamado(chamado)}
          />
        ))}
      </div>

      {/* Aqui colocamos o modal */}
      <ModalEditarChamado
        isOpen={!!selectedChamado}
        onClose={() => setSelectedChamado(null)}
        chamado={selectedChamado}
        onSave={handleSave}
      />
    </div>
  );
}
