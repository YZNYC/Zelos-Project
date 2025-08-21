import { create, readAll, read, update, deleteRecord } from '../config/database.js';

// Usuários
async function listarUsuariosModel() {
  return await readAll('usuarios');
}
async function listarUsuariosIdModel(id) {
  return await read('usuarios', 'id = ?', [id]);
}
async function criarUsuarioModel(data) {
  return await create('usuarios', data);
}

// Chamados
async function criarChamadoModel(data) {
  return await create('chamados', data);
}
async function atualizarChamadoModel(id, data) {
  return await update('chamados', data, 'id = ?', [id]);
}
async function listarChamadosModel() {
  return await readAll('chamados');
}
async function listarChamadosIdModel(id) {
  return await read('chamados', 'id = ?', [id]);
}
async function deletarChamadoModel(id) {
  return await deleteRecord('chamados', 'id = ?', [id]);
}

export default {
  listarUsuariosModel,
  listarUsuariosIdModel,
  criarUsuarioModel,
  criarChamadoModel,
  listarChamadosModel,
  listarChamadosIdModel,
  deletarChamadoModel,
  atualizarChamadoModel
};
