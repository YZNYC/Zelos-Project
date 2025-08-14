import model from "../models/modelUsuario.js"

// Criar Chamado
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