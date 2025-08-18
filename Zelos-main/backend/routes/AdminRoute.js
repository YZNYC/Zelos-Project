import { Router } from "express";
import { listarUsuariosController, listarUsuarioIdController, criarUsuarioController, criarChamadoController, atualizarChamadoController, listarChamadosController, listarChamadoIdController, deletarChamadoController} from "../controllers/AdminController.js";

const router = Router();


router.get('/usuarios', listarUsuariosController);
router.get('/usuarios/:id', listarUsuarioIdController);
router.post('/usuarios', criarUsuarioController);
router.get('/chamados', listarChamadosController);
router.get('/chamados/:id', listarChamadoIdController);
router.post('/chamados', criarChamadoController);
router.put('/chamados/:id', atualizarChamadoController);
router.delete('/chamados/:id', deletarChamadoController);

export default router;
