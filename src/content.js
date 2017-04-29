import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import _ from 'underscore';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SidebarContainer from './containers/SidebarContainer';
import { newAnnotation } from './actions';

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */

const store = new Store({ portName: 'notist' });
let contentEnabled = false;
let sidebar;

injectTapEventPlugin();

// This adderModule method is based on the main module from the Annotator library:
// https://github.com/openannotation/annotator/blob/5ef5edf157fe728b2d6d95d01e26a55c508c0c44/src/ui/main.js#L208
// Modified to create a new annotation when the user clicks the annotation adder, rather than showing an editor
const adderModule = () => ({
  start: (app) => {
    const adder = new annotator.ui.adder.Adder({
      onCreate: annotation => app.annotations.create(annotation),
    });
    adder.attach();
    const textselector = new annotator.ui.textselector.TextSelector(document.body, {
      onSelection: (ranges, event) => {
        if (ranges.length > 0 && contentEnabled) {
          const annotation = {
            ranges: ranges.map(r => r.serialize(document.body, '.annotator-hl')),
            articleText: document.getSelection().toString(),
          };
          adder.load(annotation, annotator.util.mousePosition(event));
        } else {
          adder.hide();
        }
      },
    });
  },
  annotationCreated: (annotation) => {
    store.dispatch(newAnnotation(annotation.articleText, annotation.ranges));
  },
});

const notistAnnotator = new annotator.App();
notistAnnotator.include(adderModule);
notistAnnotator.start();

const highlighter = new annotator.ui.highlighter.Highlighter(document.body);
let currentAnnotations;

const getCurrentAnnotations = () => {
  const { annotations, groupsFilter } = store.getState().articles;
  return groupsFilter.length > 0 ?
    annotations.filter(a => _.intersection(a.groups, groupsFilter).length > 0) :
    annotations;
};

const handleAnnotationsChanged = () => {
  const previousAnnotations = currentAnnotations;
  currentAnnotations = getCurrentAnnotations();
  if (currentAnnotations !== previousAnnotations) {
    chrome.runtime.sendMessage({ type: 'SET_BADGE', nAnnotations: currentAnnotations.length });
    if (previousAnnotations) {
      previousAnnotations.forEach((a) => {
        highlighter.undraw(a);
      });
    }
    currentAnnotations.forEach(a => highlighter.draw(a));
  }
};

store.subscribe(handleAnnotationsChanged);

const enableContent = () => {
  contentEnabled = true;
  sidebar = document.createElement('div');
  sidebar.setAttribute('id', 'annotation-sidebar');
  $('body').prepend(sidebar);

  store.ready().then(() =>
    render(
      <Provider store={store}>
        <MuiThemeProvider>
          <SidebarContainer />
        </MuiThemeProvider>
      </Provider>
      , document.getElementById('annotation-sidebar')));

  const annotations = store.getState().articles ? getCurrentAnnotations() : [];
  annotations.forEach(a => highlighter.draw(a));
};

const disableContent = () => {
  contentEnabled = false;
  if (document.body.contains(sidebar)) {
    document.body.removeChild(sidebar);
  }
  const annotations = store.getState().articles ? getCurrentAnnotations() : [];
  annotations.forEach(a => highlighter.undraw(a));
};

const updateContent = (isEnabled) => {
  if (isEnabled) {
    enableContent();
  } else {
    disableContent();
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  updateContent(request.contentEnabled);
});

chrome.runtime.sendMessage({ type: 'CONTENT_STATUS' }, (response) => {
  contentEnabled = response ? response.contentEnabled : false;
  updateContent(contentEnabled);
});
