import { Router } from "express";
import { getExplanation } from "../controllers/explainController";

const router = Router();

router.post("/", getExplanation);

export default router;
