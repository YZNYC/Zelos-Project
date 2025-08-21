"use client";
import { useState } from "react";

export default function ModalEditarConta({ isOpen, onClose, onSave, user }) {
  const [nome, setNome] = useState(user?.nome || "");
  const [email, setEmail] = useState(user?.email || "");

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ nome, email });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 max-w-2xl p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Editar Conta</h2>
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-md bg-red-600 text-white hover:bg-red-500 cursor-pointer"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
