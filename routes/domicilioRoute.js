import { Router } from 'express';
import {agregarDomicilio, consultarDomicilioPorCI, obtenerDomiciliosPorCriterio} from '../controllers/domicilioController.js';

const router = Router();

// Ruta para agregar un domicilio
router.post('/agregar', agregarDomicilio);

// Ruta para consultar domicilios por cédula de persona
router.get('/consultar/:CI', consultarDomicilioPorCI);

router.get('/consultar', obtenerDomiciliosPorCriterio);

export default router

