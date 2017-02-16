import $ from 'jquery';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';
import App from './components/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = new Store({portName: 'notist'});

var sidebar = document.createElement("div");
sidebar.setAttribute("id", "annotation-sidebar");
$("body").prepend(sidebar);

store.ready().then(() => {
  render(
    <Provider store={store}>
      <MuiThemeProvider>
        <App/>
      </MuiThemeProvider>
    </Provider>
    , document.getElementById('annotation-sidebar'));
});

function createAnnotateButton(text) {
  var annotateButton = document.createElement("button");
  var textNode = document.createTextNode("Annotate");
  annotateButton.appendChild(textNode);
  annotateButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({type: 'ADD_ANNOTATION', text: text});
  });
  annotateButton.setAttribute("id", "annotate-button");
  return annotateButton;
}

document.onmouseup = function (e) {
  if (e.target.id === "annotate-button") { return; }
  var text = document.getSelection();
  if (text.anchorNode && text.anchorNode.nodeType === Node.TEXT_NODE && text.toString().length != 0) {
    var annotateButton = createAnnotateButton(text.toString());
    var range = text.getRangeAt(0);
    range.collapse(false);
    range.insertNode(annotateButton);
  }
}

document.onmousedown = function (e) {
  if (e.target.id !== "annotate-button") {
    $("#annotate-button").remove();
  }
}
