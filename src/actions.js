import fetch from 'isomorphic-fetch';
import path from 'path';
import { URL, URLSearchParams } from 'isomorphic-url';
import * as types from './constants/ActionTypes';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

let apiHost;
// @if ENVIRONMENT='production'
apiHost = 'notist.herokuapp.com';
// @endif
// @if ENVIRONMENT='development'
apiHost = 'localhost:3000';
// @endif

function receiveAnnotation(annotation) {
  return {
    type: types.RECEIVE_ANNOTATION,
    annotation,
  };
}

function receiveAnnotations(annotations) {
  return {
    type: types.RECEIVE_ANNOTATIONS,
    annotations,
  };
}

function receiveReply(_id, parent, text) {
  return {
    type: types.RECEIVE_REPLY,
    _id,
    parent,
    text,
  };
}

function sendCreateAnnotationRequest(dispatch, body) {
  return fetch(path.join('http://', apiHost, 'api/annotation'), {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify(body),
  })
  .then(res => res.json())
  .then((json) => {
    if (json.SUCCESS) {
      const { _id, text } = json.SUCCESS;
      body.parent ? dispatch(receiveReply(_id, body.parent, text))
        : dispatch(receiveAnnotation(json.SUCCESS));
    } // TODO: error handling
  });
}

export function createAnnotationAsync(parent, articleText, ranges, text) {
  return (dispatch, getState) => {
    const body = {
      parent,
      articleText,
      ranges,
      text,
      uri: getState().articleAnnotations.currentArticleUrl,
      groups: [], // TODO: pass this function the selected group(s) and whether public or not
      isPublic: true,
    };
    return sendCreateAnnotationRequest(dispatch, body);
  };
}

export function createAnnotation(parent, articleText, ranges, text) {
  return {
    type: types.CREATE_ANNOTATION,
    articleText,
    ranges,
    parent,
    text,
  };
}

export function fetchAnnotationsAsync() {
  return (dispatch, getState) => {
    const { isFetchingAnnotations, currentArticleUrl } = getState().articleAnnotations;
    if (!isFetchingAnnotations) {
      const annotationsEndpoint = new URL(path.join('http://', apiHost, 'api/article/annotations'));
      annotationsEndpoint.search = new URLSearchParams(`?uri=${currentArticleUrl}`);
      return fetch(annotationsEndpoint, {
        method: 'GET',
        credentials: 'include',
        headers,
      })
      .then(res => res.json())
      .then((annotations) => {
        if (annotations.ERROR) {
          console.log(annotations.ERROR); // TODO: error handling
        } else {
          dispatch(receiveAnnotations(annotations));
        }
      });
    }
  };
}

export function fetchAnnotations() {
  return {
    type: types.FETCH_ANNOTATIONS,
  };
}

export function toggleNewComment(annotationId) {
  return {
    type: types.TOGGLE_NEW_COMMENT,
    annotationId,
  };
}

export function toggleCreatingAnnotation() {
  return {
    type: types.TOGGLE_CREATING_ANNOTATION,
  };
}

export function newAnnotation(articleText, ranges) {
  return {
    type: types.NEW_ANNOTATION,
    articleText,
    ranges,
  };
}

export function updateArticleUrl(url) {
  return {
    type: types.UPDATE_ARTICLE_URL,
    url,
  };
}
