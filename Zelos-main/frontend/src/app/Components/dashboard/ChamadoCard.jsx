// Components/dashboard/ChamadoCard.js
'use client';

export default function ChamadoCard({ chamado, onClick }) {
  const statusColor = {
    pendente: 'bg-red-200 text-red-800',
    'em andamento': 'bg-yellow-200 text-yellow-800',
    concluido: 'bg-green-200 text-green-800',
  };

  const priorityColor = {
    Baixa: 'text-green-600',
    Média: 'text-orange-600', // Você pode ajustar o tom de laranja
    Alta: 'text-red-600',
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const d = new Date(dateString);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // Os nomes já vêm do backend, e o backend já formata o tipo_nome
  const tipoNome = chamado.tipo_nome || '-'; // O backend já deve enviar formatado
  const tecnicoNome = chamado.tecnico_nome || '-';
  const dataCriacao = chamado.criado_em || '-';
  const prioridade = chamado.prioridade || 'Baixa'; // Usar prioridade que vem do backend

  return (
    <div
      onClick={onClick}
      className="border p-4 rounded-xl cursor-pointer hover:shadow-lg bg-white"
    >
      <div className="flex justify-between items-start mb-2">
        {/* Status */}
        <div className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${statusColor[chamado.status] || 'bg-gray-200 text-gray-800'}`}>
          {chamado.status.charAt(0).toUpperCase() + chamado.status.slice(1)}
        </div>
        {/* Prioridade */}
        <div className={`inline-block px-3 py-1 text-sm font-semibold rounded-full border ${priorityColor[prioridade]} border-${priorityColor[prioridade].split('-')[1]}-400`}>
          {prioridade}
        </div>
      </div>

      <h3 className="font-bold text-lg mt-2">{chamado.titulo}</h3>
      <p className="text-sm text-gray-600">Protocolo: <span className="font-medium">{chamado.id}</span></p>
      <p className="text-sm text-gray-600">Tipo: <span className="font-medium">{tipoNome}</span></p> {/* Usa o tipo_nome já formatado do backend */}
      <p className="text-sm text-gray-600">Técnico: <span className="font-medium">{tecnicoNome}</span></p>
      <p className="text-sm text-gray-600">Data: <span className="font-medium">{formatDate(dataCriacao)}</span></p>
    </div>
  );
}