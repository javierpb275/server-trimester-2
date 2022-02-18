const mongoose = require("mongoose");

const tallerSchema = new mongoose.Schema(
    {
        direccionPostal: {
            type: String,
            trim: true,
            required: true,
        },
        especialidad: {
            type: String,
            trim: true,
            required: true,
        },
        cif: {
            type: String,
            trim: true,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Taller = mongoose.model("Taller", tallerSchema);

module.exports = Taller;