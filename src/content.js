import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Sidebar from './components/Sidebar';
import { newAnnotation } from './actions';

const sidebar = document.createElement('div');
sidebar.setAttribute('id', 'annotation-sidebar');
$('body').prepend(sidebar);

const store = new Store({ portName: 'notist' });
store.ready().then(() =>
  render(
    <Provider store={store}>
      <MuiThemeProvider>
        <Sidebar />
      </MuiThemeProvider>
    </Provider>
    , document.getElementById('annotation-sidebar')));

// Based on the annotationFactory method from the Annotator library - https://github.com/openannotation/annotator/blob/master/src/ui/main.js
// Returns the selected text and its range in the document
const makeAnnotation = (ranges) => {
  const text = [];
  const serializedRanges = [];
  for (let i = 0, len = ranges.length; i < len; i += 1) {
    const r = ranges[i];
    text.push(r.text());
    serializedRanges.push(r.serialize(document.body, '.annotator-hl'));
  }
  return {
    quote: text.join(' / '),
    ranges: serializedRanges,
  };
};

// Based on the main module from the Annotator library - https://github.com/openannotation/annotator/blob/master/src/ui/main.js
// Modified to create a new annotation when the user clicks the annotation adder, rather than showing the editor
const adderModule = () => {
  let adder;
  let highlighter;
  let textselector;
  return {
    start: (app) => {
      adder = new annotator.ui.adder.Adder({
        onCreate: annotation => app.annotations.create(annotation),
      });
      adder.attach();
      highlighter = new annotator.ui.highlighter.Highlighter(document.body);
      textselector = new annotator.ui.textselector.TextSelector(document.body, {
        onSelection: (ranges, event) => {
          if (ranges.length > 0) {
            const annotation = makeAnnotation(ranges);
            adder.load(annotation, annotator.util.mousePosition(event));
          } else {
            adder.hide();
          }
        },
      });
    },
    annotationCreated: (annotation) => {
      highlighter.draw(annotation);
      store.dispatch(newAnnotation(annotation.quote));
    },
  };
};

const notistAnnotator = new annotator.App();
notistAnnotator.include(adderModule);
notistAnnotator.start();
