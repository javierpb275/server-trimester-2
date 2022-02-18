const express = require('express');
const command = require('command-line-args');
const taskRouter = require('./routes/task.router');

const app = express();

const params = [
    {
        name: "port",
        alias: "p",
        type: Number
    }
];

const options = command(params);

//middlewares
app.use(express.json());
app.use((req, res, next) => {
    console.log("trying to access /")
    next();
})

//routes
app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use('/api', taskRouter);

//middleware
app.use((req, res, next) => {
    res.send("url not found")
})

app.listen(options.port, () => {
    console.log(`server is up on port ${options.port}`)
});