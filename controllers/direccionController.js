import Direccion from "../models/direccion.js";

// Agregar Dirección
const agregarDireccion = async (req, res) => {
  try {
    const {
      Id,
      Departamento,
      Localidad,
      Calle,
      Nro,
      Apartamento,
      Padrón,
      Ruta,
      Km,
      Letra,
      Barrio,
    } = req.body;

    // Verifica si los campos son nulos y reemplaza con "vacio" si es necesario
    const departamentoValido = Departamento || "vacio";
    const localidadValida = Localidad || "vacio";
    const calleValida = Calle || "vacio";
    const nroValido = Nro || "vacio";
    const apartamentoValido = Apartamento || "vacio";
    const padronValido = Padrón || "vacio";
    const rutaValida = Ruta || "vacio";
    const kmValido = Km || "vacio";
    const letraValida = Letra || "vacio";
    const barrioValido = Barrio || "vacio";

    const nuevaDireccion = new Direccion({
      Id,
      Departamento: departamentoValido,
      Localidad: localidadValida,
      Calle: calleValida,
      Nro: nroValido,
      Apartamento: apartamentoValido,
      Padrón: padronValido,
      Ruta: rutaValida,
      Km: kmValido,
      Letra: letraValida,
      Barrio: barrioValido,
    });

    await nuevaDireccion.save();

    res.status(201).json(nuevaDireccion);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar dirección" });
  }
};

export { agregarDireccion };
