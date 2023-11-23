import "@testing-library/jest-dom/extend-expect";

import app from '../index';
import mongoose from 'mongoose';

beforeAll(async () => {
  await app.listen(3000);

  await mongoose.connect('mongodb://localhost:27017/Datos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await app.close();
  await mongoose.connection.close();
});

export default app;