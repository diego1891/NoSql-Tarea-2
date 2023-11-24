import { response } from "express";
import Domicilio from "../models/domicilio.js";
import Persona from "../models/persona.js";
import Direccion from "../models/direccion.js";
import { getAsync, client } from "../database/redis.js";

// Agregar Domicilio
const agregarDomicilio = async (req, res = response) => {
  try {
    const { personaCI, Direccion } = req.body;
    const cacheKey = `domicilio:${personaCI}`;

    console.log(personaCI + "linea11" + Direccion);

    const personaExistente = await Persona.findOne({ CI: personaCI });

    if (!personaExistente) {
      return res
        .status(402)
        .json({ mensaje: "No existe una persona con esa CI" });
    }

    const nuevoDomicilio = new Domicilio({
      Datos_Persona: personaCI,
      Direccion,
    });

    await nuevoDomicilio.save();

    const cachedData = await client.get(cacheKey);
    console.log({ cachedData });
    if (cachedData) {
      client.del(cacheKey);
      console.log("El caché fue limpiado");
    }

    res.status(201).json(nuevoDomicilio);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar domicilio" });
  }
};

const consultarDomicilioPorCI = async (req, res = response) => {
  const CI = req.params.CI;
  const cacheKey = `domicilio:${CI}`;

  try {
    const cachedData = await client.get(cacheKey);
    console.log({ cachedData });
    if (cachedData) {
      console.log("Datos obtenidos de la caché.");
      return res.status(200).json(JSON.parse(cachedData));
    }

    const persona = await Persona.findOne({ CI });

    if (!persona) {
      return res
        .status(402)
        .json({ mensaje: "No existe una persona con la cédula proporcionada" });
    }

    console.log("El cliente" + client);
    const domicilios = await Domicilio.find({ Datos_Persona: persona.CI })
      .populate("Direccion")
      .sort({ _id: -1 });
    console.log("Hola");
    client.setEx(cacheKey, 3600, JSON.stringify(domicilios));

    console.log("Datos obtenidos de MongoDB y almacenados en la caché.");
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

  const cacheKey = JSON.stringify(criterios);

  const cachedData = await getAsync(cacheKey);

  try {
    if (cachedData) {
      const domicilios = JSON.parse(cachedData);
      res.status(200).json(domicilios);
      console.log("Datos obtenidos de la caché.");
    } else {
      const domicilios = await Domicilio.find(criterios).populate("Direccion");

      for (const domicilio of domicilios) {
        const persona = await Persona.findOne({ CI: domicilio.Datos_Persona });
        domicilio.Datos_Persona = persona; 
      }

      res.status(200).json(domicilios);
      console.log("Datos obtenidos de MongoDB y almacenados en la caché.");
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener domicilios por criterio" });
  }
};

export {
  agregarDomicilio,
  consultarDomicilioPorCI,
  obtenerDomiciliosPorCriterio,
};
