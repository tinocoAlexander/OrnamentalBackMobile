import { Request, Response } from 'express';
import {
  startSessionService,
  getSessionsService,
  updateSessionPathService,
  updateSessionStatusService,
  getSessionByIdService,
  deleteSessionService
} from '../services/session.service';

export const startSession = async (_req: Request, res: Response) => {
  try {
    const session = await startSessionService();
    res.status(201).json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to start session' });
  }
};

export const getSessions = async (_req: Request, res: Response) => {
  try {
    const sessions = await getSessionsService();
    res.json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get sessions' });
  }
};

export const updateSessionPath = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { position, phase } = req.body;

  if (!['mapping', 'cutting'].includes(phase)) {
    return res.status(400).json({ message: 'Invalid phase' });
  }

  try {
    const session = await updateSessionPathService(id, position, phase);
    res.json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateSessionStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const session = await updateSessionStatusService(id, status);
    res.json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getSessionById = async (req: Request, res: Response) => {
  try {
    const session = await getSessionByIdService(req.params.id);
    res.json(session);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const deleteSession = async (req: Request, res: Response) => {
  try {
    const session = await deleteSessionService(req.params.id);
    res.json({ message: 'Session deleted', session });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};