const express = require('express');
const app = express();
const comando = require('command-line-args');
const path = require('path');
const fs = require('fs');

const ruta = path.resolve(".") + "/log_inicios.json";

var array2 = [];

const params = [
    {
        name: "puerto",
        alias: "p",
        type: Number
    },
    {
        name: "modo",
        alias: "m",
        type: String
    }
];

const opciones = comando(params);
const { puerto, modo } = opciones;


function guardar() {
    array2.push(opciones);
    fs.writeFile(ruta, JSON.stringify(array2), function (err) {
        if (err)
            throw err;
    });
}


if (!puerto || !modo) {
    console.log("la sintaxis correcta es node main -p <numero de puerto> -m <modo de operacion>");
} else {
    fecha = new Date();
    opciones.fecha = fecha.toUTCString();
    if (fs.existsSync(ruta)) {
        fs.readFile(ruta, "utf8", function (err, cont) {
            if (err)
                throw err;
            array2 = JSON.parse(cont);
            guardar();
            //console.log(array2);
        });
    } else {
        guardar();
    }

}


app.get('/', function (req, res) {
    res.send(JSON.stringify(array2));
});

app.get('/cliente', (req, res) => {
    //primero colocarse dentro de /src y node main.js -p 3000 -m development
    res.sendFile(path.resolve(".") + '/cliente/cliente_1.html');
})

app.listen(opciones.puerto, function () {
    console.log("escuchando en el puerto " + opciones.puerto);
});