import dnaService from "../../services/DnaService.js"
import dnaDataAccess from "../../dataAccess/DnaDataAccess.js";
// import { describe } from "yargs";
//import { test } from "@jest/globals";
import { jest, beforeEach, test, expect } from "@jest/globals";

describe("dnaService", () => {
    describe("checkDna", () => {
        describe("not valid input", () => {
            let service = new dnaService();
            const result = false;            
            test("it should return false since the matrix is not squared", () => {
                const matrix = ["AAGG", "AAC"];
                expect(service.checkDna(matrix)).toEqual(result);
            })
            test("it should return false since the matrix is not squared", () => {
                const matrix = ["AACG", "AAGC"];
                expect(service.checkDna(matrix)).toEqual(result);
            })
            test("it should return false since the matrix has invalid characters", () => {
                const matrix = ["AAGG", "GGYA"];
                expect(service.checkDna(matrix)).toEqual(result);
            })
            test("it should return false since the matrix is not square and has invalid characters", () => {
                const matrix = ["AJAT", "AHHH"];
                expect(service.checkDna(matrix)).toEqual(result);
            })
            test("it should return false since the matrix is not squared and has invalid characters", () => {
                const matrix = ["JATTT", "AGGA"];
                expect(service.checkDna(matrix)).toEqual(result);
            })           
            test("it should return false since the matrix has invalid characters", () => {
                const matrix = ["JATT", "AGGA","AAJJ", "TEWQ"];
                expect(service.checkDna(matrix)).toEqual(result);
            })           
        })
        describe("mutants", () => {          
            let service = new dnaService();
            service.dnaDataAccess.updateStats = jest.fn();
            const result = true;            
            test("it should return true: 3 series", () => {
                const matrix = ["AAAAGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"];
                expect(service.checkDna(matrix)).toEqual(result);
            })
            test("it should return true: Having a complete line ", () => {
                const matrix = ["AAAAAA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCGA", "TCACTG"];
                expect(service.checkDna(matrix)).toEqual(result);
            })
            test("it should return true: G diagonal", () => {
                const matrix = ["ACGTAG", "CGGGGC", "GTATGT", "AGAAGG", "CCCCGA", "TCACTG"];
                expect(service.checkDna(matrix)).toEqual(result);
            })
            test("it should return true:diagonal to last position ", () => {
                const matrix = ["AGTCGA", "CACTGC", "GTAGTT", "AGACGG", "GCGTGA", "TCGGGG"];
                expect(service.checkDna(matrix)).toEqual(result);
            })
             test("it should return true:diagonal to middle position ", () => {
                 const matrix = ["ATGCGA", "CAGTGC", "TTAGTG", "AGACGG", "GCGGGG", "TCGAAG"];
                 expect(service.checkDna(matrix)).toEqual(result);
             })
             test("it should return true:diagonal to middle position ", () => {
                const matrix = ["ATGCGA", "CAGTGC", "TTAGTG", "AGACGG", "GCGGGG", "TCGAAG"];
                expect(service.checkDna(matrix)).toEqual(result);
            })
            test("it should return true:diagonal to middle position ", () => {
                const matrix = ["ATGCGA", "CAGTGC", "TTAGTG", "AGACGG", "GCGGGG", "TCGAAG"];
                expect(service.checkDna(matrix)).toEqual(result);
            })
            test("it should return true:horizontal and vertical ", () => {
                const matrix = ["AAAA", "AAGT", "ATAG", "AGAC"];
                expect(service.checkDna(matrix)).toEqual(result);
            })
            test("it should return true: both diagonals ", () => {
                const matrix = ["ATGA", "GAAT", "TAAG", "ATGA"];
                expect(service.checkDna(matrix)).toEqual(result);
            })
            test("it should return true: inverseDiagonal and horizontal end ", () => {
                const matrix = ["GTGA", "GAAA", "TAAA", "ATGA"];
                expect(service.checkDna(matrix)).toEqual(result);
            })
            test("it should return true: vertical and horizontal including last element ", () => {
                const matrix = ["GTGA", "GCTA", "TGCA", "AAAA"];
                expect(service.checkDna(matrix)).toEqual(result);
            })
            test("it should return true: middle cross ", () => {
                const matrix = ["GTGA", "GGGG", "TGGA", "AAGA"];
                expect(service.checkDna(matrix)).toEqual(result);
            })
        })
        describe("humans", () => {          
            let service = new dnaService();
            service.dnaDataAccess.updateStats = jest.fn();
            const result = false;            
            test("it should return false", () => {
                const matrix = ["ATGCGA", "CAGTGC", "TTATTT", "AGACGG", "GCGTCA", "TCACTG"];
                expect(service.checkDna(matrix)).toEqual(result);
            })
            test("it should return false: Almost", () => {
                const matrix = ["AAAAAA", "CCGTGC", "TTATTT", "AGACGG", "GCGTCA", "TCACTG"];
                expect(service.checkDna(matrix)).toEqual(result);
            })
            test("it should return false: no possible solution", () => {
                const matrix = ["CCG", "TTA", "AGC"];
                expect(service.checkDna(matrix)).toEqual(result);
            })
            test("it should return false: not counting twice same sequence", () => {
                const matrix = ["AAAA", "CCGT", "TTAT", "AGAC"];
                expect(service.checkDna(matrix)).toEqual(result);
            })
            test("it should return false: not counting twice same sequence 2", () => {
                const matrix = ["ATTT", "ACTT", "TGAT", "AGAT"];
                expect(service.checkDna(matrix)).toEqual(result);
            })
           
        })
    })
    describe("DnaStats", () => {
        let service = new dnaService();
        let stat = {mutant:0,human:0,ratio:"N/A"};
        service.dnaDataAccess.getStats = jest.fn(()=>{return stat});
        test('it should return correctly', () => {
            return service.dnaStats().then(data=> {expect(data).toBe(stat);});            
        })
    })

})