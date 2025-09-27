"use client";
import CardShell from "./CardShell";

// rows: [{ protocolo, descricao, status, dataAbertura, tecnico, tecnicoId, userId }]
export default function CardTableRecent({ title = "Chamados recentes", rows = [], funcao, userId, onUpdateStatus }) {

  const handleStatusChange = (chamado, novoStatus) => {
    if (onUpdateStatus) onUpdateStatus(chamado.id, novoStatus);
  };

  return (
    <CardShell title={title} className="h-[460px]">
      <div className="h-[380px] overflow-y-auto pr-2">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-gray-100 z-10">
            <tr className="text-gray-500 border-b">
              <th className="py-2 text-left font-medium">Protocolo</th>
              <th className="py-2 text-left font-medium">Descrição</th>
              <th className="py-2 text-left font-medium">Status</th>
              <th className="py-2 text-left font-medium">Data de abertura</th>
              <th className="py-2 text-left font-medium">Técnico responsável</th>
              {funcao === "tecnico" && <th className="py-2 text-left font-medium">Ações</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const canEdit = funcao === "tecnico" && r.tecnicoId === userId;
              return (
                <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-2 font-medium text-gray-800">{r.protocolo}</td>
                  <td className="py-2 text-gray-700">{r.descricao}</td>
                  <td className="py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold inline-block ${
                        r.status === "pendente"
                          ? "bg-red-100 text-[#ED1C24]"
                          : r.status === "em andamento"

                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {r.status === "pendente"
                        ? "Pendente"
                        : r.status === "em andamento"
                        ? "Em andamento"
                        : "Concluído"}
                    </span>
                  </td>
                  <td className="py-2 text-gray-700">{r.dataAbertura}</td>
                  <td className="py-2 text-gray-700">{r.tecnico}</td>
                  {funcao === "tecnico" && (
                    <td className="py-2">
                      {canEdit ? (
                        <select
                          className="border px-2 py-1 rounded text-sm"
                          value={r.status}
                          onChange={(e) => handleStatusChange(r, e.target.value)}
                        >
                          <option value="pendente">Pendente</option>
                          <option value="em andamento">Em andamento</option>
                          <option value="concluído">Concluído</option>
                        </select>
                      ) : (
                        <span className="text-gray-400 text-sm">Sem permissão</span>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </CardShell>
  );
}
