import { combineReducers } from 'redux';
import articles from './articles';
import * as types from '../constants/ActionTypes';
import user from './user';

function sidebar(state = { collapsed: true }, action) {
  switch (action.type) {
    case types.TOGGLE_COLLAPSED:
      return Object.assign({}, state, {
        collapsed: !state.collapsed,
      });
    default:
      return state;
  }
}

const notistReducers = combineReducers({
  sidebar,
  articles,
  user,
});

export default notistReducers;
