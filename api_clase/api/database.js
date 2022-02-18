const mongoose = require("mongoose");

const opcionesMongo = {
    keepAlive: 1,
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

exports.conecta = () => {
    const mongoDB = process.env.MONGODB_URI;

    mongoose.connect(mongoDB, opcionesMongo).catch(err => {
        console.log(`unable to connect to server: ${err}`);
    })

}

mongoose.connection.on('error', err => {
    console.log("Error en la conexión: " + err);
})

mongoose.connection.on('connected', () => {
    console.log("Connected to mongodb server successfully");
})

exports.desconecta = async () => {
    await mongoose.connection.close()
    console.log("disconnected mongodb");
}

process.on('SIGINT', async () => {
    await module.exports.desconecta();
    process.exit();
})

/*
module.exports = {
    conecta,
    desconecta
}
*/
