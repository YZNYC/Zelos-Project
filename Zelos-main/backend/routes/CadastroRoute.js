import express from 'express';
import { cadastrarTecnicoController, listarTecnicosController } from '../controllers/CadastroController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/usuarios', AuthMiddleware('admin'), cadastrarTecnicoController);
router.get('/tecnicos', AuthMiddleware('admin'), listarTecnicosController);

export default router;
