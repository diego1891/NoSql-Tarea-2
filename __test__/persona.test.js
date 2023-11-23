import request from 'supertest';
import app from '../index'; // Ajusta la ruta según la ubicación de tu archivo principal

describe('Persona API', () => {
  it('should add a new persona', async () => {
    const response = await request(app)
      .post('/api/persona/agregar')
      .send({
        CI: '123456789',
        Nombre: 'Lorenzo',
        Apellido: 'Martinez',
        Edad: 30,
      });

    expect(response.status).toBe(201);
    expect(response.body.CI).toBe('123456789');
    // Puedes agregar más expectativas según tus necesidades
  });

  // Puedes agregar más pruebas para otras funciones del controlador
});
