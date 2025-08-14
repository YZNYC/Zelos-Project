import { update, create, readAll } from "../config/database.js"

// Atualizar chmado
async function atualizarChamadoModel(id, data) {
    return await update('chamados', data, 'id = ?', [id])
};

// Criar Apontamentos
async function criarApontamentoModel(data) {
    return await create('apontamentos', data)
};

// Listar apenas chamados ativos
async function listarChamadosAtivoModel(tecnicoID) {
    return await readAll('chamados', 'tecnico_id = ?', [tecnicoID])
};

// Listar Chamado
async function listarChamadosModel(id) {
    return await readAll('chamados', 'usuario_id = ?', [id]);
};

export default { atualizarChamadoModel, criarApontamentoModel, listarChamadosAtivoModel, listarChamadosModel };