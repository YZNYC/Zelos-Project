"use client";
import { useEffect } from "react";

export default function ModalCreateChamado({ isOpen, onClose, onSave }) {
    if (!isOpen) return null;

    // Fecha o modal ao clicar fora dele
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (e.target.id === "overlay") {
                onClose();
            }
        };
        window.addEventListener("click", handleOutsideClick);
        return () => window.removeEventListener("click", handleOutsideClick);
    }, [onClose]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            titulo: e.target.titulo.value,
            descricao: e.target.descricao.value,
            prioridade: e.target.prioridade.value,
        };
        onSave(data);
        onClose();
    };

    return (
        <div
            id="overlay"
            className="fixed inset-0 bg-gray-900/90 flex items-center justify-center z-50"
        >
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
                {/* Botão de fechar */}
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
                            <option value="baixa">TI</option>
                            <option value="média">Manutenção</option>
                            <option value="alta">Limpeza</option>
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
                            <option value="baixa">Baixa</option>
                            <option value="média">Média</option>
                            <option value="alta">Alta</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Técnico
                        </label>
                        <textarea
                            name="Técnico"
                            rows="1"
                            required
                            className="mt-1 block w-100 resize-none border border-gray-300 rounded-lg p-2"
                        />
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
