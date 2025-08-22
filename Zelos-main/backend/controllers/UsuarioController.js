import model from '../models/modelUsuario.js';

// Criar chamado
export async function criarChamadoController(req, res) {
  try {
    const data = { ...req.body, usuario_id: req.usuario.id };
    const chamadoCriado = await model.criarChamadoModel(data);
    res.status(201).json({ id: chamadoCriado, ...data });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar chamado.' });
  }
}

// Listar chamado por ID (somente do próprio usuário)
export async function listarChamadoIdController(req, res) {
  const { id } = req.params;
  const usuarioID = req.usuario.id;
  try {
    const chamado = await model.listarChamadoPorIdModel(id, usuarioID);
    if (!chamado) return res.status(404).json({ error: 'Chamado não encontrado ou não autorizado.' });
    res.status(200).json(chamado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar chamado pelo ID.' });
  }
}
import model from '../models/modelUsuario.js';

// Criar chamado
export async function criarChamadoController(req, res) {
  try {
    const data = { ...req.body, usuario_id: req.usuario.id };
    const chamadoCriado = await model.criarChamadoModel(data);
    res.status(201).json({ id: chamadoCriado, ...data });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar chamado.' });
  }
}

// Listar chamado por ID (somente do próprio usuário)
export async function listarChamadoIdController(req, res) {
  const { id } = req.params;
  const usuarioID = req.usuario.id;
  try {
    const chamado = await model.listarChamadoPorIdModel(id, usuarioID);
    if (!chamado) return res.status(404).json({ error: 'Chamado não encontrado ou não autorizado.' });
    res.status(200).json(chamado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar chamado pelo ID.' });
  }
}
