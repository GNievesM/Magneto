import { jest, test, expect } from "@jest/globals";
import DnaDataAccess from "../../dataAccess/DnaDataAccess.js";
import AnalyzedDna from "../../dataAccess/daos/AnalyzedDna.js";
import StatsDao from "../../dataAccess/daos/StatsDao.js";



describe("controllerTest", () => {
  
    let dataAccess = new DnaDataAccess();

    describe("checkDna", () => {  
        let functionMock = {
            promise() {
                return new Promise((resolve, reject) => {
                    resolve('');
                });
            }
        }
        dataAccess.dynamo.transactWriteItems = jest.fn((params) => {
            return functionMock;
        });
        test("it should call dynamo once no mutant", () => {
            dataAccess.updateStats(new AnalyzedDna(['A,A', 'G,G'],false));
            expect(dataAccess.dynamo.transactWriteItems.mock.calls.length).toBe(1);
        })
        test("it should call dynamo once mutant", () => {
            dataAccess.updateStats(new AnalyzedDna(['A,A', 'G,G'],true));
            expect(dataAccess.dynamo.transactWriteItems.mock.calls.length).toBe(2);
        })
    })
    describe("get stats", () => {
        let stats = new StatsDao(1,1,1);
        let dbResponse = {Item:{mutant:1, human:1}};
        dataAccess.docClient.get = jest.fn((params) => {
            return{ promise(){return dbResponse}};
        });
        test("it should call dynamo once", () => {
            dataAccess.getStats();
            expect(dataAccess.docClient.get.mock.calls.length).toBe(1);
        })
        test("it should return the stats", () => {      
            return dataAccess.getStats().then(res => {expect(res).toStrictEqual(stats)});            
        })
        test("it should return the stats with N/A since 0 humans", () => {      
            let nohuman = {Item:{mutant:1, human:0}};
            let nohumanstats = new StatsDao(1,0,'N/A');
            dataAccess.docClient.get = jest.fn((params) => {
                return{ promise(){return nohuman}};
            });
            return dataAccess.getStats().then(res => {expect(res).toStrictEqual(nohumanstats)});            
        })

    })
})