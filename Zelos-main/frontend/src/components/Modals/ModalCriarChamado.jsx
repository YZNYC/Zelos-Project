// Components/Modals/ModalCriarChamado.js
"use client";
import { useEffect, useState } from "react";
import axios from "axios";

// Adicione `tecnicos` e `tipos` como props
export default function ModalCreateChamado({ isOpen, onClose, onCreate, tecnicos, tipos }) {
  // Remova o estado `tecnicos` local e o useEffect para buscar técnicos aqui
  // O estado `tecnicos` será passado via props

  if (!isOpen) return null;

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
    titulo: e.target.titulo.value,
    descricao: e.target.descricao.value,
    tipo_id: e.target.tipo.value,
    prioridade: e.target.prioridade.value,
    tecnico_id: e.target.tecnico_id.value,
  };

  try {
    const res = await axios.post("http://localhost:8080/api/chamados", data);
    const chamadoCriado = res.data;

    // Atualiza a dashboard diretamente
    if (typeof onCreate === "function") onCreate(chamadoCriado);

    onClose();
  } catch (err) {
    console.error("Erro ao criar chamado:", err.response?.data || err);
  }
};

  

  return (
    <div
      id="overlay"
      className="fixed inset-0 bg-gray-900/90 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-lg cursor-pointer"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Criar Novo Chamado</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Título*
            </label>
            <input
              type="text"
              name="titulo"
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descrição*
            </label>
            <textarea
              name="descricao"
              rows="3"
              required
              className="mt-1 block w-full border resize-none border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo
            </label>
            <select
              name="tipo"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 cursor-pointer"
            >
              {tipos.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.titulo.charAt(0).toUpperCase() + tipo.titulo.slice(1).replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Prioridade
            </label>
            <select
              name="prioridade"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 cursor-pointer"
            >
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Técnico
            </label>
            <select
              name="tecnico_id"
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 cursor-pointer"
            >
              <option value="">Selecione um técnico</option>
              {tecnicos.map((tec) => (
                <option key={tec.id} value={tec.id}>
                  {tec.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}