# XMen

#Asumptions made during the test:

- The same letter may be part of more of one sequence
- Sequences of more than 4 letters count as one
- Having 2 valid sequences of the same letter is considered a mutant.
- The size of the matrix wont exceed 632.
- The service will return correctly even if the dna was already tested.
- if more mutants are tested than humans the ratio will be bigger than 1
- if humans are 0 N/A is returned

#Instruction to use the api:

Using postman or any other tool:
- Get at : http://ec2-3-134-79-231.us-east-2.compute.amazonaws.com:3000/stats

- Post at: http://ec2-3-134-79-231.us-east-2.compute.amazonaws.com:3000/mutant

***IMPORTANT FOR POST*** 

- Content-type headers must be set to application/json
- Body must be formed as follow: {"dna":Matrix}
- example: {"dna":["GTGCGA","CAGTGC","TTATTT","AGACGG","GCGTCA","TCACTG"]}


Instruction to run the code:

0- install git and npm
1- Download the repository
2- On the folder repository run the command npm install
3- Set environment variables for dynamo db:
Template:
region="region"
endpoint="endpoint"
accesKeyId="accessKey"
secretAccessKey="secretAccessKey"
4- Create table in dynamoDB named mutant with primary key DNA
5- Add a register with values {DNA:0, human:0, mutant:0}
6- inside the src folder run node magneto-app.js
7- Api calls (using postman or other tool):
	a- GET url:3000/stats
	b- POST url:300/mutant, the Content-Type header must be set to application/json. body: {"dna":["A"]}
