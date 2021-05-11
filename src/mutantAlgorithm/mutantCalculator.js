export function isMutant(genes) {
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

    //look horizontal coincidences discarding already counted sequences
    if (((x > 0 && genes[y][x - 1] != genes[y][x]) || x == 0) && x + 3 < size) {
        let repetitions = 0;
        for (let i = 0; i < 4 && genes[y][x] == genes[y][x + i] && repetitions < 4; i++, repetitions++) if (repetitions == 3) sequences++;
    }
    //look diagonal right coincidences discarding already counted sequences
    if (((y > 0 && x > 0 && genes[y - 1][x - 1] != genes[y][x]) || (x == 0 || y == 0)) && x + 3 < size && y + 3 < size) {
        let repetitions = 0;
        for (let i = 0; i < 4 && genes[y][x] == genes[y + i][x + i] && repetitions < 4; i++, repetitions++) if (repetitions == 3) sequences++;
    }
    //look vertical coincidences discarding already counted sequences
    if (((y > 0 && genes[y - 1][x] != genes[y][x]) || y == 0) && y + 3 < size) {
        let repetitions = 0;
        for (let i = 0; i < 4 && genes[y][x] == genes[y + i][x] && repetitions < 4; i++, repetitions++) if (repetitions == 3) sequences++;
    }
    //look diagonal left coincidences discarding already counted sequences
    if (((y > 0 && x < size - 1 && genes[y - 1][x + 1] != genes[y][x]) || (y == 0 || x == size)) && y + 3 < size && x - 3 >= 0) {
        let repetitions = 0;
        for (let i = 0; i < 4 && genes[y][x] == genes[y + i][x - i] && repetitions < 4; i++, repetitions++) if (repetitions == 3) sequences++;
    }
    return sequences;
}

export function isValid(genes) {
    let rows = genes.length;
    let valid = "ACGT";
    for (let i = 0; i < rows; i++) {
        if (genes.length != genes[i].length) return false;
        for (let j = 0; j < rows; j++) {
            if (!valid.includes(genes[i][j]))
                return false;
        }
    }
    return true;
}
