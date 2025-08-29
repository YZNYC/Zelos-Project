// Components/Modals/ModalEditarChamado.js
'use client';
import { useState, useEffect } from "react";
import axios from "axios";

export default function ModalEditarChamado({ isOpen, onClose, chamado, onUpdate }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoId, setTipoId] = useState("");
  const [status, setStatus] = useState("pendente");
  const [prioridade, setPrioridade] = useState("Baixa"); // Estado para prioridade
  const [tecnicoId, setTecnicoId] = useState("");
  const [tecnicos, setTecnicos] = useState([]);
  const [tipos, setTipos] = useState([]);

  const API = "http://localhost:8080/api";

  useEffect(() => {
    if (isOpen) {
      axios.get(`${API}/chamados/tecnicos`)
        .then(res => setTecnicos(res.data))
        .catch(err => console.error("Erro ao buscar técnicos:", err));

      axios.get(`${API}/chamados/tipos`)
        .then(res => setTipos(res.data))
        .catch(err => console.error("Erro ao buscar tipos:", err));
    }
  }, [isOpen]);

  useEffect(() => {
    // Este useEffect é crucial para preencher o modal com os dados do chamado selecionado
    if (chamado) {
      setTitulo(chamado.titulo || "");
      setDescricao(chamado.descricao || "");
      setTipoId(chamado.tipo_id?.toString() || ""); // Converte para string para o valor do select
      setStatus(chamado.status || "pendente");
      setPrioridade(chamado.prioridade || "Baixa"); // Garante que a prioridade inicial seja a do chamado
      setTecnicoId(chamado.tecnico_id?.toString() || ""); // Converte para string para o valor do select
    } else {
      // Resetar os estados se nenhum chamado estiver selecionado
      setTitulo("");
      setDescricao("");
      setTipoId("");
      setStatus("pendente");
      setPrioridade("Baixa");
      setTecnicoId("");
    }
  }, [chamado]); // Dependência em 'chamado' para re-executar quando o chamado muda

  if (!isOpen || !chamado) return null;

  const handleSave = async () => {
    const payload = {
      titulo,
      descricao,
      tipo_id: tipoId === "" ? null : Number(tipoId), // Envia null se vazio, Number se selecionado
      status,
      prioridade,
      tecnico_id: tecnicoId === "" ? null : Number(tecnicoId), // Envia null se vazio, Number se selecionado
    };
    console.log("Payload enviado para atualização:", payload);

    try {
      await axios.put(`${API}/chamados/${chamado.id}`, payload);
      onUpdate?.(); // Chama a função onUpdate do pai para recarregar a lista
      onClose();
    } catch (err) {
      console.error("Erro ao atualizar chamado:", err.response?.data || err);
      alert(err.response?.data?.error || "Erro desconhecido ao atualizar chamado");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/chamados/${chamado.id}`);
      onUpdate?.(); // Chama a função onUpdate do pai para recarregar a lista
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
        className="relative bg-gray-100 p-6 rounded-lg w-full max-w-md shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-lg cursor-pointer"
        >✕</button>

        <h2 className="text-center font-semibold mb-4 text-xl">
          Editar chamado - Protoc. {chamado.id}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Título</label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Descrição</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:ring-red-500 focus:border-red-500"
              rows="3"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Tipo de chamado</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg cursor-pointer bg-white focus:ring-red-500 focus:border-red-500"
              value={tipoId} // Controlado pelo estado tipoId
              onChange={e => setTipoId(e.target.value)}
            >
              <option value="">Selecione um tipo</option> {/* Opção para selecionar nenhum tipo */}
              {tipos.map(tipo => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.titulo.charAt(0).toUpperCase() + tipo.titulo.slice(1).replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Status</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg cursor-pointer bg-white focus:ring-red-500 focus:border-red-500"
              value={status} // Controlado pelo estado status
              onChange={e => setStatus(e.target.value)}
            >
              <option value="pendente">Pendente</option>
              <option value="em andamento">Em Andamento</option>
              <option value="concluido">Concluído</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Prioridade</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg cursor-pointer bg-white focus:ring-red-500 focus:border-red-500"
              value={prioridade} // Controlado pelo estado prioridade
              onChange={e => setPrioridade(e.target.value)}
            >
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Técnico responsável</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg cursor-pointer bg-white focus:ring-red-500 focus:border-red-500"
              value={tecnicoId} // Controlado pelo estado tecnicoId
              onChange={e => setTecnicoId(e.target.value)}
            >
              <option value="">Selecione um técnico</option> {/* Opção para selecionar nenhum técnico */}
              {tecnicos.map(tec => (
                <option key={tec.id} value={tec.id}>{tec.nome}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between gap-3 mt-6">
          <button
            onClick={handleSave}
            className="flex-1 bg-red-600 text-white p-2 rounded-lg cursor-pointer hover:bg-red-700 transition duration-200"
          >
            Salvar alterações
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 text-white p-2 rounded-lg cursor-pointer hover:bg-gray-600 transition duration-200"
          >
            Cancelar
          </button>
        </div>

        <button
          onClick={handleDelete}
          className="mt-4 w-full text-red-600 border border-red-600 p-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-red-50 transition duration-200"
        >
          🗑 Excluir chamado
        </button>
      </div>
    </div>
  );
}