import {Store} from 'react-chrome-redux';
import {addAnnotation} from './actions';

const store = new Store({portName: 'notist'});

document.onmouseup = function (e) {
  var text = document.getSelection();
  if (text.toString().length != 0) {
    var annotateButton = document.createElement("button");
    var textNode = document.createTextNode("Annotate");
    annotateButton.appendChild(textNode);
    annotateButton.addEventListener("click", () => {
      console.log(text.toString());
      store.dispatch(addAnnotation(text));
      console.log(store.getState());
    });
    annotateButton.setAttribute("id", "annotate-button");
    text.anchorNode.parentNode.appendChild(annotateButton);
  }
}

document.onmousedown = function (e) {
  var annotateButton = document.getElementById("annotate-button");
  if (annotateButton) {
    annotateButton.remove();
  }
}
