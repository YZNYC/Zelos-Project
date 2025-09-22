"use client";
import { useState, useEffect } from "react";
import { getApontamentos, addApontamento } from "../../services/api"; 

export default function ModalRelatorio({ relatorio, onClose }) {
  const [apontamentos, setApontamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [novoApontamento, setNovoApontamento] = useState("");

  const fetchApontamentos = async () => {
    try {
      setLoading(true);
      const response = await getApontamentos(relatorio.protocolo);
      setApontamentos(response.data);
      setError(null);
    } catch (err) {
      setError("Falha ao carregar apontamentos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (relatorio?.protocolo) {
      fetchApontamentos();
    }
  }, [relatorio]);

  const handleAdd = async () => {
    if (novoApontamento.trim() === "") return;

    const idUsuarioLogado = 1; // Ex: admin
    const agora = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const dadosApontamento = {
      descricao: novoApontamento,
      tecnico_id: idUsuarioLogado,
      comeco: agora, 
      fim: agora
    };

    try {
      await addApontamento(relatorio.protocolo, dadosApontamento);
      setNovoApontamento("");
      fetchApontamentos(); 
    } catch (err) {
      alert("Erro ao adicionar apontamento. Tente novamente.");
      console.error(err);
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
            <h2 className="text-2xl font-semibold mb-4">Relatório</h2>
            <p><strong>Protocolo:</strong> {relatorio.protocolo}</p>
            <p><strong>Técnico:</strong> {relatorio.tecnico}</p>
            <p><strong>Descrição do Chamado:</strong> {relatorio.descricao}</p>
          </div>
          <div>
            <h3 className="font-semibold mt-4">Adicionar Apontamento:</h3>
            <input
              type="text"
              value={novoApontamento}
              onChange={(e) => setNovoApontamento(e.target.value)}
              className="border rounded p-2 w-full mt-1"
              placeholder="Novo apontamento..."
            />
            <div className="flex gap-2 mt-3">
              <button onClick={onClose} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                Fechar
              </button>
              <button onClick={handleAdd} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500">
                Adicionar
              </button>
            </div>
          </div>
        </div>
        {/* Lado direito */}
        <div className="w-1/2 pl-6 border-l overflow-y-auto">
          <h3 className="text-xl font-semibold mb-3">Histórico de Apontamentos</h3>
          <div className="space-y-3 h-full pr-2">
            {loading && <p>Carregando...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && apontamentos.map((a) => (
              <div key={a.id} className="bg-gray-200 p-3 rounded">
                <p className="font-bold">{a.autor}</p>
                <p>{a.texto}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(a.criado_em).toLocaleString('pt-BR')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}