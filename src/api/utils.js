import axios from "axios";
import { BASE_URL } from "./constants";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
});

const getHeaders = async () => {
  try {
    const value = await localStorage.getItem("ZENYLOG::USER_AUTH");
    const valueJ = value != null ? JSON.parse(value) : null;
    if (valueJ && valueJ.userDetails.token) {
      return { Authorization: "Token " + valueJ.userDetails.token };
    } else {
      return {};
    }
  } catch {
    return {

    };
  }
};

export const proceedGet = (url, params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const headers = await getHeaders();
      const response = await instance.get(url, {
        headers: headers,
      });
      logResponse(response);

      if (response.data) {
        if (response.data.message) {
          // Toast.show(response.data.message);
        } else if (response.data.error_message) {
          // Toast.show(response.data.error_message);
        }
      }

      resolve(response.data);
    } catch (e) {
      // Toast.show('Something went wrong. Please try again later');
      console.log("Error", e.message);
      reject(e);
    }
  });
};

export const proceedPost = (url, params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const headers = await getHeaders();
      const response = await instance.post(url, params, {
        headers: headers,
      });
      logResponse(response);
      if (response.data) {
        if (response.data.message) {
          // Toast.show(response.data.message);
        } else if (response.data.error_message) {
          // Toast.show(response.data.error_message);
        }
      }

      resolve(response.data);
    } catch (e) {
      console.log("Error", e.message);
      // Toast.show('Something went wrong. Please try again later');
      reject(e);
    }
  });
};

const logResponse = (response) => {
  // console.log(response.data);
  // console.log(response.status);
  // console.log(response.statusText);
  // console.log(response.headers);
  // console.log(response.config);
};
