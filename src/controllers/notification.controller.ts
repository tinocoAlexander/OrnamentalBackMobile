import { Request, Response } from 'express';
import {
  createNotification,
  getNotifications,
  markAsRead,
  deleteNotification,
  deleteAllNotifications
} from '../services/notification.service';

export const create = async (req: Request, res: Response) => {
  try {
    const notification = await createNotification(req.body);
    res.status(201).json(notification);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const list = async (_req: Request, res: Response) => {
  try {
    const notifications = await getNotifications();
    res.json(notifications);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const read = async (req: Request, res: Response) => {
  try {
    const notification = await markAsRead(req.params.id);
    res.json(notification);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await deleteNotification(req.params.id);
    res.json({ message: 'Notification deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const removeAll = async (_req: Request, res: Response) => {
  try {
    await deleteAllNotifications();
    res.json({ message: 'All notifications deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
