import pool from '../config/database.js'; 
import { create } from '../config/database.js';

export const getRelatorios = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const sql = `
            SELECT
                c.id AS protocolo,
                u.nome AS tecnico,
                c.descricao,
                DATE_FORMAT(c.criado_em, '%d/%m/%Y') AS data,
                SUM(a.duracao) AS tempoResolucaoSegundos
            FROM
                chamados c
            JOIN
                usuarios u ON c.tecnico_id = u.id
            LEFT JOIN
                apontamentos a ON c.id = a.chamado_id
            WHERE
                c.status = 'concluido'
            GROUP BY
                c.id, u.nome, c.descricao, data
            ORDER BY
                c.criado_em DESC;
        `;
        const [rows] = await connection.execute(sql);
        connection.release();
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao buscar relatórios:', error);
        res.status(500).json({ message: 'Erro interno no servidor ao buscar relatórios.' });
    }
};


export const getApontamentosByRelatorioId = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'ID do relatório é obrigatório.' });
    }

    try {
        const connection = await pool.getConnection();
        const sql = `
            SELECT
                a.id,
                a.descricao AS texto,
                u.nome AS autor,
                a.criado_em
            FROM
                apontamentos a
            JOIN
                usuarios u ON a.tecnico_id = u.id
            WHERE
                a.chamado_id = ?
            ORDER BY
                a.criado_em ASC;
        `;
        const [rows] = await connection.execute(sql, [id]);
        connection.release();
        res.status(200).json(rows);
    } catch (error) {
        console.error(`Erro ao buscar apontamentos para o relatório ${id}:`, error);
        res.status(500).json({ message: 'Erro interno no servidor ao buscar apontamentos.' });
    }
};



export const addApontamento = async (req, res) => {
    const { id } = req.params; 
    const { descricao, tecnico_id, comeco, fim } = req.body;

    if (!descricao || !tecnico_id || !comeco || !fim) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios: descricao, tecnico_id, comeco, fim.' });
    }

    try {
        const novoApontamento = {
            chamado_id: id,
            tecnico_id,
            descricao,
            comeco,
            fim
        };

        const insertId = await create('apontamentos', novoApontamento);
        res.status(201).json({ id: insertId, ...novoApontamento });
    } catch (error) {
        console.error(`Erro ao adicionar apontamento para o relatório ${id}:`, error);
        res.status(500).json({ message: 'Erro interno no servidor ao adicionar apontamento.' });
    }
};

