import { create, readAll } from "../config/database.js"


// Criar Chamado
async function criarChamado(data) {
    return await create('chamados', data);
}

// listar Chamado
async function listarChamados(id) {
    return await readAll('chamados', `usuario_id = ${id}`);
}

export default { criarChamado, listarChamados };