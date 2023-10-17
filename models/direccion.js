import { Schema, model } from 'mongoose';

const direccionSchema = new Schema({
    Id: Number,
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

export default model('Direccion', direccionSchema);
