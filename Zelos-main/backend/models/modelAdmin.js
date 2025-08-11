import { create, readAll, read, update, deleteRecord} from '../config/database.js';

// Listar todos os usuaios
async function listarUsuarios() {
    return await readAll('usuarios')
};

// Listar usuarios por id
async function listarUsuariosid(id) {
    return await read('usuarios', `id = ${id}`)
};

// Criar um novo Usuario
async function criarUsuarios() {
    return await create('usuarios')
};

// Criar Chamado
async function criarChamado(data) {
    return await create('chamados', data);
}

// Atualizar Status do Chmado
async function atualizarChamado(id, data) {
    return await update('chamados', data, `id = ${id}`)
};

// Listar Chamado
async function listarChamados(id) {
    return await readAll('chamados', `usuario_id = ${id}`);
}

// Deletar Chamado
async function deletarChamado(id) {
    return await deleteRecord('chamados', `id = ${id}`)
}

export default { listarUsuarios, listarUsuariosid, criarUsuarios, criarChamado, listarChamados, deletarChamado, atualizarChamado };