import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';
import App from './components/App';

// based on https://github.com/tshaddix/react-chrome-redux/wiki/Getting-Started

const store = new Store({portName: 'notist'});

store.ready().then(() => {
  render(
    <Provider store={store}>
      <App/>
    </Provider>
    , document.getElementById('app'));
});
