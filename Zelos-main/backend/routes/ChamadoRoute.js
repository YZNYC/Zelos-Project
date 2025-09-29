
import express from "express";
import {
  getChamados,
  createChamado,
  updateChamado,
  deleteChamado,
  getTecnicos,
  getTipos 
} from "../controllers/ChamadoController.js";

const router = express.Router();

router.get("/", getChamados);
router.post("/", createChamado);
router.put("/:id", updateChamado);
router.delete("/:id", deleteChamado);

router.get("/tecnicos", getTecnicos);
router.get("/tipos", getTipos); 

export default router;