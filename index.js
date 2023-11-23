import {dbConnectionMongo} from "./database/index.js";
import express from "express";
import domicilioRoute from "./routes/domicilioRoute.js"
import personaRoute from "./routes/personaRoute.js"

console.log("Linea 5 index");
const app = express();

const puerto = 3000; 

app.use(express.json());

dbConnectionMongo();

app.use("/api/persona", personaRoute);
app.use("/api/domicilio", domicilioRoute);

/*
app.listen(puerto, () => {
    console.log(`Servidor Express en funcionamiento en el puerto ${puerto}`);
  });
console.log("Linea 12 index");*/

export default app;