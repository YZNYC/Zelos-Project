import model from '../models/modelUsuario.js';
import bcrypt from 'bcrypt';

// Cadastrar novo técnico
export async function cadastrarTecnicoController(req, res) {
  const { nome, numeroUsuario, senha } = req.body;

  if (!nome || !numeroUsuario || !senha)
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });

  try {
    const existing = await model.buscarUsuarioPorNumero(numeroUsuario);
    if (existing) return res.status(400).json({ error: 'Número de usuário já cadastrado' });

    const hash = await bcrypt.hash(senha, 10);

    const tecnicoId = await model.criarUsuarioModel({
      nome,
      numeroUsuario,
      senha: hash,
      funcao: 'tecnico'
    });

    res.status(201).json({ id: tecnicoId, nome, numeroUsuario, funcao: 'tecnico' });
  } catch (error) {
    console.error('Erro ao cadastrar técnico:', error);
    res.status(500).json({ error: 'Erro ao cadastrar técnico' });
  }
}

// Listar técnicos
export async function listarTecnicosController(req, res) {
  try {
    const tecnicos = await model.listarTecnicosModel();
    res.json(tecnicos);
  } catch (error) {
    console.error('Erro ao listar técnicos:', error);
    res.status(500).json({ error: 'Erro ao listar técnicos' });
  }
}
