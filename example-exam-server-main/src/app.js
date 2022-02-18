const express = require("express");
const personRouter = require("./routers/person.router");
const doctorRouter = require("./routers/doctor.router");
const appointmentRouter = require("./routers/appointment.router");

const app = express();

//settings
app.set("port", process.env.PORT || 3000);

//middlewares
app.use(express.json());

//routes
app.use("/api/people", personRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/appointments", appointmentRouter);

module.exports = app;
