import Persona from "../models/persona.js"

// Agregar Persona
const agregarPersona = async (req, res) => {
  try {
    const { CI, Nombre, Apellido, Edad } = req.body;

    // Verifica si la persona ya existe por CI
    const personaExistente = await Persona.findOne({ CI });

    if (personaExistente) {
      return res.status(401).json({ mensaje: 'La persona ya existe' });
    }

    const nuevaPersona = new Persona({
      CI,
      Nombre,
      Apellido,
      Edad,
    });

    await nuevaPersona.save();

    res.status(201).json(nuevaPersona);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar persona' });
  }
};
export{
    agregarPersona,
}