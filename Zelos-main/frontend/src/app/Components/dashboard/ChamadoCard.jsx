'use client';

export default function ChamadoCard({ chamado, onClick }) {
  const statusColor = {
    "pendente": "bg-red-200 text-red-800",
    "em andamento": "bg-yellow-200 text-yellow-800",
    "concluido": "bg-green-200 text-green-800",
  };

  // Formata a data (assume que chamado.data_criacao existe no backend)
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const d = new Date(dateString);
    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  return (
    <div
      onClick={onClick}
      className="border p-4 rounded-xl cursor-pointer hover:shadow-lg"
    >
      <div className={`inline-block px-2 py-1 rounded-lg ${statusColor[chamado.status] || "bg-gray-200 text-gray-800"}`}>
        {chamado.status || "pendente"}
      </div>
      <h3 className="font-bold mt-2">{chamado.titulo}</h3>
      <p>Protocolo: {chamado.id}</p>
      <p>Prioridade: {chamado.prioridade || "-"}</p>
      <p>Técnico: {chamado.tecnico?.nome || "-"}</p>
      <p>Data: {formatDate(chamado.data_criacao)}</p>
    </div>
  );
}
