import { Request, Response } from 'express';
import {
  createNotification,
  getNotifications,
  markAsRead,
  deleteNotification,
  deleteAllNotifications
} from '../services/notification.service';
import { successResponse, errorResponse } from '../utils/response';
import { logger } from '../utils/logger';

export const create = async (req: Request, res: Response) => {
  try {
    const notification = await createNotification(req.body);
    res.status(201).json(successResponse(notification, 'Notification created'));
  } catch (err: any) {
    logger.error(err);
    res.status(500).json(errorResponse(err.message, 500));
  }
};

export const list = async (_req: Request, res: Response) => {
  try {
    const notifications = await getNotifications();
    res.json(successResponse(notifications, 'Notifications fetched'));
  } catch (err: any) {
    logger.error(err);
    res.status(500).json(errorResponse(err.message, 500));
  }
};

export const read = async (req: Request, res: Response) => {
  try {
    const notification = await markAsRead(req.params.id);
    res.json(successResponse(notification, 'Notification marked as read'));
  } catch (err: any) {
    logger.error(err);
    res.status(500).json(errorResponse(err.message, 500));
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await deleteNotification(req.params.id);
    res.json(successResponse(null, 'Notification deleted'));
  } catch (err: any) {
    logger.error(err);
    res.status(500).json(errorResponse(err.message, 500));
  }
};

export const removeAll = async (_req: Request, res: Response) => {
  try {
    await deleteAllNotifications();
    res.json(successResponse(null, 'All notifications deleted'));
  } catch (err: any) {
    logger.error(err);
    res.status(500).json(errorResponse(err.message, 500));
  }
};
