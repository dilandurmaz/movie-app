import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const axiosInstance = axios.create({
  baseURL: baseURL,
  params: {
    apikey: apiKey
  }
});

export default axiosInstance;
