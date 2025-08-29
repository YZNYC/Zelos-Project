
'use client';

export default function ChamadoCard({ chamado, onClick }) {
  const statusColor = {
    pendente: 'bg-red-200 text-red-800',
    'em andamento': 'bg-yellow-200 text-yellow-800',
    concluido: 'bg-green-200 text-green-800',
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const d = new Date(dateString);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // Ajuste para os nomes que o backend retorna
  const tipoNome = chamado.tipo_nome || '-';
  const tecnicoNome = chamado.tecnico_nome || '-';
  const usuarioNome = chamado.usuario_nome || '-';
  const dataCriacao = chamado.criado_em || '-';

  return (
    <div
      onClick={onClick}
      className="border p-4 rounded-xl cursor-pointer hover:shadow-lg"
    >
      <div className={`inline-block px-2 py-1 rounded-lg ${statusColor[chamado.status] || 'bg-gray-200 text-gray-800'}`}>
        {chamado.status || 'pendente'}
      </div>
      <h3 className="font-bold mt-2">{chamado.titulo}</h3>
      <p>Protocolo: {chamado.id}</p>
      <p>Tipo: {chamado.tipo}</p>
      <p>Técnico: {chamado.tecnico}</p>
      <p>Data: {formatDate(dataCriacao)}</p>
    </div>
  );
}