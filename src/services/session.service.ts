import { Session } from '../models/Session';
import { SensorData } from '../models/SensorData';

export const startSessionService = async () => {
  const session = new Session({
    startTime: Date.now(),
    mappingPath: [],
    cuttingPath: [],
    areaCovered: 0,
    obstacles: [],
    status: 'mapping',
    sensorData: [],
    averageTemperature: 0,
    averageHumidity: 0,
  });
  return session.save();
};

export const getSessionsService = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const sessions = await Session.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Session.countDocuments();

  return {
    sessions,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

export const updateSessionPathService = async (id: string, position: any, phase: string) => {
  const session = await Session.findById(id);
  if (!session) throw new Error('Session not found');

  if (phase === 'mapping') {
    session.mappingPath.push(position);
  } else {
    session.cuttingPath.push(position);
  }

  return session.save();
};

export const updateSessionStatusService = async (
  id: string,
  status: 'mapping' | 'cutting' | 'completed' | 'interrupted' | 'mapping_completed'
) => {
  const session = await Session.findById(id);
  if (!session) throw new Error('Session not found');

  session.status = status;

  if (status === 'completed' || status === 'interrupted') {
    session.endTime = new Date();
  }

  return session.save();
};

export const getSessionByIdService = async (id: string) => {
  const session = await Session.findById(id);
  if (!session) throw { status: 404, message: 'Session not found' };
  return session;
};

export const deleteSessionService = async (id: string) => {
  const session = await Session.findByIdAndDelete(id);
  if (!session) throw { status: 404, message: 'Session not found' };
  return session;
};

export const getLatestSessionService = async () => {
  const session = await Session.findOne().sort({ createdAt: -1 });
  if (!session) return null;

  // 📐 Área mapeada
  const xs = session.mappingPath.map(p => p.x).filter(x => typeof x === 'number');
  const ys = session.mappingPath.map(p => p.y).filter(y => typeof y === 'number');

  if (xs.length > 1 && ys.length > 1) {
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const width = maxX - minX;
    const height = maxY - minY;

    session.areaCovered = Math.abs(width * height);
  }

  // 🌡️ Obtener últimos 10 sensores
  const latestSensors = await SensorData.find().sort({ createdAt: -1 }).limit(10);

  const temps = latestSensors.map(s => s.temperature);
  const hums = latestSensors.map(s => s.humidity);

  session.averageTemperature = temps.length
    ? temps.reduce((a, b) => a + b) / temps.length
    : 0;

  session.averageHumidity = hums.length
    ? hums.reduce((a, b) => a + b) / hums.length
    : 0;

  await session.save();

  return session;
};