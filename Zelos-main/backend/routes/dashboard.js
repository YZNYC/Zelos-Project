import { Router } from 'express';
import { pool } from '../config/database.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// --- Gráfico de linhas: chamados abertos x finalizados ---
router.get('/line', AuthMiddleware('usuario', 'tecnico', 'admin'), async (req, res) => {
  try {
    let sql = `
      SELECT DATE(criado_em) as name,
             SUM(status = 'pendente') as abertos,
             SUM(status = 'concluido') as finalizados
      FROM chamados
    `;

    if (req.usuario.tipo === 'usuario') {
      sql += ` WHERE usuario_id = ? GROUP BY DATE(criado_em) ORDER BY DATE(criado_em)`;
      const [rows] = await pool.query(sql, [req.usuario.id]);
      return res.json(rows);
    } else if (req.usuario.tipo === 'tecnico') {
      sql += ` WHERE tecnico_id = ? GROUP BY DATE(criado_em) ORDER BY DATE(criado_em)`;
      const [rows] = await pool.query(sql, [req.usuario.id]);
      return res.json(rows);
    }

    // Admin vê todos
    sql += ' GROUP BY DATE(criado_em) ORDER BY DATE(criado_em)';
    const [rows] = await pool.query(sql);
    res.json(rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar dados de linhas' });
  }
});

// --- Gráfico de pizza: chamados por tipo ---
router.get('/pie', AuthMiddleware('usuario', 'tecnico', 'admin'), async (req, res) => {
  try {
    let sql = `
      SELECT p.titulo as name, COUNT(c.id) as value
      FROM chamados c
      JOIN tipos_chamados p ON c.tipo_id = p.id
    `;

    if (req.usuario.tipo === 'usuario') sql += ` WHERE c.usuario_id = ? GROUP BY p.titulo`;
    else if (req.usuario.tipo === 'tecnico') sql += ` WHERE c.tecnico_id = ? GROUP BY p.titulo`;
    else sql += ' GROUP BY p.titulo';

    const [rows] = await pool.query(sql, req.usuario.tipo === 'admin' ? [] : [req.usuario.id]);
    res.json(rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar dados de pizza' });
  }
});

// --- Chamados recentes ---
router.get('/recent', AuthMiddleware('usuario', 'tecnico', 'admin'), async (req, res) => {
  try {
    let sql = `
      SELECT c.id as protocolo, c.descricao,
             CASE WHEN c.status = 'pendente' THEN 'Em aberto'
                  WHEN c.status = 'em andamento' THEN 'Em andamento'
                  ELSE 'Concluído'
             END as status,
             DATE_FORMAT(c.criado_em, '%d/%m/%Y %H:%i') as dataAbertura,
             u.nome as tecnico
      FROM chamados c
      LEFT JOIN usuarios u ON u.id = c.tecnico_id
    `;

    if (req.usuario.tipo === 'usuario') sql += ` WHERE c.usuario_id = ? ORDER BY c.criado_em DESC LIMIT 10`;
    else if (req.usuario.tipo === 'tecnico') sql += ` WHERE c.tecnico_id = ? ORDER BY c.criado_em DESC LIMIT 10`;
    else sql += ' ORDER BY c.criado_em DESC LIMIT 10';

    const [rows] = await pool.query(sql, req.usuario.tipo === 'admin' ? [] : [req.usuario.id]);
    res.json(rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar chamados recentes' });
  }
});

export default router;
