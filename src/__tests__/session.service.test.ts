import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { startSessionService, getSessionsService } from '../services/session.service';
import { Session } from '../models/Session';

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

afterEach(async () => {
  await Session.deleteMany();
});

describe('Session Service', () => {
  it('should start a session', async () => {
    const session = await startSessionService();
    expect(session).toHaveProperty('_id');
    expect(session.status).toBe('mapping');
  });

  it('should fetch sessions', async () => {
    await startSessionService();
    const sessions = await getSessionsService();
    expect(sessions.length).toBeGreaterThan(0);
  });
});
