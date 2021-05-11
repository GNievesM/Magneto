import dnaService from "../services/DnaService.js"
import Dna from "../models/Dna.js"

export function checkDna(req, res) {
    console.log(req.body);
    try {
        const matrix = new Dna(req.body);
        const service = new dnaService();
        const result = service.checkDna(matrix);
        res.status(result ? 200 : 403).send();
    } catch (err) {
        res.status(500).send("Invalid matrix or data");
    }
}

export async function dnaStats(req, res) {
    const service = new dnaService();
    try {
        const result = await service.dnaStats();
        res.status(200).send(JSON.stringify(result));
    } catch (error) {
        res.status(500).send(JSON.stringify(error.toString()));
    }
}