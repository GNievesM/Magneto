export default class statsDao{
    count_mutant_dna;
    count_human_dna;
    ratio;
    constructor(mutant,human,ratio){
        this.count_human_dna=human
        this.count_mutant_dna=mutant
        this.ratio =ratio
    }
}