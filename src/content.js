import $ from 'jquery';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Sidebar from './components/Sidebar';
import { newAnnotation } from './actions';

const store = new Store({ portName: 'notist' });

const sidebar = document.createElement('div');
sidebar.setAttribute('id', 'annotation-sidebar');
$('body').prepend(sidebar);

store.ready().then(() =>
  render(
    <Provider store={store}>
      <MuiThemeProvider>
        <Sidebar />
      </MuiThemeProvider>
    </Provider>
    , document.getElementById('annotation-sidebar')));

const annotateButton = document.createElement('button');
const textNode = document.createTextNode('Annotate');
annotateButton.appendChild(textNode);
annotateButton.setAttribute('id', 'annotate-button');
let annotationDisabled = false;

const isValidSelection = (selection) => {
  return selection.anchorNode && selection.anchorNode.nodeType === Node.TEXT_NODE
    && selection.toString().length !== 0;
};

document.onmouseup = (e) => {
  if (annotationDisabled || e.target.id === 'annotate-button') { return; }
  const text = document.getSelection();
  if (isValidSelection(text)) {
    annotateButton.onclick = () => store.dispatch(newAnnotation(text.toString()));
    const range = text.getRangeAt(0);
    range.collapse(false);
    range.insertNode(annotateButton);
  }
};

$('#annotation-sidebar').hover(
  () => { annotationDisabled = true; },
  () => { annotationDisabled = false; },
);

document.onmousedown = (e) => {
  if (e.target.id !== 'annotate-button') {
    $('#annotate-button').remove();
  }
};
