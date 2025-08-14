import model from '../models/modelTecnico.js'

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

// Criar apontamento
export async function criarApontamentoController(req, res) {
    try {
        const data = req.body;
        const createApontamento = await model.criarApontamentoModel(data);
        res.status(201).json(createApontamento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar apontamento.' })
    }
};

// Listar chamados ativos
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

// Listar chamados
export async function listarChamadosController(req, res) {
    try {
        const chamados = await model.listarChamadosModel();
        res.status(200).json(chamados);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar chamados.' });
    }
};