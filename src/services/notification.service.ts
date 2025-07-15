import { Notification } from '../models/Notification';

export const createNotification = async (data: any) => {
  const notification = new Notification(data);
  return notification.save();
};

export const getNotifications = async () => {
  return Notification.find().sort({ createdAt: -1 });
};

export const markAsRead = async (id: string) => {
  return Notification.findByIdAndUpdate(id, { read: true }, { new: true });
};

export const deleteNotification = async (id: string) => {
  return Notification.findByIdAndDelete(id);
};

export const deleteAllNotifications = async () => {
  return Notification.deleteMany({});
};
