import express from "express";
import * as dnaController from "../../controllers/dnaController.js.js";

const router = express.Router();

router.get("/stats", dnaController.dnaStats);
router.post("/mutant", dnaController.checkDna);

export default router;