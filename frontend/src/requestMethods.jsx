import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_API_KEY;

const publicRequest = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

export default publicRequest;
