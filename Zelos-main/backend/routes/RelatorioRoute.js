import express from 'express';
import { getRelatorios, getApontamentosByRelatorioId, addApontamento } from '../controllers/RelatorioController.js';

const router = express.Router();

router.get('/', getRelatorios);
router.get('/:id/apontamentos', getApontamentosByRelatorioId);
router.post('/:id/apontamentos', addApontamento);

export default router;
