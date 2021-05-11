import express from "express";
import routes from "./routes/DnaRoutes.js"

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

//app.use(express.urlencoded({ extended: false }))
app.use(express.json());
//app.use(express.json({type:'application/x-www-form-urlencoded'}));
//app.use(express.raw());
app.use('/', routes);

app.listen(port,()=> console.log(`Listening on port ${port}!`));

process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Process terminated');
    })
  })