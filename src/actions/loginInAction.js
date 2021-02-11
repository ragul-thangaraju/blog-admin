import store from "store";

// import { ACTION_TYPES } from './types'
import { myLog } from "../utils/utility";
import Client from "../utils/axiosInstance";
import { API_ENDPOINT } from "../config";

export const authenticate = (params, callback) => {
  return async () => {
    try {
      const response = await Client.post(API_ENDPOINT.LOGIN, params);
      myLog(response, "---login response----");
      if (response.code === 0) {
        myLog("success", "---login response----");

        if (response.data.userData.type === "ADMIN") {
          store.set("adminSession", response.data);
        } else {
          store.set("userSession", response.data);
        }
        callback(true);
      } else {
        callback(false);
      }
    } catch (error) {
      myLog(error, "--Login error--");
      callback(false);
    }
  };
};

export const register = (params, callback) => {
  return async () => {
    try {
      const response = await Client.post(API_ENDPOINT.REGISTER, params);
      myLog(response, "---register response----");
      if (response.code === 0) {
        myLog("success", "---register response----");
        callback(true, response);
      } else {
        callback(false, response);
      }
    } catch (error) {
      myLog(error, "--register error--");
      callback(false, error);
    }
  };
};
