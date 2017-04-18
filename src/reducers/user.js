import * as types from '../constants/ActionTypes';

function userGroups(state = [], action) {
  switch (action.type) {
    case types.RECEIVE_GROUP:
      return [
        ...state,
        action.group,
      ];
    default:
      return state;
  }
}

const initialState = {
  isFetchingUser: false,
  isAuthenticated: false,
  groups: [],
  username: '',
  _id: null,
};

function user(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_USER: {
      const { groups, username, _id } = action.newUser;
      return Object.assign({}, state, {
        isFetchingUser: false,
        groups,
        username,
        _id,
      });
    }
    case types.RECEIVE_GROUP:
      return Object.assign({}, state, {
        groups: userGroups(state.groups, action),
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
