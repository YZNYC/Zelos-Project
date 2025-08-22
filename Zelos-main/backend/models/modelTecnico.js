import { update, create, readAll } from '../config/database.js';

// Chamados
async function atualizarChamadoModel(id, data) {
  return await update('chamados', data, 'id = ?', [id]);
}

// Apontamentos
async function criarApontamentoModel(data) {
  return await create('apontamentos', data);
}

// Listar chamados do técnico
async function listarChamadosAtivoModel(tecnicoID) {
  return await readAll('chamados', 'tecnico_id = ?', [tecnicoID]);
}

export default {
  atualizarChamadoModel,
  criarApontamentoModel,
  listarChamadosAtivoModel
};
