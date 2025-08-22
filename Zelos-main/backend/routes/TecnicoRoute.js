import { Router } from "express";
import AuthMiddleware from "../middlewares/authMiddleware.js";
import {
  atualizarChamadoController,
  criarApontamentoController,
  listarChamadoIdController,
  listarChamadosController
} from "../controllers/TecnicoController.js";

const router = Router();

// Apenas TÉCNICO pode acessar
router.use(AuthMiddleware('tecnico'));

router.get('/chamados', listarChamadosController);
router.get('/chamados/:id', listarChamadoIdController);
router.put('/chamados/:id', atualizarChamadoController);
router.post('/apontamentos', criarApontamentoController);

export default router;
