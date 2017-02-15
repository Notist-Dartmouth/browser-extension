import {wrapStore} from 'react-chrome-redux';
import {createStore} from 'redux';
import notistReducers from './reducers';
import {addAnnotation} from './actions';

const store = createStore(notistReducers, {});
wrapStore(store, {portName: 'notist'});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.type === 'ADD_ANNOTATION') {
      store.dispatch(addAnnotation(request.text));
    }
  });
