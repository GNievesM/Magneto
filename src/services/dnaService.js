import dna from "../models/dna.js"
import dnaDataAccess from "../dataAccess/dnaDataAccess.js"
import isMutant from "../mutantAlgorithm/mutantCalculator.js"

export default class dnaService {
    dnaDataAccess;
    constructor() {
        this.dnaDataAccess = new dnaDataAccess();// todo agregar el layer corespondiente.
    }

    checkDna(dna) {
        if(!this.isValid(dna)) return false;
        let result = isMutant(dna);        
        this.dnaDataAccess.updateStats(result? 1:0, result?0:1);        
        return result;
    }

    isValid(genes){
        let rows = genes.length;
        let valid ="ACGT";
        if(rows<0) return false;
        for(let i = 0;i<rows;i++){
            if(genes.length != genes[i].length) return false;
            for(let j =0;j<rows;j++){
                if(!valid.includes(genes[i][j]))
                    return false;;
            }
        }
        return true;
    }

    async dnaStats() {
        let result = await this.dnaDataAccess.getStats();
        return result;
    }
}
