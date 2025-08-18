import { Router } from "express";
import { atualizarChamadoController, criarApontamentoController, listarChamadoIdController, listarChamadosController } from "../controllers/TecnicoController.js"

const router = Router();

router.put('/chamados/:id', atualizarChamadoController);
router.post('/chamados', criarApontamentoController);
router.get('/chamados/:id', listarChamadoIdController);
router.get('/chamados', listarChamadosController);

export default router;