import { Request, Response } from 'express';
import {
  saveSensorData,
  getLatestSensorData,
  getAllSensorData,
  deleteAllSensorData
} from '../services/sensor.service';
import { fetchEsp32Data } from '../services/esp32.service';
import { successResponse, errorResponse } from '../utils/response';
import { logger } from '../utils/logger';

export const create = async (req: Request, res: Response) => {
  try {
    const data = await saveSensorData(req.body);
    res.status(201).json(successResponse(data, 'Sensor data saved'));
  } catch (err: any) {
    logger.error(err);
    res.status(500).json(errorResponse(err.message, 500));
  }
};

export const latest = async (_req: Request, res: Response) => {
  try {
    const data = await getLatestSensorData();
    res.json(successResponse(data, 'Latest sensor data fetched'));
  } catch (err: any) {
    logger.error(err);
    res.status(500).json(errorResponse(err.message, 500));
  }
};

export const all = async (_req: Request, res: Response) => {
  try {
    const data = await getAllSensorData();
    res.json(successResponse(data, 'All sensor data fetched'));
  } catch (err: any) {
    logger.error(err);
    res.status(500).json(errorResponse(err.message, 500));
  }
};

export const clear = async (_req: Request, res: Response) => {
  try {
    await deleteAllSensorData();
    res.json(successResponse(null, 'All sensor data deleted'));
  } catch (err: any) {
    logger.error(err);
    res.status(500).json(errorResponse(err.message, 500));
  }
};


export const stream = (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const interval = setInterval(async () => {
    try {
      const data = await fetchEsp32Data();
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    } catch (err) {
      logger.error(err);
      res.write(`event: error\ndata: ${JSON.stringify({ error: err.message })}\n\n`);
    }
  }, 1000);

  _req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
};
