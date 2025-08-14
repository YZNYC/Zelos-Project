import model from '../models/modelAdmin.js';

// Listar usuarios
export async function listarUsuariosController(req, res) {
    try {
        const usuarios = await model.listarUsuariosModel();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar usuários.' });
    }
};

// Listar usuario Id
export async function listarUsuario IdController(req, res) {
    const { id } = req.params;
    try {
        const usuario = await model.listarUsuarioPorIdModel(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario não encontrado.' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuario pelo ID.' });
    }
};

// Criar usuario
export async function criarUsuarioController(req, res) {
    try {
        const data = req.body;
        const createUsuario = await model.criarUsuarioModel(data);
        res.status(201).json(createUsuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar usuario.' });
    }
};

// Criar chamado
export async function criarChamadoController(req, res) {
    try {
        const data = req.body;
        const createChamado = await model.criarChamadoModel(data);
        res.status(201).json(createChamado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar chamado.' })
    }
};

// Atualizar chamado
export async function atualizarChamadoController(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
        const result = await model.atualizarChamadoModel(id, data);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Chamado não encontrado.' });
        }
        res.status(200).json({ message: 'Chamado atualizado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar chamado.' });
    }
};

// Listar chamados
export async function listarChamadosController(req, res) {
    try {
        const chamados = await model.listarChamadosModel();
        res.status(200).json(chamados);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar chamados.' });
    }
};

// Listar chamados id
export async function listarChamadoIdController(req, res) {
    const { id } = req.params;
    try {
        const chamado = await model.listarChamadoPorIdModel(id);
        if (!chamado) {
            return res.status(404).json({ error: 'Chamado não encontrado.' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar Chamado pelo ID.' });
    }
};




