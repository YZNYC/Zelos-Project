import { Router } from "express";
import AuthMiddleware from "../middlewares/authMiddleware.js";
import {
  criarChamadoController,
  listarChamadoIdController
} from "../controllers/UsuarioController.js";

const router = Router();

// Apenas USUÁRIO pode acessar
router.use(AuthMiddleware('usuario'));

router.post('/chamados', criarChamadoController);
router.get('/chamados/:id', listarChamadoIdController);

export default router;
