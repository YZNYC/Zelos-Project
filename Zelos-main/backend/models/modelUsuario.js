import { create, read, readAll } from "../config/database.js";

// === Chamados do usuário ===
async function criarChamadoModel(data) {
  return await create('chamados', data);
}
async function listarChamadoPorIdModel(id, usuarioID) {
  return await read('chamados', 'id = ? AND usuario_id = ?', [id, usuarioID]);
}

// === Usuários / Técnicos ===
async function buscarUsuarioPorNumero(numeroUsuario) {
  const usuario = await read('usuarios', 'numeroUsuario = ?', [numeroUsuario]);
  return usuario;
}

async function criarUsuarioModel(data) {
  return await create('usuarios', data);
}

async function listarTecnicosModel() {
  return await readAll('usuarios', 'funcao = ?', ['tecnico']);
}

export default {
  criarChamadoModel,
  listarChamadoPorIdModel,
  buscarUsuarioPorNumero,
  criarUsuarioModel,
  listarTecnicosModel
};
