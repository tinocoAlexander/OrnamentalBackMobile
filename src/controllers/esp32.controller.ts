import { Request, Response } from 'express';
import { fetchEsp32Data } from '../services/esp32.service';

export const getEsp32Data = async (_req: Request, res: Response) => {
  try {
    const data = await fetchEsp32Data();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Failed to fetch ESP32 data' });
  }
};
