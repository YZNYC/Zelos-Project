import express from "express";
import {
  getChamados,
  createChamado,
  updateChamado,
  deleteChamado,
  getTecnicos
} from "../controllers/ChamadoController.js";

const router = express.Router();

router.get("/", getChamados);
router.post("/", createChamado);
router.put("/:id", updateChamado);
router.delete("/:id", deleteChamado);
router.get("/tecnicos", getTecnicos);

export default router;
