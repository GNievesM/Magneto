import express from "express";
import routes from "./api/routes/DnaRoutes.js"
const app = express();
const port = 3000;

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });

app.use('/', routes)

app.listen(port,()=> console.log(`Listening on port ${port}!`))

process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Process terminated')
    })
  })