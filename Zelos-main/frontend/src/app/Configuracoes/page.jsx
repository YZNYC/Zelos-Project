"use client";

import { useState, useEffect } from "react";
import ModalEditarConta from "../Components/Modals/ModalEditarConta";

export default function Configuracoes() {
    const [tema, setTema] = useState("claro");
    const [modalOpen, setModalOpen] = useState(false);
    const [user, setUser] = useState({ nome: "Roberto", email: "Roberto@Gmail.com" });

    useEffect(() => {
        const temaSalvo = localStorage.getItem("tema") || "claro";
        setTema(temaSalvo);
        document.documentElement.className = temaSalvo === "escuro" ? "dark" : "";
    }, []);

    const alterarTema = (novoTema) => {
        setTema(novoTema);
        localStorage.setItem("tema", novoTema);
        document.documentElement.className = novoTema === "escuro" ? "dark" : "";
    };

    const handleSaveUser = (dados) => {
        setUser(dados);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 transition-colors duration-300">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Configurações</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Card: Informações da conta */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Informações da conta</h2>
                    <label className="block mb-2 text-gray-700 dark:text-gray-200">Nome:</label>
                    <input
                        type="text"
                        value={user.nome}
                        className="w-full p-2 mb-4 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                        readOnly
                    />
                    <label className="block mb-2 text-gray-700 dark:text-gray-200">Email:</label>
                    <input
                        type="email"
                        value={user.email}
                        className="w-full p-2 mb-4 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                        readOnly
                    />
                </div>

                {/* Card: Notificações */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow w-182">
                    <h2 className="text-4xl font-semibold mb-8 text-gray-800 dark:text-gray-100">Notificações</h2>

                    <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-700 dark:text-gray-200 text-xl">Novos chamados</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-15 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:bg-gray-700 transition-colors"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md peer-checked:translate-x-9 transition-transform"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-700 dark:text-gray-200 text-xl">Respostas ao chamados</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-15 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:bg-gray-700 transition-colors"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md peer-checked:translate-x-9 transition-transform"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-200 text-xl">Chamados encerrados</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                           <div className="w-15 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:bg-gray-700 transition-colors"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md peer-checked:translate-x-9 transition-transform"></div>
                        </label>
                    </div>
                </div>


                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Linguagem</h2>
                    <select className="w-full p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 cursor-pointer">
                        <option>Português</option>
                        <option>English</option>
                    </select>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Tema</h2>
                    <div className="flex gap-4">
                        <button
                            onClick={() => alterarTema("claro")}
                            className={`w-full p-2 rounded border ${tema === "claro" ? "border-red-500" : "border-gray-400"} text-gray-800 dark:text-gray-100 cursor-pointer`}
                        >
                            Claro
                        </button>
                        <button
                            onClick={() => alterarTema("escuro")}
                            className={`w-full p-2 rounded border ${tema === "escuro" ? "border-red-500" : "border-gray-400"} text-gray-800 dark:text-gray-100 cursor-pointer`}
                        >
                            Escuro
                        </button>
                    </div>
                </div>

            </div>

            {/* Modal para edição de conta */}
            <ModalEditarConta
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveUser}
                user={user}
            />
        </div>
    );
}
