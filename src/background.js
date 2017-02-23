import { alias, wrapStore } from 'react-chrome-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import $ from 'jquery';
import notistReducers from './reducers';
import { createAnnotation, updateArticleUrl } from './actions';

const aliases = {
  'CREATE_ANNOTATION' : (action) => createAnnotation(action.parentId, action.articleText, action.text)
}

const store = createStore(
  notistReducers,
  applyMiddleware(
    alias(aliases),
    thunkMiddleware
  ),
);
wrapStore(store, { portName: 'notist' });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case 'ADD_ANNOTATION':
      store.dispatch(createAnnotation(null, request.articleText, ''));
      break;
    default:
      break;
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) =>
  store.dispatch(updateArticleUrl(tab.url)));

$.getJSON(chrome.extension.getURL('config.json'), configVars =>
  chrome.storage.local.set(configVars));
