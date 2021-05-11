import AWS from "aws-sdk"
import * as config from "../config/databaseConfig.js"
import statsDao from "./daos/StatsDao.js";

export default class DnaDataAccess {
    dynamo;
    constructor() {
        config.asignConfig(AWS.config);
        this.dynamo = new AWS.DynamoDB;
    }

    updateStats(analyzedDna) {
        let params = this.createTransactParams(analyzedDna);
        this.dynamo.transactWriteItems(params).promise().then(res => console.log("Successful update")).catch(err=> console.log(JSON.stringify(err.message)));        
    }

    async getStats() {
        let params = this.createReadParams();
        let data = await this.dynamo.DocumentClient().get(params).promise();
        return new statsDao(data.Item.mutant, data.Item.human, data.Item.human == 0 ? "N/A" : data.Item.mutant / data.Item.human);
    };

    createRegisterParams(analyzedDna) {
        var params = {
            ConditionExpression: 'attribute_not_exists(DNA)',
            TableName: 'Mutant',
            Item: {
                DNA: { S: Buffer.from(analyzedDna.matrix.toString()).toString('base64') },
                is_mutant: { BOOL: analyzedDna.isMutant },
            }
        }
        return params;
    }
    createTransactParams(analyzedDna) {
        return {
            TransactItems: [
                {
                    Put: this.createRegisterParams(analyzedDna)
                },
                {
                    Update: this.createUpdateParams(analyzedDna.isMutant ? 1 : 0, analyzedDna.isMutant ? 0 : 1)
                }
            ]
        }
    }

    createUpdateParams(addMutant, addHuman) {
        return {
            TableName: "Mutant",
            Key: {
                DNA: { S: '0' },
            },
            UpdateExpression: "set mutant= mutant+ :addMutants, human= human+ :addHuman",
            ExpressionAttributeValues: {
                ":addMutants": { N: addMutant.toString() },
                ":addHuman": { N: addHuman.toString() }
            }
        };
    }

    createReadParams() {
        return {
            TableName: "Mutants",
            Key: {
                "ID": 0
            }
        }
    }


}