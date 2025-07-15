import { Request, Response } from 'express';
import {
  saveSensorData,
  getLatestSensorData,
  getAllSensorData,
  deleteAllSensorData
} from '../services/sensor.service';

export const create = async (req: Request, res: Response) => {
  try {
    const data = await saveSensorData(req.body);
    res.status(201).json(data);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const latest = async (_req: Request, res: Response) => {
  try {
    const data = await getLatestSensorData();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const all = async (_req: Request, res: Response) => {
  try {
    const data = await getAllSensorData();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const clear = async (_req: Request, res: Response) => {
  try {
    await deleteAllSensorData();
    res.json({ message: 'All sensor data deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
