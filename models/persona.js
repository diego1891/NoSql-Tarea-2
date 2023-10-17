import {Schema,model} from 'mongoose'

const personaSchema = new Schema({
    CI: {
        type: String,
        required: true,
        unique: true,
      },
      Nombre: String,
      Apellido: String,
      Edad: Number,
});

export default model('Persona', personaSchema);