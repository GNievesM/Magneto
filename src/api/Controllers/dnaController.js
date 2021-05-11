import { RestoreObjectCommand } from "@aws-sdk/client-s3";
import dnaService from "../../services/DnaService.js"

export function checkDna(req, res) {
    const matrix = ["AAAAGA", "CAGTG", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]; //new dna(req.body);
    const service = new dnaService();
    try {
        const result = service.checkDna(matrix);
        res.status(result ? 200 : 403).send();
    } catch (err) {
        res.status(500).send("Invalid matrix");
    }
}

export async function dnaStats(req, res, next) {
    const service = new dnaService();
    try {
        const result = await service.dnaStats();
        res.status(200).send(JSON.stringify(result));
    } catch (error) {
        res.status(500).send(JSON.stringify(error.toString()));
    }
}