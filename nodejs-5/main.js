const comando = require('command-line-args');
const path = require("path");
const fs2 = require("fs");
const fs = require("fs").promises;
const express = require("express");
const app = express();
//const argumentos = process.argv.slice(2);
const ruta = path.resolve(".") + "/log_inicios.json";

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
array = [];
const opciones = comando(params);
const { puerto, modo } = opciones;


if (!puerto || !modo) console.log("La sintaxis correcta es node main -p <numero de puerto> -m <modo de operacion>");
else {

    fecha = new Date();
    opciones.fecha = fecha.toUTCString();


    leerDatos = async () => {
        datos = await fs.readFile(ruta, "utf8");
        return JSON.parse(datos);
    }

    leerGuardar = async () => {
        if (fs2.existsSync(ruta)) {
            array = await leerDatos();
            //array=JSON.parse(fs.readFileSync(ruta,"utf8"));
        }
        guardar();
    }


    leerGuardar();

    function guardar() {
        array.push(opciones);
        fs.writeFile(ruta, JSON.stringify(array), function (err) {
            if (err) throw err;
        });
    }



    app.get('/', function (req, res) {
        res.send(JSON.stringify(array));

    });

    app.get('/cliente', (req, res) => {
        res.sendFile(path.resolve(".") + '/cliente/cliente_1.html');
    })


    app.listen(opciones.puerto, function () {
        console.log("Escuchando en el puerto:" + opciones.puerto);
    });

}


//    app.get('/cliente/', function(req, res) {
//      
//      res.sendFile(path.resolve(".")+"/cliente/cliente_1.html");
//      
//    });
