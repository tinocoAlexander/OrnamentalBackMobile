import { SensorData } from '../models/SensorData';

export const saveSensorData = async (data: any) => {
  const sensorData = new SensorData(data);
  return sensorData.save();
};

export const getLatestSensorData = async () => {
  return SensorData.find().sort({ timestamp: -1 }).limit(10);
};

export const getAllSensorData = async () => {
  return SensorData.find().sort({ timestamp: -1 });
};

export const deleteAllSensorData = async () => {
  return SensorData.deleteMany({});
};
