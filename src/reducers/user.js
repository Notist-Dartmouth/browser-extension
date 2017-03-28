import * as types from '../constants/ActionTypes';

const initialState = {
  isAuthenticated: false,
  groupIds: [],
  username: '',
};

function user(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_USER:
      return Object.assign({}, state, {
        groupIds: action.groupIds,
        username: action.username,
      });
    case types.UPDATE_AUTH_STATUS:
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated,
      });
    default:
      return state;
  }
}

export default user;
