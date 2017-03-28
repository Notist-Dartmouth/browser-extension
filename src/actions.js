import fetch from 'isomorphic-fetch';
import path from 'path';
import { URL } from 'isomorphic-url';
import URLSearchParams from 'url-search-params';
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

function receiveReply(reply) {
  return {
    type: types.RECEIVE_REPLY,
    reply,
  };
}

function sendCreateAnnotationRequest(dispatch, body) {
  return fetch(path.join('http://', apiHost, 'api/annotation'), {
    method: 'POST',
    credentials: 'include',
    headers,
    body,
  })
  .then(res => res.json())
  .then((json) => {
    if (json.SUCCESS) {
      if (json.SUCCESS.parent) {
        dispatch(receiveReply(json.SUCCESS));
      } else {
        dispatch(receiveAnnotation(json.SUCCESS));
      }
    } // TODO: error handling
  });
}

export function createAnnotationAsync(parent, articleText, ranges, text) {
  return (dispatch, getState) => {
    const body = {
      parentId: parent,
      articleText,
      ranges,
      text,
      uri: getState().articles.currentArticleUrl,
      groups: [], // TODO: pass this function the selected group(s) and whether public or not
      isPublic: true,
    };
    return sendCreateAnnotationRequest(dispatch, JSON.stringify(body));
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
    const { isFetchingAnnotations, currentArticleUrl } = getState().articles;
    if (isFetchingAnnotations) {
      return Promise.resolve();
    } else {
      const urlString = path.join('http://', apiHost, 'api/article/annotations');
      const annotationsEndpoint = new URL(urlString);
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

export function updateUser(groupIds, username) {
  return {
    type: types.UPDATE_USER,
    groupIds,
    username,
  };
}

export function updateAuthStatus(isAuthenticated) {
  return {
    type: types.UPDATE_AUTH_STATUS,
    isAuthenticated,
  };
}
