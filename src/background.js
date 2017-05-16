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
  postFbPageArticles,
  updateUserExploreNum,
} from './api';
import {
  getAllFriendScores2,
} from './parse';
import {
  initializeExplore,
} from './explore';

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
    if (contentEnabled) {
      chrome.browserAction.setIcon({ path: 'favicon-16.png' });
    } else {
      chrome.browserAction.setIcon({ path: 'favicon-gray-16.png' });
    }
    chrome.tabs.sendMessage(tabs[0].id, { contentEnabled });
  });
};

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
  } else if (request.type === 'USER_EXPLORE_UPDATE') {
    updateUserExploreNum(request.explore_num, request.std_dev);
  } else if (request.type === 'ADD_EXPLORE_ARTICLES') {
    postFbPageArticles(request.pages, request.score);
  } else if (request.type === 'RUN_EXPLORE_ALGO') {
    getAllFriendScores2(doneExplore, progressExplore);
  }
});

function doneExplore() {
  console.log('done');
  initializeExplore(arguments[0]);
}

function progressExplore() {
  console.log('progress', arguments);
}
