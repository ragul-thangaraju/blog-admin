import { ACTION_TYPES } from "../actions/types";

const INITIAL_STATE = {
  commentList: [],
};

export const comment = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_COMMENTS:
      return {
        ...state,
        commentList: action.payload,
      };
    default:
      return state;
  }
};
