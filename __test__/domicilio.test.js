// domicilio.test.js
import request from 'supertest';
import app from '../index';

describe('Domicilio API', () => {
  it('should add a new domicilio with another address', async () => {
    const personaCI = '1234567';
    const domicilioData = {
      Direccion: {
        Id: '3',
        Departamento: 'Montevideo',
        Localidad: 'Montevideo',
        Calle: 'Rambla',
        Nro: '123',
        Apartamento: '301',
        Padrón: '789012',
        Ruta: 'Ruta 1',
        Km: '5',
        Letra: 'A',
        Barrio: 'Barrio Costero',
      },
    };

    // Realiza la solicitud para agregar un domicilio
    const response = await request(app)
      .post('/api/domicilio/agregar')
      .send({
        personaCI,
        ...domicilioData,
      });

    // Realiza tus expectativas
    expect(response.status).toBe(201);
    expect(response.body.Datos_Persona).toBe(personaCI);
    // Añade más expectativas según tus necesidades
  });

  // Puedes agregar más pruebas para otras funciones del controlador de domicilios
});
