import { describe } from "yargs";
import { test } from "@jest/globals";
import dnaService from "../../services/dnaService.js"
import dnaDataAccess from "../../dataAccess/dnaDataAccess.js";

describe("dnaService", ()=>{
    describe("checkDna", () =>{
        describe("not valid input",()=>{
            let service = new dnaService();
            const result = false;
            jest.mock('../../dataAccess/dnaDataAccess.js');
            dnaDataAccess
            test("it should return false since the matrix is not squared",()=>{
                const matrix = ["AA","A"];                
                expect(service.checkDna(matrix)).toEqual(result);
            })
            test("it should return false since the matrix is not squared",()=>{
                const matrix = ["A","AA"];                
                expect(service.checkDna(matrix)).toEqual(result);
            })
            test("it should return false since the matrix has invalid characters",()=>{
                const matrix = ["AA","YA"];                
                expect(service.checkDna(matrix)).toEqual(result);
            })
            test("it should return false since the matrix is not squared and has invalid characters",()=>{
                const matrix = ["JA","A"];                
                expect(service.checkDna(matrix)).toEqual(result);
            })
        })
    })
})