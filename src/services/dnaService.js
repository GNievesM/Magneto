import DnaDataAccess from "../dataAccess/DnaDataAccess.js"
import AnalyzedDna from "../dataAccess/daos/AnalyzedDna.js"
import {isMutant,isValid} from "../mutantAlgorithm/mutantCalculator.js"

export default class DnaService {
    dnaDataAccess;
    constructor() {
        this.dnaDataAccess = new DnaDataAccess();
    }

    checkDna(dna) {
        if(!isValid(dna)) throw new Error("Matrix is invalid");
        if(dna.length == 0) return false;
        let result = false;
        if(dna.length>3) result = isMutant(dna);   // todo use dna atribute to get matrix.
        let register = new AnalyzedDna(dna, result);     
        this.dnaDataAccess.updateStats(register);        
        return result;
    }

    async dnaStats() {
        let result = await this.dnaDataAccess.getStats();
        return result;
    }
}
