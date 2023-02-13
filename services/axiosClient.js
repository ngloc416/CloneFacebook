import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosClient = axios.create({
  baseURL: 'http://172.20.10.4:5000/it4788',
  headers: {
    'content-type': 'application/json',
  },
  responseType: 'json',
  // paramsSerializer: params => { return queryString.stringify(params)},
});

axiosClient.interceptors.request.use(async (config) => {
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    console.log(error);
    if (error.code === 'ERR_NETWORK') {
      return {
        code: 'ERR_NETWORK',
      };
    }
    return error.response.data;
  }
);
export default axiosClient;
