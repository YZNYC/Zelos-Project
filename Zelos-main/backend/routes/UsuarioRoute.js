import { Router } from "express";
import { criarChamadoController, listarChamadoIdController } from "../controllers/UsuarioController.js";

const router = Router();

router.post('/chamados', criarChamadoController);
router.get('/chamados/:id', listarChamadoIdController);

export default router;