import { wrapStore } from 'react-chrome-redux';
import { createStore } from 'redux';
import notistReducers from './reducers';
import { addAnnotation, updateArticleUrl } from './actions';

const store = createStore(notistReducers, {});
wrapStore(store, { portName: 'notist' });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case 'ADD_ANNOTATION':
      store.dispatch(addAnnotation(request.text));
      break;
    default:
      break;
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  store.dispatch(updateArticleUrl(tab.url));
});
