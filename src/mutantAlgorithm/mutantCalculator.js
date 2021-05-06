export default function isMutant(genes) {
    let sequencesCount = 0;
    let size = genes.length;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            sequencesCount += countRepetead(i, j, genes);
            if (sequencesCount > 1)
                return true;
        }
    }
    return false;
}

function countRepetead(y, x, genes) {
    let sequences = 0;
    let size = genes.length;

    if (((x > 0 && genes[y][x - 1] != genes[y][x]) || x==0) && x + 4 < size) { //only if it has not being count the horizontal line
        let repetitions = 0;
        for (let i = 0; i < 4 && genes[y][x] == genes[y][x + i] && repetitions < 4; i++, repetitions++) if (repetitions == 3) sequences++;
    }
    if (((y > 0 && x > 0 && genes[y - 1][x - 1] != genes[y][x])||y==0) && x + 4 < size && y + 4 < size) {
        let repetitions = 0;
        for (let i = 0; i < 4 && genes[y][x] == genes[y + i][x + i] && repetitions < 4; i++, repetitions++) if (repetitions == 3) sequences++;
    }
    if (((y > 0 && genes[y - 1][x] != genes[y][x])||y==0) && y + 4 < size) {
        let repetitions = 0;
        for (let i = 0; i < 4 && genes[y][x] == genes[y + i][x] && repetitions < 4; i++, repetitions++) if (repetitions == 3) sequences++;
    }
    if (((y > 0 && x < size - 1 && genes[y - 1][x + 1] != genes[y][x])||y==0) && y + 4 < size && x - 4 >= 0) {
        let repetitions = 0;
        for (let i = 0; i < 4 && genes[y][x] == genes[y + i][x - i] && repetitions < 4; i++, repetitions++) if (repetitions == 3) sequences++;
    }
    return sequences;
}