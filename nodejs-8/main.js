const express = require('express');
const app = express();


app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

const comand = require('command-line-args');
const api = require('./API');  //ES LA RUTA DONDE ESTARA EL INDEX.HTML

const params = [
    {
        name: "puerto", //el nombre descriptivo del argumento
        alias: "p", //la version abreviada
        type: Number   //Number String  bollean
    }
];

const opciones = comand(params);

//app.use("/",(req,res,next)=>{ //se usa cuando no se encuentra la url a la que se intenta acceder
//   console.log("Se ha intentado acceder a /");
//   next();
//});

app.get("/", (request, response) => {
    response.send("Bienvenidos al api");
});

app.use('/API', api); //todo lo que venga referido a /api LO VA A USAR EL ROUTER

app.use((req, res, next) => {
    console.log("No se ha podido acceder a la ruta");
});

app.listen(opciones.puerto, () => {
    console.log("Escuchando en el puerto:" + opciones.puerto);
});
