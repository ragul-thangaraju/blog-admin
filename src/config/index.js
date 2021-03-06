let apiBaseUrl = "";
let isDevelopment = true;

if (window.location.hostname === "localhost") {
  apiBaseUrl = "http://localhost:5000/";
  isDevelopment = true;
} else {
  apiBaseUrl = "";
  isDevelopment = false;
}

export const IS_DEVELOPMENT = isDevelopment;
export const API_BASE_URL = apiBaseUrl;

/**
 * REST API endpoints
 */
export const API_ENDPOINT = {
  LOGIN: "/adminLogin",
  GET_USERS: "/getUsers",
  DELETE_USER: "/user/deleteUser",
  DELETE_POST: "/deletePost",
  ADD_POST: "/addPost",
  GET_POST: "/getPost",
  EDIT_POST: "/editPost",
  GET_COMMENTS: "/getLatestCommets",
  REJECT_COMMENTS: "/rejectComment",
  APPROVE_COMMENTS: "/approveComment",
};
