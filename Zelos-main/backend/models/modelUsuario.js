import { create, readAll, read } from "../config/database.js";

async function criarChamadoModel(data) {
  return await create('chamados', data);
}

async function listarChamadoPorIdModel(id, usuarioID) {
  return await read('chamados', 'id = ? AND usuario_id = ?', [id, usuarioID]);
}

export default {
  criarChamadoModel,
  listarChamadoPorIdModel
};
