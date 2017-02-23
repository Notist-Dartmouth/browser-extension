import $ from 'jquery';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Sidebar from './components/Sidebar';

const store = new Store({ portName: 'notist' });

const sidebar = document.createElement('div');
sidebar.setAttribute('id', 'annotation-sidebar');
$('body').prepend(sidebar);

store.ready().then(() => {
  render(
    <Provider store={store}>
      <MuiThemeProvider>
        <Sidebar />
      </MuiThemeProvider>
    </Provider>
    , document.getElementById('annotation-sidebar'));
});

function createAnnotateButton(articleText) {
  const annotateButton = document.createElement('button');
  const textNode = document.createTextNode('Annotate');
  annotateButton.appendChild(textNode);
  annotateButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({
      type: 'ADD_ANNOTATION',
      articleText,
    });
  });
  annotateButton.setAttribute('id', 'annotate-button');
  return annotateButton;
}

document.onmouseup = function (e) {
  if (e.target.id === 'annotate-button') { return; }
  const text = document.getSelection();
  if (text.anchorNode && text.anchorNode.nodeType === Node.TEXT_NODE && text.toString().length !== 0) {
    const annotateButton = createAnnotateButton(text.toString());
    const range = text.getRangeAt(0);
    range.collapse(false);
    range.insertNode(annotateButton);
  }
};

document.onmousedown = function (e) {
  if (e.target.id !== 'annotate-button') {
    $('#annotate-button').remove();
  }
};
