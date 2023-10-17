import { response } from "express";
import Domicilio from "../models/domicilio.js";
import Persona from "../models/persona.js";
import Direccion from "../models/direccion.js";

// Agregar Domicilio
const agregarDomicilio = async (req, res = response) => {
  try {
    // Asume que se proporciona el CI de la persona y el ID de la dirección
    const { personaCI, Direccion } = req.body;
    console.log(personaCI + "linea11" + Direccion);
    // Verifica si la persona existe
    const personaExistente = await Persona.findOne({ CI: personaCI });

    if (!personaExistente) {
      return res
        .status(402)
        .json({ mensaje: "No existe una persona con esa CI" });
    }

    // Crea un nuevo domicilio
    const nuevoDomicilio = new Domicilio({
      Datos_Persona: personaCI,
      Direccion,
    });

    await nuevoDomicilio.save();

    res.status(201).json(nuevoDomicilio);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar domicilio" });
  }
};

// Consultar Domicilio por CI de Persona
const consultarDomicilioPorCI = async (req, res = response) => {
  const CI = req.params.CI;
  try {
    // Busca la persona por CI
    const persona = await Persona.findOne({ CI });

    if (!persona) {
      return res
        .status(402)
        .json({ mensaje: "No existe una persona con la cédula proporcionada" });
    }

    // Obtiene los domicilios asociados a la persona
    const domicilios = await Domicilio.find({ Datos_Persona: persona.CI })
      .populate("Direccion")
      .sort({ _id: -1 }); // Ordena por los más recientes primero

    res.status(200).json(domicilios);
  } catch (error) {
    res.status(500).json({ error: "Error al consultar domicilios" });
  }
};

// Obtener Domicilios por Criterio
const obtenerDomiciliosPorCriterio = async (req, res = response) => {
  const { Barrio, Localidad, Departamento } = req.query;

  const criterios = {};

  if (Barrio) {
    criterios["Direccion.Barrio"] = Barrio;
  }

  if (Localidad) {
    criterios["Direccion.Localidad"] = Localidad;
  }

  if (Departamento) {
    criterios["Direccion.Departamento"] = Departamento;
  }

  try {
    const domicilios = await Domicilio.find(criterios)
    .populate("Direccion");

    // Luego, realiza una consulta para obtener los datos de Persona basados en la cédula
    for (const domicilio of domicilios) {
      const persona = await Persona.findOne({ CI: domicilio.Datos_Persona });
      domicilio.Datos_Persona = persona; // Asigna los datos de Persona al campo
    }

    // Envía la respuesta con los Domicilios actualizados al cliente
    res.status(200).json(domicilios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener domicilios por criterio" });
  }
};

export {
  agregarDomicilio,
  consultarDomicilioPorCI,
  obtenerDomiciliosPorCriterio,
};
