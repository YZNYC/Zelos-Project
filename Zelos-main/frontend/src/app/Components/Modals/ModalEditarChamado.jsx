'use client';
import { useState, useEffect } from 'react';

export default function ModalEditarChamado({ isOpen, onClose, chamado, onSave, onDelete }) {
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [status, setStatus] = useState('');
  const [tecnico, setTecnico] = useState('');

  useEffect(() => {
    if (chamado) {
      setDescricao(chamado.descricao || '');
      setTipo(chamado.tipo || '');
      setPrioridade(chamado.prioridade || '');
      setStatus(chamado.status || '');
      setTecnico(chamado.tecnico || '');
    }
  }, [chamado]);

  if (!isOpen || !chamado) return null;

  const handleSave = () => {
    onSave({ ...chamado, descricao, tipo, prioridade, status, tecnico });
    onClose();
  };

  const handleDelete = () => {
    if (onDelete) onDelete(chamado.id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900/90 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-100 p-6 rounded-md w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center font-semibold mb-4">
          Editar chamado - Protoc. {chamado.id}
        </h2>

        <label className="block mb-2 font-medium">Descrição</label>
        <input
          className="w-full p-2 mb-4 border border-gray-400 rounded"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <label className="block mb-2 font-medium">Tipo de chamado</label>
        <select
          className="w-full p-2 mb-4 border border-gray-400 rounded cursor-pointer bg-gray-100"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option>TI</option>
          <option>Manutenção</option>
          <option>Limpeza</option>
        </select>

        <div className="flex justify-between mb-4">
          <div>
            <label className="block font-medium">Prioridade</label>
            <div className="flex gap-2 mt-1">
              {["Baixa", "Média", "Alta"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPrioridade(p)}
                  className={`px-2 py-1 border rounded cursor-pointer ${
                    prioridade === p ? "bg-gray-700 text-white" : "bg-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium">Status</label>
            <select
              className="w-full p-2 mt-1 border border-gray-400 rounded cursor-pointer bg-gray-100"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Em aberto</option>
              <option>Em andamento</option>
              <option>Finalizado</option>
            </select>
          </div>
        </div>

        <label className="block mb-2 font-medium">Técnico responsável</label>
        <input
          className="w-full p-2 mb-4 border border-gray-400 rounded"
          value={tecnico}
          onChange={(e) => setTecnico(e.target.value)}
        />

        <div className="flex justify-between gap-2">
          <button
            onClick={handleSave}
            className="flex-1 bg-red-600 text-white p-2 rounded cursor-pointer hover:bg-red-500"
          >
            Salvar alterações
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 text-white p-2 rounded cursor-pointer hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>

        <button
          onClick={handleDelete}
          className="mt-4 w-full text-red-600 border border-red-600 p-2 rounded flex items-center justify-center gap-2 cursor-pointer hover:bg-red-100"
        >
          🗑 Excluir chamado
        </button>
      </div>
    </div>
  );
}
