'use client';

export default function ChamadoCard({ chamado, onClick }) {
  const statusColor = {
    "Em aberto": "bg-red-200 text-red-800",
    "Em andamento": "bg-yellow-200 text-yellow-800",
    "Finalizado": "bg-green-200 text-green-800",
  };

  return (
    <div
      onClick={onClick}
      className="border p-4 rounded-xl cursor-pointer hover:shadow-lg"
    >
      <div className={`inline-block px-2 py-1 rounded-lg ${statusColor[chamado.status]}`}>
        {chamado.status}
      </div>
      <h3 className="font-bold mt-2">{chamado.titulo}</h3>
      <p>Protocolo: {chamado.protocolo}</p>
      <p>Prioridade: {chamado.prioridade}</p>
      <p>Técnico: {chamado.tecnico}</p>
      <p>Data: {chamado.data}</p>
    </div>
  );
}
