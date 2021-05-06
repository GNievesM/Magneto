import dna from "../../models/dna.js"
import dnaService from "../../services/dnaService.js"

export function checkDna(req, res){ 
    const matrix = ["AAAAGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]; //new dna(req.body);
    const service = new dnaService();
    const result = service.checkDna(matrix);
    res.status(result?200:403).send();
}

export async function dnaStats(req, res){
    const service = new dnaService();
    const result = await service.dnaStats();
    res.status(200).send(JSON.stringify(result));    
}