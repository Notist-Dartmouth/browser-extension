import {wrapStore} from 'react-chrome-redux';
import {createStore} from 'redux';
import $ from 'jquery'
import notistReducers from './reducers';
import {addAnnotation} from './actions';

const store = createStore(notistReducers, {});
wrapStore(store, {portName: 'notist'});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
  switch (request.type) {
    case 'ADD_ANNOTATION':
      store.dispatch(addAnnotation(request.text));
      break;
    default:
      break;
  }
});
