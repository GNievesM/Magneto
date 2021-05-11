# XMen
Asumptions made during the test:
1- The same letter may be part of more of one sequence
2- Sequences of more than 4 letters count as one
3- Having 2 valid sequences of the same letter is considered a mutant.
4- The size of the matrix wont exceed 632.
5- The service will return correctly even if the dna was already tested.
6- if more mutants are tested than humans the ratio will be bigger than 1
7- if humans are 0 N/A is retunred

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
