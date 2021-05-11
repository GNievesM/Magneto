import DnaDataAccess from "../dataAccess/DnaDataAccess.js"
import AnalyzedDna from "../dataAccess/daos/AnalyzedDna.js"
import { isMutant, isValid } from "../mutantAlgorithm/mutantCalculator.js"

export default class DnaService {
    dnaDataAccess;
    constructor() {
        this.dnaDataAccess = new DnaDataAccess();
    }

    checkDna(dna) {
        let matrix = dna.dnaLines
        if (!isValid(matrix)) throw new Error("Matrix is invalid");
        if (matrix.length == 0) return false;
        let result = false;
        if (matrix.length > 3) result = isMutant(matrix);
        let register = new AnalyzedDna(matrix, result);
        this.dnaDataAccess.updateStats(register);
        return result;
    }

    async dnaStats() {
        let result = await this.dnaDataAccess.getStats();
        return result;
    }
}
