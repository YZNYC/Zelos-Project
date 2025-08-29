"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ModalEditarChamado({ isOpen, onClose, chamado, onUpdate }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [status, setStatus] = useState("");
  const [tecnico, setTecnico] = useState("");
  const [tecnicos, setTecnicos] = useState([]);

  useEffect(() => {
    if (isOpen) {
      axios
        .get("http://localhost:8080/usuarios?funcao=tecnico")
        .then((res) => setTecnicos(res.data))
        .catch((err) => console.error("Erro ao buscar técnicos:", err));
    }
  }, [isOpen]);

  useEffect(() => {
    if (chamado) {
      setTitulo(chamado.titulo || "");
      setDescricao(chamado.descricao || "");
      setTipo(chamado.tipo || "");
      setPrioridade(chamado.prioridade || "");
      setStatus(chamado.status || "");
      setTecnico(chamado.tecnico_id || "");
    }
  }, [chamado]);

  if (!isOpen || !chamado) return null;

  const handleSave = async () => {
    try {
      const payload = { titulo, descricao, tipo, prioridade, status, tecnico_id: tecnico };
      await axios.put(`http://localhost:8080/chamados/${chamado.id}`, payload);
      onUpdate(); // função no componente pai para atualizar lista
      onClose();
    } catch (err) {
      console.error("Erro ao atualizar chamado:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/chamados/${chamado.id}`);
      onUpdate();
      onClose();
    } catch (err) {
      console.error("Erro ao deletar chamado:", err);
    }
  };

  return (
    <div
      id="overlay"
      className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50"
    >
      <div className="relative bg-gray-100 p-6 rounded-lg w-96 shadow-lg" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-lg cursor-pointer">✕</button>
        <h2 className="text-center font-semibold mb-4 text-lg">Editar chamado - Protoc. {chamado.id}</h2>

        <label className="block mb-2 font-medium">Título</label>
        <input className="w-full p-2 mb-4 border border-gray-400 rounded" value={titulo} onChange={(e) => setTitulo(e.target.value)} />

        <label className="block mb-2 font-medium">Descrição</label>
        <input className="w-full p-2 mb-4 border border-gray-400 rounded" value={descricao} onChange={(e) => setDescricao(e.target.value)} />

        <label className="block mb-2 font-medium">Tipo de chamado</label>
        <select className="w-full p-2 mb-4 border border-gray-400 rounded cursor-pointer bg-gray-100" value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="manutencao">Manutenção</option>
          <option value="limpeza">Limpeza</option>
          <option value="apoio_tecnico">Apoio Técnico</option>
        </select>

        <div className="flex justify-between mb-4 gap-4">
          <div>
            <label className="block font-medium">Prioridade</label>
            <div className="flex gap-2 mt-1">
              {["Baixa", "Média", "Alta"].map((p) => (
                <button key={p} type="button" onClick={() => setPrioridade(p)}
                  className={`px-2 py-1 border rounded cursor-pointer ${prioridade === p ? "bg-gray-700 text-white" : "bg-white"}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <label className="block font-medium">Status</label>
            <select className="w-full p-2 mt-1 border border-gray-400 rounded cursor-pointer bg-gray-100" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="pendente">Pendente</option>
              <option value="em andamento">Em andamento</option>
              <option value="concluido">Concluído</option>
            </select>
          </div>
        </div>

        <label className="block mb-2 font-medium">Técnico responsável</label>
        <select name="tecnico_id" value={tecnico} onChange={(e) => setTecnico(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-lg p-2 cursor-pointer" required>
          <option value="">Selecione um técnico</option>
          {tecnicos.map((tec) => (
            <option key={tec.id} value={tec.id}>{tec.nome}</option>
          ))}
        </select>

        <div className="flex justify-between gap-2 mt-4">
          <button onClick={handleSave} className="flex-1 bg-red-600 text-white p-2 rounded-md cursor-pointer hover:bg-red-500">Salvar alterações</button>
          <button onClick={onClose} className="flex-1 bg-gray-500 text-white p-2 rounded-md cursor-pointer hover:bg-gray-600">Cancelar</button>
        </div>

        <button onClick={handleDelete} className="mt-4 w-full text-red-600 border border-red-600 p-2 rounded-md flex items-center justify-center gap-2 cursor-pointer hover:bg-red-100">
          🗑 Excluir chamado
        </button>
      </div>
    </div>
  );
}
