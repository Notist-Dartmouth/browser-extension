import {Store} from 'react-chrome-redux';
import {addAnnotation} from './actions';

const store = new Store({portName: 'notist'});

document.onmouseup = function (e) {
  var text = document.getSelection().toString();
  console.log(text);
  store.dispatch(addAnnotation(text));
  console.log(store.getState());
}
