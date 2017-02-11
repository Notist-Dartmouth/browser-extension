import {wrapStore} from 'react-chrome-redux';
import {createStore} from 'redux';
import notistReducers from './reducers';

// based on https://github.com/tshaddix/react-chrome-redux/wiki/Getting-Started

const store = createStore(notistReducers, {});

wrapStore(store, {portName: 'notist'});
