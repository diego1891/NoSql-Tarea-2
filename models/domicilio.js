import { Schema, model } from "mongoose";

const direccionSchema = new Schema({
  Departamento: String,
  Localidad: String,
  Calle: String,
  Nro: String,
  Apartamento: String,
  Padron: String,
  Ruta: String,
  Km: Number,
  Letra: String,
  Barrio: String,
});

const domicilioSchema = new Schema({
  Datos_Persona: {
    type: String,
    ref: "Persona",
    required: true,
  },
  Direccion: direccionSchema,
});

export default model("Domicilio", domicilioSchema);
