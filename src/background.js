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
import {
  exploreSetup,
} from './explore';

/* eslint-disable no-undef */

const aliases = {
  CREATE_ANNOTATION: () => createAnnotationAsync(),
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
let prevUrl = null;
let frontendHost;
// @if ENVIRONMENT='production'
frontendHost = 'https://notist.io';
// @endif
// @if ENVIRONMENT='development'
frontendHost = 'http://localhost:5000';
// @endif

const updateEnabled = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (contentEnabled) {
      chrome.browserAction.setIcon({ path: 'favicon-16.png' });
    } else {
      chrome.browserAction.setIcon({ path: 'favicon-gray-16.png' });
    }
    chrome.tabs.sendMessage(tabs[0].id, { contentEnabled });
  });
};

const toggleEnabled = () => {
  contentEnabled = !contentEnabled;
  updateEnabled();
};

store.subscribe(() => {
  const { currentArticleUrl } = store.getState().articles;
  if (currentArticleUrl !== prevUrl) {
    if (currentArticleUrl.indexOf(`${frontendHost}/explore`) !== -1) {
      contentEnabled = true;
      updateEnabled();
    } else if (currentArticleUrl.indexOf(`${frontendHost}`) !== -1) {
      contentEnabled = false;
      updateEnabled();
    }
  }
  prevUrl = currentArticleUrl;
});

const setNumAnnotations = (nAnnotations) => {
  chrome.browserAction.setBadgeText({
    text: nAnnotations > 0 ? `${nAnnotations}` : '',
  });
};

chrome.browserAction.onClicked.addListener(() => toggleEnabled());

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) =>
  store.dispatch(updateArticleUrl(tab.url)));

chrome.tabs.onActivated.addListener(activeInfo =>
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    store.dispatch(updateArticleUrl(tab.url));
    store.dispatch(fetchAnnotationsAsync());
    chrome.tabs.sendMessage(activeInfo.tabId, { contentEnabled });
  }));

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'CONTENT_STATUS') {
    sendResponse({ contentEnabled });
  } else if (request.type === 'SET_BADGE') {
    setNumAnnotations(request.nAnnotations);
  } else if (request.type === 'RUN_EXPLORE_ALGO') {
    exploreSetup();
  }
});
