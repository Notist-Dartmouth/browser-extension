import * as types from '../constants/ActionTypes';

const initialState = {
  isFetchingUser: false,
  isAuthenticated: false,
  groupIds: [],
  username: '',
};

function user(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_USER:
      return Object.assign({}, state, {
        isFetchingUser: false,
        groupIds: action.groupIds,
        username: action.username,
      });
    case types.FETCH_USER:
      return Object.assign({}, state, {
        isFetchingUser: true,
      });
    case types.UPDATE_AUTH_STATUS:
      return Object.assign({}, state, {
        isFetchingUser: false,
        isAuthenticated: action.isAuthenticated,
      });
    default:
      return state;
  }
}

export default user;
