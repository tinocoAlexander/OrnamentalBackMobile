import { Request, Response } from 'express';
import { fetchEsp32Data } from '../services/esp32.service';
import { successResponse, errorResponse } from '../utils/response';
import { logger } from '../utils/logger';

export const getEsp32Data = async (_req: Request, res: Response) => {
  try {
    const data = await fetchEsp32Data();
    res.json(successResponse(data, 'ESP32 data fetched'));
  } catch (err: any) {
    logger.error(err);
    res.status(500).json(errorResponse(err.message, 500));
  }
};
