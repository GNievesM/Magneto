import express from "express";
import routes from "./routes/dnaRoutes.js"

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', routes);

app.listen(port,()=> console.log(`Listening on port ${port}!`));

process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Process terminated');
    })
  })