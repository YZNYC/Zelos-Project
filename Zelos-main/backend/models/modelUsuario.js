import { create, readAll } from "../config/database.js"


// Criar chamado
async function criarChamadoModel(data) {
    return await create('chamados', data)
};

// Listar chamado id
async function listarChamadosIdModel(id) {
    return await read('chamados', 'usuario_id = ?', [id])
};

export default { criarChamadoModel, listarChamadosIdModel };