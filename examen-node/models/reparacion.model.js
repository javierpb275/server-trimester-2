const mongoose = require("mongoose");

const reparacionSchema = new mongoose.Schema(
    {
        fechaEntrada: {
            type: Date,
            trim: true,
            required: true,
        },
        fechaSalida: {
            type: Date,
            trim: true,
            required: true,
        },
        taller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Taller",
            required: true,
        },
        vehiculo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehiculo",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Reparacion = mongoose.model("Reparacion", reparacionSchema);

module.exports = Reparacion;
