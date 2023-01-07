import axios from "axios";
import { ASYN_USER_AUTH } from '@utils'

//apply base url for axios
const STAGING = 'http://43.204.233.45/';

const LOCAL_DEV = 'http://192.168.228.136:8001';
// const LOCAL_DEV = 'http://15.206.224.132:8000';

const LOCAL_PROD = 'http://192.168.17.136:8008';

const SAMPLE_IP = 'http://3.109.244.227:8000';

const PROD = 'https://api.zenyq.com';


export const REACT_APP_APP_URL = LOCAL_DEV ;
// 'http://localhost:8000' 
// 'http://43.204.233.45' 
// process.env.REACT_APP_APP_URL;


const axiosApi = axios.create({
  baseURL: REACT_APP_APP_URL,
});

axios.interceptors.request.use(function (config) {
  return config;
});


const getHeaders = async () => {

  try {
    const value = await localStorage.getItem(ASYN_USER_AUTH);
    if (value) {
      return { Authorization: "Token " + value };
    } else {
      return {};
    }
  } catch {
    return {

    };
  }
};

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export async function get(url, config) {
  return await axiosApi
    .get(url, {
      ...config,
      headers: await getHeaders(),

    })
    .then((response) => response.data);
}

export async function post(url, data, config) {
  let headers = { ...await getHeaders() }
  return await axiosApi
    .post(url, data, {
      ...config,
      headers: headers,
    })
    .then((response) => {
      return response.data
    });
}


export async function postHeader(url, data, config) {
  let headers = { ...await getHeaders() }
  return await axiosApi
    .post(url, data, {
      ...config,
      headers: headers,
    })
    .then((response) => {
      return response
    });
}