import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import notificationRoutes from '../routes/notification.routes';

const app = express();
app.use(express.json());
app.use('/api/notifications', notificationRoutes);

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

describe('Notification Routes', () => {
  let notifId: string;

  it('POST /api/notifications', async () => {
    const res = await request(app)
      .post('/api/notifications')
      .send({
        type: 'obstacle',
        title: 'Test Notification',
        message: 'Notification message',
        timestamp: Date.now()
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    notifId = res.body.data._id;
  });

  it('GET /api/notifications', async () => {
    const res = await request(app).get('/api/notifications');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('PATCH /api/notifications/:id/read', async () => {
    const res = await request(app).patch(`/api/notifications/${notifId}/read`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('DELETE /api/notifications/:id', async () => {
    const res = await request(app).delete(`/api/notifications/${notifId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('DELETE /api/notifications', async () => {
    const res = await request(app).delete('/api/notifications');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
