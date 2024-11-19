import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Cambia a tu dirección si usas un servidor remoto

export const getData = async () => {
  try {
    const response = await axios.get(`${API_URL}/data`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const postData = async (newData) => {
  try {
    const response = await axios.post(`${API_URL}/data`, newData);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
