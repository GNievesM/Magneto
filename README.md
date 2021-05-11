# XMen
 
0) install git and npm
1) Download the repository
2) On the folder repository run the command npm install
3) Set environment variables for dynamo db:
Template:
region="region"
endpoint="endpoint"
accesKeyId="accessKey"
secretAccessKey="secretAccessKey"
4) Create table in dynamoDB named mutant with primary key DNA
5) Add a register with values {DNA:0, human:0, mutant:0}
6) inside the src folder run node magneto-app.js
7) Api calls (using postman or other tool):
	a) GET url:3000/stats
	b) POST url:300/mutant, the Content-Type header must be set to application/json. body: {"dna":["A"]}
