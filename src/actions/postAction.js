import { ACTION_TYPES } from "./types";
import { myLog } from "../utils/utility";
import Client from "../utils/axiosInstance";
import { API_ENDPOINT } from "../config";

export const getPost = (params, callback) => {
  return async (dispatch) => {
    try {
      const response = await Client.get(API_ENDPOINT.GET_POST, params, true);
      myLog(response, "---get post response----");
      if (response.code === 0) {
        myLog("success", "---get post response----");
        dispatch({
          type: ACTION_TYPES.SET_POST,
          payload: response.data,
        });
        callback(true);
      } else {
        callback(false);
      }
    } catch (error) {
      myLog(error, "--get post error--");
      callback(false);
    }
  };
};

export const addPost = (params, callback) => {
  return async (dispatch) => {
    try {
      const response = await Client.post(API_ENDPOINT.ADD_POST, params, true);
      myLog(response, "---post add response----");
      if (response.code === 0) {
        myLog("success", "---post add response----");
        dispatch({
          type: ACTION_TYPES.SET_POST,
          payload: response.data,
        });
        callback(true, response);
      } else {
        callback(false, response);
      }
    } catch (error) {
      myLog(error, "--post add error--");
      callback(false, error);
    }
  };
};

export const editPost = (params, callback) => {
  return async (dispatch) => {
    try {
      const response = await Client.put(API_ENDPOINT.EDIT_POST, params, true);
      myLog(response, "---post edit response----");
      if (response.code === 0) {
        myLog("success", "---post edit response----");
        dispatch({
          type: ACTION_TYPES.SET_POST,
          payload: response.data,
        });
        callback(true, response);
      } else {
        callback(false, response);
      }
    } catch (error) {
      myLog(error, "--post edit error--");
      callback(false, error);
    }
  };
};

export const deletePost = (params, callback) => {
  return async (dispatch) => {
    try {
      const response = await Client.delete(
        API_ENDPOINT.DELETE_POST,
        params,
        true
      );
      myLog(response, "---post delete response----");
      if (response.code === 0) {
        myLog("success", "---post delete response----");
        dispatch({
          type: ACTION_TYPES.SET_POST,
          payload: response.data,
        });
        callback(true, response);
      } else {
        callback(false, response);
      }
    } catch (error) {
      myLog(error, "--post delete error--");
      callback(false, error);
    }
  };
};
