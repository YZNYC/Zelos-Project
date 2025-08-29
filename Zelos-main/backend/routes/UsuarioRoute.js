import { Router } from "express";
import AuthMiddleware from "../middlewares/authMiddleware.js";
import { criarChamadoController, listarChamadoIdController, buscarUsuarioPorNumeroController} from "../controllers/UsuarioController.js";

const router = Router();
router.use(AuthMiddleware());

router.post('/chamados', criarChamadoController);
router.get('/chamados/:id', listarChamadoIdController);
router.get('/:numeroUsuario', buscarUsuarioPorNumeroController);

export default router;
