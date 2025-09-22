"use client";
import { useState, useEffect } from "react";
import ModalRelatorio from "../Modals/ModalRelatorio";
import { getRelatorios } from "../../services/api"; 


const formatarDuracao = (segundos) => {
  if (!segundos) return "00:00:00";
  const h = Math.floor(segundos / 3600).toString().padStart(2, '0');
  const m = Math.floor((segundos % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(segundos % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};

export default function CardRelatorio() {
  const [relatorios, setRelatorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedRelatorio, setSelectedRelatorio] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRelatorios = async () => {
      try {
        setLoading(true);
        const response = await getRelatorios();
        setRelatorios(response.data);
        setError(null);
      } catch (err) {
        setError("Falha ao carregar relatórios.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatorios();
  }, []); 

  const abrirModal = (relatorio) => {
    setSelectedRelatorio(relatorio);
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setSelectedRelatorio(null);
    setIsModalOpen(false);
  };

  if (loading) return <p>Carregando relatórios...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="border p-2 rounded h-[600px] overflow-y-auto bg-gray-100">
      <ul className="space-y-2">
        {relatorios.map((r) => (
          <li
            key={r.protocolo}
            className="cursor-pointer p-3 bg-white rounded shadow-sm hover:bg-gray-50 flex justify-between"
            onClick={() => abrirModal(r)}
          >
            <div>
              <p><strong>Protocolo:</strong> {r.protocolo}</p>
              <p><strong>Técnico:</strong> {r.tecnico}</p>
            </div>
            <div className="text-right">
              <p><strong>Tempo:</strong> {formatarDuracao(r.tempoResolucaoSegundos)}</p>
              <p><strong>Data:</strong> {r.data}</p>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && selectedRelatorio && (
        <ModalRelatorio
          relatorio={selectedRelatorio}
          onClose={fecharModal}
        />
      )}
    </div>
  );
}