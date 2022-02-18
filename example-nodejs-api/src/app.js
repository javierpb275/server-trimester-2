const express = require("express");
const userRouter = require("./routers/user.router");
const taskRouter = require("./routers/task.router");

const app = express();

//settings
app.set("port", process.env.PORT || 3000);

//middlewares
app.use(express.json());

//routes
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

module.exports = app;