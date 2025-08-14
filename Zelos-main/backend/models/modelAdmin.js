import { create, readAll, read, update, deleteRecord } from '../config/database.js';

// Listar usuarios
async function listarUsuariosModel() {
    return await readAll('usuarios');
};

// Listar usuario ID
async function listarUsuariosIdModel(id) {
    return await read('usuarios', 'id = ?', [id])
};

// Criar usuario
async function criarUsuarioModel(data) {
    return await create('usuarios', data)
};

// Criar chamado
async function criarChamadoModel(data) {
    return await create('chamados', data)
};

// Atualizar chmado
async function atualizarChamadoModel(id, data) {
    return await update('chamados', data, 'id = ?', [id])
};

//Listar chamado
async function listarChamadosModel() {
    return await readAll ('chamados')
};

// Listar chamado id
async function listarChamadosIdModel(id) {
    return await read('chamados', 'usuario_id = ?', [id])
};

// Deletar chamado
async function deletarChamadoModel(id) {
    return await deleteRecord('chamados', 'id = ?', [id])
};

export default { listarUsuariosModel, listarUsuariosIdModel, criarUsuarioModel, criarChamadoModel, listarChamadosModel, listarChamadosIdModel, deletarChamadoModel, atualizarChamadoModel };