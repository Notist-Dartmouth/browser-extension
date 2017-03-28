import { combineReducers } from 'redux';
import articles from './articles';
import user from './user';

const notistReducers = combineReducers({
  articles,
  user,
});

export default notistReducers;
