import { alias, wrapStore } from 'react-chrome-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import notistReducers from './reducers';
import {
  createAnnotationAsync,
  fetchAnnotationsAsync,
  fetchUserAsync,
  updateArticleUrl,
  createGroupAsync,
  deleteAnnotationAsync,
} from './actions';

/* eslint-disable no-undef */

const aliases = {
  CREATE_ANNOTATION: action =>
    createAnnotationAsync(action.parent, action.articleText, action.ranges, action.text, action.groups),
  REQUEST_DELETE_ANNOTATION: action => deleteAnnotationAsync(action.annotationId),
  FETCH_ANNOTATIONS: () => fetchAnnotationsAsync(),
  FETCH_USER: () => fetchUserAsync(),
  CREATE_GROUP: action => createGroupAsync(action.group),
};

const store = createStore(
  notistReducers,
  applyMiddleware(
    alias(aliases),
    logger,
    thunkMiddleware,
  ),
);
wrapStore(store, { portName: 'notist' });

let contentEnabled = true;

const toggleEnabled = () => {
  contentEnabled = !contentEnabled;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { contentEnabled });
  });
};

chrome.browserAction.onClicked.addListener(() => toggleEnabled());

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) =>
  store.dispatch(updateArticleUrl(tab.url)));
