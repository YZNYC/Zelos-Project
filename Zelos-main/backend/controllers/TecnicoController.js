import model from '../models/modelTecnico.js';

// Atualizar chamado (somente chamado do técnico)
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

// Criar apontamento para chamado
export async function criarApontamentoController(req, res) {
  try {
    const data = req.body;
    const apontamentoCriado = await model.criarApontamentoModel(data);
    res.status(201).json({ id: apontamentoCriado, ...data });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar apontamento.' });
  }
}

// Listar chamados do técnico
export async function listarChamadosController(req, res) {
  try {
    const tecnicoID = req.usuario.id;
    const chamados = await model.listarChamadosAtivoModel(tecnicoID);
    res.status(200).json(chamados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar chamados.' });
  }
}

// Listar chamado por ID (somente técnico responsável)
export async function listarChamadoIdController(req, res) {
  const { id } = req.params;
  const tecnicoID = req.usuario.id;
  try {
    const chamado = await model.listarChamadosAtivoModel(tecnicoID);
    const filtrado = chamado.find(c => c.id == id);
    if (!filtrado) return res.status(404).json({ error: 'Chamado não encontrado ou não autorizado.' });
    res.status(200).json(filtrado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar chamado pelo ID.' });
  }
}
