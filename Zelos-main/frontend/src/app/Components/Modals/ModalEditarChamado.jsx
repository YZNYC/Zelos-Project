

'use client';
import { useState, useEffect } from "react";
import axios from "axios";

export default function ModalEditarChamado({ isOpen, onClose, chamado, onUpdate }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoId, setTipoId] = useState("");       // ID do tipo
  const [status, setStatus] = useState("pendente");
  const [tecnicoId, setTecnicoId] = useState(""); // ID do técnico
  const [tecnicos, setTecnicos] = useState([]);
  const [tipos, setTipos] = useState([]);

  const API = "http://localhost:8080/api";

  // Carrega técnicos e tipos do backend quando o modal abre
  useEffect(() => {
    if (isOpen) {
      axios.get(`${API}/chamados/tecnicos`)
        .then(res => setTecnicos(res.data))
        .catch(err => console.error("Erro ao buscar técnicos:", err));

      axios.get(`${API}/chamados/tipos`) // endpoint que retorna todos os tipos (pool)
        .then(res => setTipos(res.data))
        .catch(err => console.error("Erro ao buscar tipos:", err));
    }
  }, [isOpen]);

  // Preenche os campos ao abrir
  useEffect(() => {
    if (chamado) {
      setTitulo(chamado.titulo || "");
      setDescricao(chamado.descricao || "");
      setTipoId(chamado.tipo_id || "");
      setStatus(chamado.status || "pendente");
      setTecnicoId(chamado.tecnico_id || "");
    }
  }, [chamado]);

  if (!isOpen || !chamado) return null;

  const handleSave = async () => {
  const payload = {
    titulo,
    descricao,
    tipo_id: tipoId ? Number(tipoId) : null,
    status,
    tecnico_id: tecnicoId ? Number(tecnicoId) : null,
  };
  console.log("Payload enviado:", payload);

  try {
    await axios.put(`${API}/chamados/${chamado.id}`, payload);
    onUpdate?.();
    onClose();
  } catch (err) {
    console.error("Erro ao atualizar chamado:", err.response?.data || err);
    alert(err.response?.data?.error || "Erro desconhecido ao atualizar chamado");
  }
};

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/chamados/${chamado.id}`);
      onUpdate?.();
      onClose();
    } catch (err) {
      console.error("Erro ao deletar chamado:", err);
    }
  };

  return (
    <div
      id="overlay"
      className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-100 p-6 rounded-lg w-96 shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-lg cursor-pointer"
        >✕</button>

        <h2 className="text-center font-semibold mb-4 text-lg">
          Editar chamado - Protoc. {chamado.id}
        </h2>

        <label className="block mb-2 font-medium">Título</label>
        <input
          className="w-full p-2 mb-4 border border-gray-400 rounded"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
        />

        <label className="block mb-2 font-medium">Descrição</label>
        <textarea
          className="w-full p-2 mb-4 border border-gray-400 rounded"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />

        <label className="block mb-2 font-medium">Tipo de chamado</label>
        <select
          className="w-full p-2 mb-4 border border-gray-400 rounded cursor-pointer bg-gray-100"
          value={tipoId}
          onChange={e => setTipoId(Number(e.target.value))}
        >
          <option value="">Selecione um tipo</option>
          {tipos.map(tipo => (
            <option key={tipo.id} value={tipo.id}>{tipo.titulo}</option>
          ))}
        </select>

        <label className="block mb-2 font-medium">Status</label>
        <select
          className="w-full p-2 mb-4 border border-gray-400 rounded cursor-pointer bg-gray-100"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="pendente">Pendente</option>
          <option value="em andamento">Em andamento</option>
          <option value="concluido">Concluído</option>
        </select>

        <label className="block mb-2 font-medium">Técnico responsável</label>
        <select
          className="w-full p-2 mb-4 border border-gray-400 rounded cursor-pointer bg-gray-100"
          value={tecnicoId}
          onChange={e => setTecnicoId(Number(e.target.value))}
        >
          <option value="">Selecione um técnico</option>
          {tecnicos.map(tec => (
            <option key={tec.id} value={tec.id}>{tec.nome}</option>
          ))}
        </select>

        <div className="flex justify-between gap-2 mt-4">
          <button
            onClick={handleSave}
            className="flex-1 bg-red-600 text-white p-2 rounded-md cursor-pointer hover:bg-red-500"
          >
            Salvar alterações
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 text-white p-2 rounded-md cursor-pointer hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>

        <button
          onClick={handleDelete}
          className="mt-4 w-full text-red-600 border border-red-600 p-2 rounded-md flex items-center justify-center gap-2 cursor-pointer hover:bg-red-100"
        >
          🗑 Excluir chamado
        </button>
      </div>
    </div>
  );
}