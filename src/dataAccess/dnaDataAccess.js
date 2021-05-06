import AWS from "aws-sdk"
import * as config from "../config/databaseConfig.js"
import statsDao from "./daos/stats.js";

export default class dnaDataAccess {
    dynamo;
    constructor() {
        config.asignConfig(AWS.config)
        this.dynamo = new AWS.DynamoDB.DocumentClient();
    }

    updateStats(addMutants, addHumans) {
        let params = this.createUpdateParams(addMutants, addHumans);
        console.log("Updating stats...");
        this.dynamo.update(params, function (err, data) {
            if (err) {
                console.error("Unable to update stats. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Update succeeded:", JSON.stringify(data, null, 2));
            }
        });
    }

    async getStats() {
        let params = this.createReadParams();
        let data = await this.dynamo.get(params).promise();
        return new statsDao(data.Item.mutant, data.Item.human, data.Item.mutant / data.Item.human);
    };

    createUpdateParams(addMutant, addHuman) {
        return {
            TableName: "Mutants",
            Key: {
                "ID": 0,
            },
            UpdateExpression: "set mutant= mutant+ :addMutants, human= human+ :addHuman",
            ExpressionAttributeValues: {
                ":addMutants": addMutant,
                ":addHuman": addHuman
            },
            ReturnValues: "UPDATED_NEW"
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