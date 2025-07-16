import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { startSessionService } from '../services/session.service';
import { generateCuttingPathService } from '../services/cutting.service';
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

describe('Cutting Service', () => {
  it('should generate cutting path from mapping path', async () => {
    const session = await startSessionService();

    // simula un mappingPath para que pueda calcular
    session.mappingPath.push({ x: 0, y: 0, timestamp: Date.now() });
    session.mappingPath.push({ x: 2, y: 2, timestamp: Date.now() });
    await session.save();

    const updated = await generateCuttingPathService(session.id);
    expect(updated.cuttingPath.length).toBeGreaterThan(0);
  });
});
