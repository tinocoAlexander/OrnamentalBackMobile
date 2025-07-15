import { Session } from '../models/Session';

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

export const getSessionsService = async () => {
  return Session.find().sort({ createdAt: -1 });
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

export const updateSessionStatusService = async (id: string, status: string) => {
  const allowedStatuses = ['mapping', 'cutting', 'completed', 'interrupted', 'mapping_completed'];
  if (!allowedStatuses.includes(status)) throw new Error('Invalid status');

  const session = await Session.findById(id);
  if (!session) throw new Error('Session not found');

  session.status = status;
  if (status === 'completed' || status === 'interrupted') {
    session.endTime = Date.now();
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
