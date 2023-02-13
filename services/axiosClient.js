import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosClient = axios.create({
  baseURL: 'http://192.168.1.193:5000/it4788',
  headers: {
  'content-type': 'application/json',
  },
  responseType: 'json',
  // paramsSerializer: params => { return queryString.stringify(params)},
});

axiosClient.interceptors.request.use(async (config) => {
  return config;
})
axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }
  return response;
  }, (error) => {
    console.log(error);
    return error.response.data;
});
export default axiosClient;