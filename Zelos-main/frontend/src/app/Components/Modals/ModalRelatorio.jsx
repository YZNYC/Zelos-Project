"use client";
export default function ModalRelatorio({ relatorio, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-900/90 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 text-lg hover:text-red-700 cursor-pointer"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-2">{relatorio.protocolo}</h2>
        <p><strong>Técnico:</strong> {relatorio.tecnico}</p>
        <p><strong>Descrição:</strong> {relatorio.descricao}</p>
        <p><strong>Tempo de Resolução:</strong> {relatorio.tempoResolucao}</p>
        <p><strong>Data:</strong> {relatorio.data}</p>
      </div>
    </div>
  );
}
