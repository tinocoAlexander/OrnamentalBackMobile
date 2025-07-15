import { Schema, model } from 'mongoose';

const NotificationSchema = new Schema({
  type: {
    type: String,
    enum: ['obstacle', 'low_battery', 'maintenance', 'session_complete', 'error', 'connection'],
    required: true,
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Number, required: true },
  read: { type: Boolean, default: false },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
}, { timestamps: true });

export const Notification = model('Notification', NotificationSchema);
