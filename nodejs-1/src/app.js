const express = require("express");
const command = require("command-line-args");
const path = require("path");
const fs = require("fs");


//express app config:
const app = express();
app.use(express.json());

//functions:

const fileRoute = path.resolve(".") + "/log_inicios.json";

const params = [
    {
        name: "port",
        alias: "p",
        type: Number
    },
    {
        name: "mode",
        alias: "m",
        type: String
    },
];

const options = command(params);
const date = new Date();
options.date = date.toUTCString();

const readElementsInArrayInJsonFileAsync = (fileRoute) => {
    fs.readFile(fileRoute, "utf-8", (err, content) => {
        if (err) {
            throw err;
        } else {
            const jsonContent = JSON.parse(content);
            for (let index = 0; index < jsonContent.length; index++) {
                console.log(jsonContent[index]);
            }
        }
    })
}

const getArrayInJsonFileSync = (fileRoute) => {
    let rawdata = fs.readFileSync(fileRoute, "utf-8");
    let result = JSON.parse(rawdata);
    return result;
}

const getArrayInJsonFileAsync = (fileRoute) => {
    let array;
    fs.readFile(fileRoute, "utf-8", (err, content) => {
        if (err) {
            throw err;
        }
        array = JSON.parse(content);
    });
    return array;
}

const overWriteJsonFileSync = (fileRoute, array) => {
    fs.writeFileSync(fileRoute, JSON.stringify(array), (err) => {
        if (err) {
            throw err;
        }
    });
};

const saveLogInicio = (fileRoute, object) => {
    const { port, mode } = object;
    if (!port || !mode) {
        return console.log("correct syntax: node src/index.js -p <port number> -m <operation mode>")
    }
    if (!fs.existsSync(fileRoute)) {
        overWriteJsonFileSync(fileRoute, [object])
        return readElementsInArrayInJsonFileAsync(fileRoute);
    }
    let fileContent = getArrayInJsonFileSync(fileRoute);
    fileContent.push(object);
    overWriteJsonFileSync(fileRoute, fileContent);
    return readElementsInArrayInJsonFileAsync(fileRoute);
}


//routes:
app.get('/', (req, res) => {
    res.send("hello world!");
})

module.exports = app;