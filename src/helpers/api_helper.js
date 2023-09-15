import axios from "axios";
import { ASYN_USER_AUTH, DOMAIN } from '@utils'

//apply base url for axios
const STAGING = 'http://3.7.59.39';

const LOCAL_DEV = 'https://e51c-2409-40f4-2b-8213-62c8-de93-db5-c085.ngrok-free.app/';
// const LOCAL_DEV = 'http://15.206.224.132:8000';

const LOCAL_PROD = 'http://103.118.93.204:8002';

const PRE_PROD = 'http://15.206.224.132'

const SAMPLE_IP = 'https://11cc-103-118-189-10.ngrok-free.app/';

const STAGING_WEB = 'https://preprod.zenyq.com/';

// const PROD = 'https://api.zenyq.com';
const PROD_WEB = 'https://webapi.zenyq.com';

const PROD_WEB_2 = 'https://webapi2.zenyq.com';


const PROD_MOBILE = 'https://mobileapi2.zenyq.com';

// export const BASE_URL_REPORTS_PROD_1 = 'https://reports.zenyq.com'; ////



export const REACT_APP_APP_URL = PROD_WEB;
// 'http://localhost:8000' 
// 'http://43.204.233.45' 

// process.env.REACT_APP_APP_URL;

export const BASE_URL_AUTH_PROD = 'https://webauth.zenyq.com'; ////

export const BASE_URL_REPORTS_PROD = 'https://reports.zenyq.com'; ////

export const BASE_URL_VALIDATE_USER_PROD = 'https://validateuserweb.zenyq.com'; ////

export const BASE_URL_ONBOARD_PROD = 'https://onboard.zenyq.com'; ////


// export const BASE_URL_AUTH_PROD = ''; ////

// export const BASE_URL_REPORTS_PROD = ''; ////

// export const BASE_URL_VALIDATE_USER_PROD = ''; ////

// export const BASE_URL_ONBOARD_PROD = ''; ////


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

const BASE_URL_HFWS = "https://hfwsprimary.zenyq.com"
// const BASE_URL_HFWS = "https://275a-103-118-189-4.ngrok-free.app/"

export async function post(url, data, config, baseUrlType) {

  baseUrlType = baseUrlType || REACT_APP_APP_URL

  const isHfws = await localStorage.getItem(DOMAIN);


  const baseUrl = isHfws === 'HFWS' ?
    axios.create({
      baseURL: BASE_URL_HFWS,
    }) : axios.create({
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
  const isHfws = await localStorage.getItem(DOMAIN);


  const baseUrl = isHfws === 'HFWS' ?
    axios.create({
      baseURL: BASE_URL_HFWS,
    }) : axios.create({
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