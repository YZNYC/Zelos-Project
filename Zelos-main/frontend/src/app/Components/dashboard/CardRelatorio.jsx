"use client";
import { useState } from "react";
import ModalRelatorio from "../Modals/ModalRelatorio";

export default function CardRelatorio({ relatorios }) {
  const [selectedRelatorio, setSelectedRelatorio] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // apontamentos locais { idRelatorio: ["comentário1", "comentário2"] }
  const [apontamentos, setApontamentos] = useState({});

  const abrirModal = (relatorio) => {
    setSelectedRelatorio(relatorio);
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setSelectedRelatorio(null);
    setIsModalOpen(false);
  };

  const adicionarApontamento = (id, comentario) => {
    setApontamentos((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), comentario],
    }));
  };

  return (
    <div className="border p-2 rounded h-[600px] overflow-y-auto bg-gray-100">
      <ul className="space-y-2">
        {relatorios.map((r) => (
          <li
            key={r.id}
            className="cursor-pointer p-3 bg-white rounded shadow-sm hover:bg-gray-50 flex justify-between"
            onClick={() => abrirModal(r)}
          >
            <div>
              <p><strong>Protocolo:</strong> {r.protocolo}</p>
              <p><strong>Técnico:</strong> {r.tecnico}</p>
              {apontamentos[r.id] && apontamentos[r.id].length > 0 && (
                <p className="text-sm text-gray-600">
                  Último apontamento: {apontamentos[r.id].slice(-1)}
                </p>
              )}
            </div>
            <div className="text-right">
              <p><strong>Tempo:</strong> {r.tempoResolucao}</p>
              <p><strong>Data:</strong> {r.data}</p>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && selectedRelatorio && (
        <ModalRelatorio
          relatorio={selectedRelatorio}
          apontamentos={apontamentos[selectedRelatorio.id] || []}
          onAddApontamento={adicionarApontamento}
          onClose={fecharModal}
        />
      )}
    </div>
  );
}
