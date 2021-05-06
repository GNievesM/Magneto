import config from "dotenv"


export function asignConfig(awsConfig){
    config.config();
    let aws = {
        "region": process.env.region,
        "endpoint": process.env.endpoint,
        "accessKeyId": process.env.accesKeyId,
        "secretAccessKey":process.env.secretAccessKey
    };
    awsConfig.update(aws);
}