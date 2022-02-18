/*REQUIRES*/
const fs = require('fs');
const path = require('path');
const express = require('express');
const comand = require('command-line-args');


const nombre_fichero = "pruebas.txt";
const ruta = path.resolve(".") + "/" + nombre_fichero;
los_datos = "";

const app = express();
const params = [
    {
        name: "puerto", //el nombre descriptivo del argumento
        alias: "p", //la version abreviada
        type: Number   //Number String  bollean
    }
];
const opciones = comand(params);

lectura = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(ruta, 'utf8', (err, datos) => {
            if (err) {
                reject(err);
            } else {
                resolve(datos);
            }
        });
    });
};

//const leerPromesa = async() => {
//    los_datos = await lectura();
//    console.log(`El contenido del archivo ${nombre_fichero} es: "${los_datos}"`);
//};
//leerPromesa();

app.get("/", async (req, res) => {
    unos_datos = await lectura();
    res.send(unos_datos);
});

app.listen(opciones.puerto, () => {
    console.log("Escuchando en el puerto:" + opciones.puerto);
});
//lectura()
//        .then(data)=>{
//            console.log(data);
//        }.catch((err)=>{
//            console.log(err);
//        });
