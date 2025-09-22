"use client";
import { useState } from "react";

export default function ModalRelatorio({ relatorio, apontamentos, onAddApontamento, onClose }) {
  const [novoApontamento, setNovoApontamento] = useState("");

  const handleAdd = () => {
    if (novoApontamento.trim() !== "") {
      onAddApontamento(relatorio.id, novoApontamento);
      setNovoApontamento("");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900/90 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-[800px] h-[500px] flex">
        
        {/* Lado esquerdo */}
        <div className="w-1/2 flex flex-col justify-between pr-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Relatórios</h2>
            <p><strong>Protocolo:</strong> {relatorio.protocolo}</p>
            <p><strong>Técnico:</strong> {relatorio.tecnico}</p>
            <p>
              <strong>Descrição:</strong> {relatorio.descricao}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mt-4">Apontamentos:</h3>
            <input
              type="text"
              value={novoApontamento}
              onChange={(e) => setNovoApontamento(e.target.value)}
              className="border rounded p-2 w-full mt-1"
              placeholder="Novo apontamento"
            />

            <div className="flex gap-2 mt-3">
              <button
                onClick={onClose}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 cursor-pointer"
              >
                Fechar
              </button>
              <button
                onClick={handleAdd}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 cursor-pointer"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>

        {/* Lado direito */}
        <div className="w-1/2 pl-6 border-l overflow-y-auto">
          <div className="space-y-3 h-full pr-2">
            {apontamentos.map((a, i) => (
              <div key={i} className="bg-gray-300 p-3 rounded">
                <p><strong>ADMIN:</strong> NYCOLAS DE LIMA LEANDRO</p>
                <p><strong>Texto:</strong> {a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
