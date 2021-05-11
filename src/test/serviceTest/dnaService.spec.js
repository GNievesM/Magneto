import dnaService from "../../services/DnaService.js"
import { jest, beforeEach, test, expect } from "@jest/globals";

describe("dnaService", () => {
    describe("checkDna", () => {
        describe("not valid input", () => {
            let service = new dnaService();
            let error = "Matrix is invalid";

            test("it should throw since the matrix is not squared", () => {
                const matrix = { dnaLines: ["AAGG", "AAC"] };
                expect(() => { service.checkDna(matrix) }).toThrow(error);
            })

            test("it should throw since the matrix is not squared", () => {
                const matrix = { dnaLines: ["AACG", "AAGC"] };
                expect(() => { service.checkDna(matrix) }).toThrow(error);
            })

            test("it should throw since the matrix has invalid characters", () => {
                const matrix = { dnaLines: ["AAGG", "GGYA"] };
                expect(() => { service.checkDna(matrix) }).toThrow(error);
            })

            test("it should throw since the matrix is not square and has invalid characters", () => {
                const matrix = { dnaLines: ["AJAT", "AHHH"] };
                expect(() => { service.checkDna(matrix) }).toThrow(error);
            })

            test("it should throw since the matrix is not squared and has invalid characters", () => {
                const matrix = { dnaLines: ["JATTT", "AGGA"] };
                expect(() => { service.checkDna(matrix) }).toThrow(error);
            })

            test("it should throw since the matrix has invalid characters", () => {
                const matrix = { dnaLines: ["JATT", "AGGA", "AAJJ", "TEWQ"] };
                expect(() => { service.checkDna(matrix) }).toThrow(error);
            })
        })

        describe("mutants", () => {
            let service = new dnaService();
            service.dnaDataAccess.updateStats = jest.fn();
            const result = true;

            test("it should return true: 3 series", () => {
                const matrix = { dnaLines: ["AAAAGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"] };
                expect(service.checkDna(matrix)).toEqual(result);
            })

            test("it should return true: Having a complete line ", () => {
                const matrix = { dnaLines: ["AAAAAA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCGA", "TCACTG"] };
                expect(service.checkDna(matrix)).toEqual(result);
            })

            test("it should return true: G diagonal", () => {
                const matrix = { dnaLines: ["ACGTAG", "CGGGGC", "GTATGT", "AGAAGG", "CCCCGA", "TCACTG"] };
                expect(service.checkDna(matrix)).toEqual(result);
            })

            test("it should return true:diagonal to last position ", () => {
                const matrix = { dnaLines: ["AGTCGA", "CACTGC", "GTAGTT", "AGACGG", "GCGTGA", "TCGGGG"] };
                expect(service.checkDna(matrix)).toEqual(result);
            })

            test("it should return true:diagonal to middle position ", () => {
                const matrix = { dnaLines: ["ATGCGA", "CAGTGC", "TTAGTG", "AGACGG", "GCGGGG", "TCGAAG"] };
                expect(service.checkDna(matrix)).toEqual(result);
            })

            test("it should return true:diagonal to middle position ", () => {
                const matrix = { dnaLines: ["ATGCGA", "CAGTGC", "TTAGTG", "AGACGG", "GCGGGG", "TCGAAG"] };
                expect(service.checkDna(matrix)).toEqual(result);
            })

            test("it should return true:diagonal to middle position ", () => {
                const matrix = { dnaLines: ["ATGCGA", "CAGTGC", "TTAGTG", "AGACGG", "GCGGGG", "TCGAAG"] };
                expect(service.checkDna(matrix)).toEqual(result);
            })

            test("it should return true:horizontal and vertical ", () => {
                const matrix = { dnaLines: ["AAAA", "AAGT", "ATAG", "AGAC"] };
                expect(service.checkDna(matrix)).toEqual(result);
            })

            test("it should return true: both diagonals ", () => {
                const matrix = { dnaLines: ["ATGA", "GAAT", "TAAG", "ATGA"] };
                expect(service.checkDna(matrix)).toEqual(result);
            })

            test("it should return true: inverseDiagonal and horizontal end ", () => {
                const matrix = { dnaLines: ["GTGA", "GAAA", "TAAA", "ATGA"] };
                expect(service.checkDna(matrix)).toEqual(result);
            })

            test("it should return true: vertical and horizontal including last element ", () => {
                const matrix = { dnaLines: ["GTGA", "GCTA", "TGCA", "AAAA"] };
                expect(service.checkDna(matrix)).toEqual(result);
            })

            test("it should return true: middle cross ", () => {
                const matrix = { dnaLines: ["GTGA", "GGGG", "TGGA", "AAGA"] };
                expect(service.checkDna(matrix)).toEqual(result);
            })
        })

        describe("humans", () => {
            let service = new dnaService();
            service.dnaDataAccess.updateStats = jest.fn();
            const result = false;

            test("it should return false", () => {
                const matrix = { dnaLines: ["ATGCGA", "CAGTGC", "TTATTT", "AGACGG", "GCGTCA", "TCACTG"] };
                expect(service.checkDna(matrix)).toEqual(result);
            })

            test("it should return false: Almost", () => {
                const matrix = { dnaLines: ["AAAAAA", "CCGTGC", "TTATTT", "AGACGG", "GCGTCA", "TCACTG"] };
                expect(service.checkDna(matrix)).toEqual(result);
            })

            test("it should return false: no possible solution", () => {
                const matrix = { dnaLines: ["CCG", "TTA", "AGC"] };
                expect(service.checkDna(matrix)).toEqual(result);
            })

            test("it should return false: not counting twice same sequence", () => {
                const matrix = { dnaLines: ["AAAA", "CCGT", "TTAT", "AGAC"] };
                expect(service.checkDna(matrix)).toEqual(result);
            })

            test("it should return false: not counting twice same sequence 2", () => {
                const matrix = { dnaLines: ["ATTT", "ACTT", "TGAT", "AGAT"] };
                expect(service.checkDna(matrix)).toEqual(result);
            })
        })
    })

    describe("DnaStats", () => {
        let service = new dnaService();
        let stat = { mutant: 0, human: 0, ratio: "N/A" };
        service.dnaDataAccess.getStats = jest.fn(() => { return stat });

        test('it should return correctly', () => {
            return service.dnaStats().then(data => { expect(data).toBe(stat); });
        })
    })
})