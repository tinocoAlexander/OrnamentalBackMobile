import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {
  createNotification,
  getNotifications,
  markAsRead,
  deleteNotification,
  deleteAllNotifications
} from '../services/notification.service';
import { Notification } from '../models/Notification';

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

afterEach(async () => {
  await Notification.deleteMany();
});

describe('Notification Service', () => {
  it('should create a notification', async () => {
    const data = {
      type: 'obstacle',
      title: 'Obstacle detected',
      message: 'An obstacle was detected',
      timestamp: Date.now()
    };
    const result = await createNotification(data);
    expect(result).toHaveProperty('_id');
    expect(result.title).toBe('Obstacle detected');
  });

  it('should fetch notifications', async () => {
    await createNotification({
      type: 'maintenance',
      title: 'Maintenance required',
      message: 'Time for maintenance',
      timestamp: Date.now()
    });
    const notifications = await getNotifications();
    expect(notifications.length).toBe(1);
  });

  it('should mark a notification as read', async () => {
  const notif = await createNotification({
    type: 'error',
    title: 'Error',
    message: 'Something went wrong',
    timestamp: Date.now()
  });
  const updated = await markAsRead(notif._id.toString());
  expect(updated).not.toBeNull();
  expect(updated?.read).toBe(true);
});

  it('should delete a notification', async () => {
    const notif = await createNotification({
      type: 'connection',
      title: 'Disconnected',
      message: 'Lost connection',
      timestamp: Date.now()
    });
    const deleted = await deleteNotification(notif._id.toString());
    expect(deleted).not.toBeNull();
  });

  it('should delete all notifications', async () => {
    await createNotification({
      type: 'maintenance',
      title: 'Maintenance',
      message: 'Test',
      timestamp: Date.now()
    });
    await deleteAllNotifications();
    const all = await getNotifications();
    expect(all.length).toBe(0);
  });
});
