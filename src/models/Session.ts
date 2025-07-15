import { Schema, model } from 'mongoose';

const SessionSchema = new Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  mappingPath: [{ x: Number, y: Number, timestamp: Number }],
  cuttingPath: [{ x: Number, y: Number, timestamp: Number }],
  areaCovered: { type: Number, default: 0 },
  obstacles: [{
    position: { x: Number, y: Number, timestamp: Number },
    type: { type: String, default: 'ultrasonic' }, 
    severity: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    timestamp: Number
  }],
  status: {
    type: String,
    enum: ['mapping', 'cutting', 'completed', 'interrupted', 'mapping_completed'],
    default: 'mapping'
  },
  sensorData: [{
    temperature: Number,
    humidity: Number,
    timestamp: Number
  }],
  averageTemperature: { type: Number, default: 0 },
  averageHumidity: { type: Number, default: 0 },
}, { timestamps: true });

export const Session = model('Session', SessionSchema);
