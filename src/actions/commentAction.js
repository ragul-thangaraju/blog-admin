import { ACTION_TYPES } from "./types";
import { myLog } from "../utils/utility";
import Client from "../utils/axiosInstance";
import { API_ENDPOINT } from "../config";

export const getComments = (params, callback) => {
  return async (dispatch) => {
    try {
      const response = await Client.get(
        API_ENDPOINT.GET_COMMENTS,
        params,
        true
      );
      myLog(response, "---get coments response----");
      if (response.code === 0) {
        myLog("success", "---get coments response----");
        dispatch({
          type: ACTION_TYPES.SET_COMMENTS,
          payload: response.data,
        });
        callback(true);
      } else {
        callback(false);
      }
    } catch (error) {
      myLog(error, "--get coments error--");
      callback(false);
    }
  };
};

export const rejectComment = (params, callback) => {
  return async (dispatch) => {
    try {
      const response = await Client.put(
        API_ENDPOINT.REJECT_COMMENTS,
        params,
        true
      );
      myLog(response, "---comment reject response----");
      if (response.code === 0) {
        myLog("success", "---comment reject response----");
        dispatch({
          type: ACTION_TYPES.SET_COMMENTS,
          payload: response.data,
        });
        callback(true, response);
      } else {
        callback(false, response);
      }
    } catch (error) {
      myLog(error, "--comment reject error--");
      callback(false, error);
    }
  };
};

export const approveComment = (params, callback) => {
  return async (dispatch) => {
    try {
      const response = await Client.put(
        API_ENDPOINT.APPROVE_COMMENTS,
        params,
        true
      );
      myLog(response, "---comment approve response----");
      if (response.code === 0) {
        myLog("success", "---comment approve response----");
        dispatch({
          type: ACTION_TYPES.SET_COMMENTS,
          payload: response.data,
        });
        callback(true, response);
      } else {
        callback(false, response);
      }
    } catch (error) {
      myLog(error, "--comment approve error--");
      callback(false, error);
    }
  };
};
