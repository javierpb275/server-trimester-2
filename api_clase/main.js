const { conecta, desconecta } = require('./api/database');
const express = require('express');
app = express();
const path = require("path");
conecta();

const comando = require('command-line-args');

const api = require('./api');

const params = [
    {
        name: "puerto",
        alias: "p",
        type: Number
    }
];

const opciones = comando(params);

//middleware
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


app.get("/", (request, response) => {
    response.sendFile(path.resolve(".") + "/prueba.html");
});

app.use('/api', api);

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({
        message: "server error"
    })
    next();
})

app.use((req, res, next) => {
    res.status(404).json({
        message: "url not found"
    })
    next();
});

app.listen(opciones.puerto, () => {
    console.log("Escuchando en el puerto:" + opciones.puerto);
});


