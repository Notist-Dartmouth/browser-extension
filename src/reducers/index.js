import { combineReducers } from 'redux';
import annotations from './annotation';
import currentArticleUrl from './article';

const notistReducers = combineReducers({
  annotations,
  currentArticleUrl,
});

export default notistReducers;
