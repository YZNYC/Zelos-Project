import { update, create, readAll, readOne, query } from '../config/database.js';

// =====================
// Chamados
// =====================

async function atualizarChamadoModel(id, data, tecnicoID) {
  // só permite atualizar se o chamado pertence ao técnico
  const result = await query(
    'UPDATE chamados SET ? WHERE id = ? AND tecnico_id = ?',
    [data, id, tecnicoID]
  );
  return result.affectedRows;
}

async function listarChamadosAtivoModel(tecnicoID) {
  return await readAll('chamados', 'tecnico_id = ?', [tecnicoID]);
}

async function listarChamadoPorIdModel(id, tecnicoID) {
  const rows = await readAll('chamados', 'id = ? AND tecnico_id = ?', [id, tecnicoID]);
  return rows[0];
}

// =====================
// Apontamentos
// =====================

async function criarApontamentoModel(data) {
  return await create('apontamentos', data);
}

// =====================
// Dashboard
// =====================

async function getCountersByTecnico(tecnicoID) {
  const rows = await query(
    `SELECT
      SUM(status = 'aberto') AS abertos,
      SUM(status = 'andamento') AS andamento,
      SUM(status = 'finalizado') AS finalizados,
      AVG(tempo_resolucao) AS tempoMedioHoras
     FROM chamados
     WHERE tecnico_id = ?`,
    [tecnicoID]
  );
  return rows[0];
}

async function getPieDataByTecnico(tecnicoID) {
  const rows = await query(
    `SELECT status AS name, COUNT(*) AS value
     FROM chamados
     WHERE tecnico_id = ?
     GROUP BY status`,
    [tecnicoID]
  );
  return rows;
}

async function getLineDataByTecnico(tecnicoID) {
  const rows = await query(
    `SELECT DATE(data_criacao) AS date, COUNT(*) AS count
     FROM chamados
     WHERE tecnico_id = ?
     GROUP BY DATE(data_criacao)
     ORDER BY date ASC`,
    [tecnicoID]
  );
  return rows;
}

async function getMeusChamados(tecnicoID) {
  return await readAll('chamados', 'tecnico_id = ? ORDER BY data_criacao DESC LIMIT 10', [tecnicoID]);
}

async function getOutrosChamados(tecnicoID) {
  return await readAll('chamados', 'tecnico_id != ? ORDER BY data_criacao DESC LIMIT 10', [tecnicoID]);
}

// =====================
// Export
// =====================

export default {
  atualizarChamadoModel,
  criarApontamentoModel,
  listarChamadosAtivoModel,
  listarChamadoPorIdModel,
  getCountersByTecnico,
  getPieDataByTecnico,
  getLineDataByTecnico,
  getMeusChamados,
  getOutrosChamados
};
