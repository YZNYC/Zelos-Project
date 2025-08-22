import model from '../models/modelAdmin.js';

// Listar todos usuários
export async function listarUsuariosController(req, res) {
  try {
    const usuarios = await model.listarUsuariosModel();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar usuários.' });
  }
}

// Listar usuário por ID
export async function listarUsuarioIdController(req, res) {
  const { id } = req.params;
  try {
    const usuario = await model.listarUsuariosIdModel(id);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado.' });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário pelo ID.' });
  }
}

// Criar usuário
export async function criarUsuarioController(req, res) {
  try {
    const data = req.body;
    const usuarioCriado = await model.criarUsuarioModel(data);
    res.status(201).json({ id: usuarioCriado, ...data });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
}

// Criar chamado
export async function criarChamadoController(req, res) {
  try {
    const data = req.body;
    const chamadoCriado = await model.criarChamadoModel(data);
    res.status(201).json({ id: chamadoCriado, ...data });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar chamado.' });
  }
}

// Atualizar chamado
export async function atualizarChamadoController(req, res) {
  const { id } = req.params;
  const data = req.body;
  try {
    const resultado = await model.atualizarChamadoModel(id, data);
    if (resultado === 0) return res.status(404).json({ error: 'Chamado não encontrado.' });
    res.status(200).json({ message: 'Chamado atualizado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar chamado.' });
  }
}

// Listar todos chamados
export async function listarChamadosController(req, res) {
  try {
    const chamados = await model.listarChamadosModel();
    res.status(200).json(chamados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar chamados.' });
  }
}

// Listar chamado por ID
export async function listarChamadoIdController(req, res) {
  const { id } = req.params;
  try {
    const chamado = await model.listarChamadosIdModel(id);
    if (!chamado) return res.status(404).json({ error: 'Chamado não encontrado.' });
    res.status(200).json(chamado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar chamado pelo ID.' });
  }
}

// Deletar chamado
export async function deletarChamadoController(req, res) {
  const { id } = req.params;
  try {
    const resultado = await model.deletarChamadoModel(id);
    if (resultado === 0) return res.status(404).json({ error: 'Chamado não encontrado.' });
    res.status(200).json({ message: 'Chamado deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar chamado.' });
  }
}
