import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import cuttingRoutes from '../routes/cutting.routes';
import sessionRoutes from '../routes/session.routes';

const app = express();
app.use(express.json());
app.use('/api/cutting', cuttingRoutes);
app.use('/api/sessions', sessionRoutes);

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

describe('Cutting Routes', () => {
  let sessionId: string;

  beforeEach(async () => {
    // crea una sesión con mappingPath
    const res = await request(app).post('/api/sessions/start');
    sessionId = res.body.data._id;

    await mongoose.connection.collection('sessions').updateOne(
      { _id: new mongoose.Types.ObjectId(sessionId) },
      { $set: { mappingPath: [{ x: 0, y: 0, timestamp: Date.now() }, { x: 2, y: 2, timestamp: Date.now() }] } }
    );
  });

  it('POST /api/cutting/:id/generate', async () => {
    const res = await request(app).post(`/api/cutting/${sessionId}/generate`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.cuttingPath.length).toBeGreaterThan(0);
  });
});
