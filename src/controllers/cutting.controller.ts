import { Request, Response } from 'express';
import { generateCuttingPathService } from '../services/cutting.service';
import { successResponse, errorResponse } from '../utils/response';
import { logger } from '../utils/logger';

export const generateCuttingPath = async (req: Request, res: Response) => {
  try {
    const session = await generateCuttingPathService(req.params.id);
    res.json(successResponse(session, 'Cutting path generated successfully'));
  } catch (err: any) {
    logger.error(err);
    res.status(500).json(errorResponse(err.message, 500));
  }
};
