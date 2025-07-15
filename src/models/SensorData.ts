import { Schema, model } from 'mongoose';

const SensorDataSchema = new Schema({
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  timestamp: { type: Number, required: true },
}, { timestamps: true });

export const SensorData = model('SensorData', SensorDataSchema);
