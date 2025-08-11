import { update, create, readAll } from "../config/database.js"

// Atualizar Status do Chmado
async function atualizarChamado(id, data) {
    return await update('chamados', data, `id = ${id}`)
};

// Criar Apontamentos
async function criarApontamento(data) {
    return await create('apontamentos', data)
};

// Listar apenas chamados ativos
async function listarChamadosAtivo(tecnicoID) {
    return await readAll('chamados', `tecnico_id = ${tecnicoID}`)
}

// Listar Chamado
async function listarChamados(id) {
    return await readAll('chamados', `usuario_id = ${id}`);
}

export default {atualizarChamado, criarApontamento, listarChamadosAtivo};