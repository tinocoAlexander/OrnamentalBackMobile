import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import sessionRoutes from '../routes/session.routes';

const app = express();
app.use(express.json());
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

describe('Session Routes', () => {
  let sessionId: string;

  it('POST /api/sessions/start', async () => {
    const res = await request(app).post('/api/sessions/start');
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    sessionId = res.body.data._id;
  });

  it('GET /api/sessions', async () => {
    const res = await request(app).get('/api/sessions');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('PATCH /api/sessions/:id/path', async () => {
    const res = await request(app)
      .patch(`/api/sessions/${sessionId}/path`)
      .send({
        position: { x: 1, y: 1, timestamp: Date.now() },
        phase: 'mapping'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('PATCH /api/sessions/:id/status', async () => {
    const res = await request(app)
      .patch(`/api/sessions/${sessionId}/status`)
      .send({ status: 'completed' });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('GET /api/sessions/:id', async () => {
    const res = await request(app).get(`/api/sessions/${sessionId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('DELETE /api/sessions/:id', async () => {
    const res = await request(app).delete(`/api/sessions/${sessionId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
