import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { getDashboardStatsController } from "../controllers/dashboard.controller";
import {getDashboardDataController} from "../controllers/dashboard.controller";

const router = Router();

router.get("/stats", authenticate, getDashboardStatsController);
router.get("/data",authenticate,getDashboardDataController);

export default router;

