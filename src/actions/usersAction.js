import { ACTION_TYPES } from "./types";
import { myLog } from "../utils/utility";
import Client from "../utils/axiosInstance";
import { API_ENDPOINT } from "../config";

export const getUsers = (params, callback) => {
  return async (dispatch) => {
    try {
      const response = await Client.get(API_ENDPOINT.GET_USERS, params, true);
      myLog(response, "---get users response----");
      if (response.code === 0) {
        myLog("success", "---get users response----");
        dispatch({
          type: ACTION_TYPES.SET_USERS,
          payload: response.data,
        });
        callback(true);
      } else {
        callback(false);
      }
    } catch (error) {
      myLog(error, "--get users error--");
      callback(false);
    }
  };
};

export const deleteUser = (params, callback) => {
  return async (dispatch) => {
    try {
      const response = await Client.delete(
        API_ENDPOINT.DELETE_USER,
        params,
        true
      );
      myLog(response, "---user delete response----");
      if (response.code === 0) {
        myLog("success", "---user delete response----");
        dispatch({
          type: ACTION_TYPES.SET_USERS,
          payload: response.data,
        });
        callback(true, response);
      } else {
        callback(false, response);
      }
    } catch (error) {
      myLog(error, "--user delete error--");
      callback(false, error);
    }
  };
};
