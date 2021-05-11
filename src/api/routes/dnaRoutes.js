import express from "express";
import * as dnaController from "../controllers/dnaController.js";

const router = express.Router();

router.get("/stats", dnaController.dnaStats); 
router.get("/mutant", dnaController.checkDna); //todo cambiar a post.

export default router;