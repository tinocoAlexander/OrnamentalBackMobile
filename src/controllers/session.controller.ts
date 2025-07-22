import { Request, Response } from 'express';
import {
  startSessionService,
  getSessionsService,
  updateSessionPathService,
  updateSessionStatusService,
  getSessionByIdService,
  deleteSessionService,
  getLatestSessionService 
} from '../services/session.service';
import { successResponse, errorResponse } from '../utils/response';
import { logger } from '../utils/logger';

export const startSession = async (_req: Request, res: Response) => {
  try {
    const session = await startSessionService();
    res.status(201).json(successResponse(session, 'Session started'));
  } catch (error: any) {
    logger.error(error);
    res.status(500).json(errorResponse(error.message, 500));
  }
};

export const getSessions = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await getSessionsService(page, limit);

    res.json(successResponse(result, 'Sessions fetched'));
  } catch (error: any) {
    logger.error(error);
    res.status(500).json(errorResponse(error.message, 500));
  }
};
export const updateSessionPath = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { position, phase } = req.body;

  if (!['mapping', 'cutting'].includes(phase)) {
    return res.status(400).json(errorResponse('Invalid phase', 400));
  }

  try {
    const session = await updateSessionPathService(id, position, phase);
    res.json(successResponse(session, 'Session path updated'));
  } catch (error: any) {
    logger.error(error);
    res.status(500).json(errorResponse(error.message, 500));
  }
};

export const updateSessionStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const session = await updateSessionStatusService(id, status);
    res.json(successResponse(session, 'Session status updated'));
  } catch (error: any) {
    logger.error(error);
    res.status(500).json(errorResponse(error.message, 500));
  }
};

export const getSessionById = async (req: Request, res: Response) => {
  try {
    const session = await getSessionByIdService(req.params.id);
    res.json(successResponse(session, 'Session fetched'));
  } catch (err: any) {
    logger.error(err);
    res.status(err.status || 500).json(errorResponse(err.message, err.status || 500));
  }
};

export const deleteSession = async (req: Request, res: Response) => {
  try {
    const session = await deleteSessionService(req.params.id);
    res.json(successResponse(session, 'Session deleted'));
  } catch (err: any) {
    logger.error(err);
    res.status(err.status || 500).json(errorResponse(err.message, err.status || 500));
  }
};

export const getLatestSession = async (_req: Request, res: Response) => {
  try {
    const session = await getLatestSessionService();
    if (!session) {
      return res.status(404).json(errorResponse('No recent session found', 404));
    }
    res.json(successResponse(session, 'Latest session fetched'));
  } catch (error: any) {
    logger.error(error);
    res.status(500).json(errorResponse(error.message, 500));
  }
};