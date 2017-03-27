import { alias, wrapStore } from 'react-chrome-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import notistReducers from './reducers';
import { createAnnotationAsync, fetchAnnotationsAsync, updateArticleUrl } from './actions';

const aliases = {
  CREATE_ANNOTATION: action => createAnnotationAsync(action.parent, action.articleText, action.ranges, action.text),
  FETCH_ANNOTATIONS: () => fetchAnnotationsAsync(),
};

const store = createStore(
  notistReducers,
  applyMiddleware(
    alias(aliases),
    thunkMiddleware,
  ),
);
wrapStore(store, { portName: 'notist' });

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) =>
  store.dispatch(updateArticleUrl(tab.url)));
