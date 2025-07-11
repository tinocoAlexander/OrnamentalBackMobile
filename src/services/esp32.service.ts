import axios from 'axios';

const ESP32_URL = process.env.ESP32_URL || 'http://192.168.4.1/data';

export const fetchEsp32Data = async () => {
  try {
    const response = await axios.get(ESP32_URL, { timeout: 3000 });

    if (!response.data || typeof response.data !== 'object') {
      throw new Error('Invalid ESP32 response');
    }

    return response.data;

  } catch (err: any) {
    console.error('Error fetching data from ESP32:', err.message);
    throw new Error('Failed to fetch ESP32 data');
  }
};
