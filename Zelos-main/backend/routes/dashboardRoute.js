import express from "express";
import { 
  getDashboardCounters,
  getDashboardPie,
  getDashboardLine,
  getDashboardRecent
} from "../controllers/DashboardController.js";

const router = express.Router();

router.get("/counters", getDashboardCounters);
router.get("/pie", getDashboardPie);
router.get("/line", getDashboardLine);
router.get("/recent", getDashboardRecent);

export default router;
