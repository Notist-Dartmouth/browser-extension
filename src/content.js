function removeAnnotateButton() {
  var annotateButton = document.getElementById("annotate-button");
  if (annotateButton) {
    annotateButton.remove();
  }
}

function annotateText(text) {
  chrome.runtime.sendMessage({type: 'ADD_ANNOTATION', text: text});
}

function createAnnotateButton(text) {
  var annotateButton = document.createElement("button");
  var textNode = document.createTextNode("Annotate");
  annotateButton.appendChild(textNode);
  annotateButton.addEventListener("click", () => {
    annotateText(text);
  });
  annotateButton.setAttribute("id", "annotate-button");
  return annotateButton;
}

document.onmouseup = function (e) {
  var text = document.getSelection();
  if (e.target.id !== "annotate-button" && text.anchorNode && text.anchorNode.nodeType === Node.TEXT_NODE && text.toString().length != 0) {
    var annotateButton = createAnnotateButton(text.toString());
    var range = text.getRangeAt(0);
    range.collapse(false);
    range.insertNode(annotateButton);
  }
}

document.onmousedown = function (e) {
  if (e.target.id !== "annotate-button") {
    removeAnnotateButton();
  }
}
