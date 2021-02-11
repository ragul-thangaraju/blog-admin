import { combineReducers } from "redux";
import { currentUser } from "./loginReducer";
import { user } from "./userReducer";
import { post } from "./postReducer";
import { comment } from "./commentReducer";

/**
 * Combining all objects to redux store
 */
export default combineReducers({
  currentUser,
  user,
  post,
  comment,
});
