/*
arrancar servidor en modo desarrollo: npm run dev
arrancar servidor: npm run start
Tambien puedes hacer:
desarrollo: nodemon src/index
normal: node src/index
*/

const express = require("express");
const vehiculoRouter = require("./routers/vehiculo.router");
const tallerRouter = require("./routers/taller.router");
const reparacionRouter = require("./routers/reparacion.router");

const app = express();

//settings
app.set("port", process.env.PORT || 3000);

//middlewares
app.use(express.json());

//routes
app.use("/api/vehiculos", vehiculoRouter);
app.use("/api/talleres", tallerRouter);
app.use("/api/reparaciones", reparacionRouter);

module.exports = app;