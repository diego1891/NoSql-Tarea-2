import { Router } from 'express';
import {agregarPersona} from '../controllers/personaController.js';


const router = Router();


// Ruta para agregar una persona
router.post('/agregar', agregarPersona);

export default router
