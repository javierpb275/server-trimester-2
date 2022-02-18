const express = require("express");
const taskRouter = require("./routers/task.router");

const app = express();

//settings:
app.set("port", process.env.PORT || 3000);

//middlewares:
app.use(express.json());

//routes:
app.use("/api/tasks", taskRouter);

module.exports = app;
