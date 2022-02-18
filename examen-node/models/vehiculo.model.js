const mongoose = require("mongoose");

const vehiculoSchema = new mongoose.Schema(
    {
        matricula: {
            type: String,
            trim: true,
            required: true,
        },
        marca: {
            type: String,
            trim: true,
            required: true,
        },
        modelo: {
            type: String,
            trim: true,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Vehiculo = mongoose.model("Vehiculo", vehiculoSchema);

module.exports = Vehiculo;
