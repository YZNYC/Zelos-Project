import { create, readAll, read, update, deleteRecord } from '../config/database.js';

const listarChamados = async () => {
  try {
    return await readAll('chamados');
  } catch (error) {
    console.error('Erro ao listar chamados:', error);
    throw error;
  }
};

const obterChamadosPorId = async (id) => {
  try {
    return await read('chamados', `id = ${id}`);
  } catch (error) {
    console.error('Erro ao obter chamado por ID:', error);
    throw error;
  }
};

const criarChamado = async (ChamadoData) => {
  try {
    return await create('chamados', ChamadoData);
  } catch (error) {
    console.error('Erro ao criar Chamado:', error);
    throw error;
  }
};

const atualizarChamado = async (id, ChamadoData) => {
  try {
    await update('chamados', ChamadoData, `id = ${id}`);
  } catch (error) {
    console.error('Erro ao atualizar chamado:', error);
    throw error;
  }
};

const excluirChamado = async (id) => {
  try {
    await deleteRecord('chamados', `id = ${id}`);
  } catch (error) {
    console.error('Erro ao excluir chamado:', error);
    throw error;
  }
};

export { listarChamados, obterChamadosPorId, criarChamado, atualizarChamado, excluirChamado };