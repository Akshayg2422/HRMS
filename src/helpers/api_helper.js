import axios from "axios";
import { ASYN_USER_AUTH } from '@utils'

//apply base url for axios
const STAGING = 'http://43.204.233.45/';

const LOCAL_DEV = 'http://192.168.251.204:8000';
// const LOCAL_DEV = 'http://15.206.224.132:8000';

const LOCAL_PROD = 'http://192.168.191.204:8000';

const PRE_PROD = 'http://15.206.224.132'

const SAMPLE_IP = 'http://3.109.244.227:8000';

// const PROD = 'https://api.zenyq.com';
const PROD_WEB = 'https://webapi.zenyq.com';


export const REACT_APP_APP_URL = LOCAL_PROD;
// 'http://localhost:8000' 
// 'http://43.204.233.45' 
// process.env.REACT_APP_APP_URL;

export const BASE_URL_AUTH_PROD = 'https://webauth.zenyq.com'; ////

export const BASE_URL_REPORTS_PROD = 'https://reports.zenyq.com'; ////

export const BASE_URL_VALIDATE_USER_PROD = 'https://validateuser.zenyq.com'; ////

export const BASE_URL_ONBOARD_PROD = 'https://onboard.zenyq.com'; ////


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

export async function post(url, data, config, baseUrlType) {

  baseUrlType = baseUrlType || REACT_APP_APP_URL

  const baseUrl = axios.create({
    baseURL: baseUrlType,
  });

  let headers = { ...await getHeaders() }

  return await baseUrl
    .post(url, data, {
      ...config,
      headers: headers,
    })
    .then((response) => {
      return response.data
    });
}


export async function postHeader(url, data, config, baseUrlType) {
  baseUrlType = baseUrlType || REACT_APP_APP_URL

  const baseUrl = axios.create({
    baseURL: baseUrlType,
  });

  let headers = { ...await getHeaders() }

  return await baseUrl
    .post(url, data, {
      ...config,
      headers: headers,
    })
    .then((response) => {
      return response
    });
}