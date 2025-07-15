import axios from 'axios';

const ESP32_URL = process.env.ESP32_URL || 'http://192.168.4.1/data';

export const fetchEsp32Data = async () => {
  const response = await axios.get(ESP32_URL, { timeout: 3000 });

  if (!response.data || typeof response.data !== 'object') {
    throw new Error('Invalid ESP32 response');
  }

  return response.data;
};
