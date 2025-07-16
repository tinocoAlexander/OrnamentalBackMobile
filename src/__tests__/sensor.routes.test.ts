import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import sensorRoutes from '../routes/sensor.routes';

const app = express();
app.use(express.json());
app.use('/api/sensors', sensorRoutes);

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

describe('Sensor Routes', () => {
  it('POST /api/sensors', async () => {
    const res = await request(app)
      .post('/api/sensors')
      .send({ temperature: 22, humidity: 55, timestamp: Date.now() });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('GET /api/sensors', async () => {
    const res = await request(app).get('/api/sensors');
    expect(res.statusCode).toBe(200);
  });
});
