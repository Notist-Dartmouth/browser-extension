import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import _ from 'underscore';
import SidebarContainer from './containers/SidebarContainer';
import { newAnnotation } from './actions';

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */

const store = new Store({ portName: 'notist' });
let contentEnabled = true;
const sidebar = document.createElement('div');
sidebar.setAttribute('id', 'annotation-sidebar');
$('body').prepend(sidebar);
document.getElementById('annotation-sidebar').style.all = 'initial';

store.ready().then(() =>
  render(
    <Provider store={store} >
      <SidebarContainer />
    </Provider>,
    document.getElementById('annotation-sidebar')));

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
    if (contentEnabled) {
      currentAnnotations.forEach(a => highlighter.draw(a));
    }
  }
};

store.subscribe(handleAnnotationsChanged);

const updateContent = (isEnabled) => {
  const annotations = store.getState().articles ? getCurrentAnnotations() : [];
  if (isEnabled) {
    if (!contentEnabled) {
      $('#annotation-sidebar').show();
      annotations.forEach(a => highlighter.draw(a));
    }
  } else {
    $('#annotation-sidebar').hide();
    annotations.forEach(a => highlighter.undraw(a));
  }
  contentEnabled = isEnabled;
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  updateContent(request.contentEnabled);
});

chrome.runtime.sendMessage({ type: 'CONTENT_STATUS' }, response =>
  updateContent(response.contentEnabled || false));
