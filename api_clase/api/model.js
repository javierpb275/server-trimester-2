const mongoose = require("mongoose");

const personaSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
        },
        edad: {
            type: Number
        }
    },
    {
        timestamps: true,
    }
);

const Persona = mongoose.model("Persona", personaSchema);

module.exports = Persona;