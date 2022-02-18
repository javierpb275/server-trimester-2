const Persona = require("./model");

exports.crear = async (req, res, next) => {
    const persona = new Persona({
        nombre: req.body.nombre,
        edad: req.body.edad
    });
    try {
        await persona.save();
        res.json(persona);
    } catch (err) {
        next(new Error(err));
    }
}

exports.todos = async (req, res) => {
    try {
        const personas = await Persona.find(req.body);
        if (!personas) {
          return res.status(404).send('no hay personas');
        }
        res.status(200).json(personas);
      } catch (e) {
        next(new Error(err));
      }
}

exports.leer = (req, res) => {
    res.json({ message: "leer" })
}

exports.actualizar = (req, res) => {
    res.json({ message: "actualizar" })
}
