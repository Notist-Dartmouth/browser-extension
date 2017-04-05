import 'whatwg-fetch';
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
apiHost = 'http://notist.herokuapp.com';
// @endif
// @if ENVIRONMENT='development'
apiHost = 'http://localhost:3000';
// @endif

export function updateAuthStatus(isAuthenticated) {
  return {
    type: types.UPDATE_AUTH_STATUS,
    isAuthenticated,
  };
}

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
  return fetch(path.join(apiHost, 'api/annotation'), {
    method: 'POST',
    credentials: 'include',
    headers,
    body,
  })
  .then((res) => {
    if (res.status === 401) {
      dispatch(updateAuthStatus(false));
      return {};
    } else {
      return res.json();
    }
  })
  .then((json) => {
    if (json.SUCCESS) {
      if (json.SUCCESS.parent) {
        dispatch(receiveReply(json.SUCCESS));
      } else {
        dispatch(receiveAnnotation(json.SUCCESS));
      }
    }
  });
}

export function createAnnotationAsync(parent, articleText, ranges, text, groups) {
  return (dispatch, getState) => {
    const body = {
      parent,
      articleText,
      ranges,
      text,
      uri: getState().articles.currentArticleUrl,
      groups,
      isPublic: true, // TODO: pass whether is public or not
    };
    return sendCreateAnnotationRequest(dispatch, JSON.stringify(body));
  };
}

export function createAnnotation(parent, articleText, ranges, text, groups) {
  return {
    type: types.CREATE_ANNOTATION,
    articleText,
    ranges,
    parent,
    text,
    groups,
  };
}

export function fetchAnnotationsAsync() {
  return (dispatch, getState) => {
    const { isFetchingAnnotations, currentArticleUrl } = getState().articles;
    if (isFetchingAnnotations) {
      return Promise.resolve();
    } else {
      const urlString = path.join(apiHost, 'api/article/annotations');
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

export function selectAnnotationGroups(groups) {
  return {
    type: types.SELECT_ANNOTATION_GROUPS,
    groups,
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

export function updateUser(groups, username) {
  return {
    type: types.UPDATE_USER,
    groups,
    username,
  };
}

export function fetchUserAsync() {
  return (dispatch, getState) => {
    const { isFetchingUser } = getState().user;
    if (isFetchingUser) {
      return Promise.resolve();
    } else {
      return fetch(path.join(apiHost, '/api/user'), {
        method: 'GET',
        credentials: 'include',
        headers,
      })
      .then((res) => {
        if (res.status === 401) {
          dispatch(updateAuthStatus(false));
          return {};
        } else {
          return res.json();
        }
      })
      .then((user) => {
        if (user.groups && user.username) {
          dispatch(updateUser(user.groups, user.username));
          dispatch(updateAuthStatus(true));
        }
      });
    }
  };
}

export function fetchUser() {
  return {
    type: types.FETCH_USER,
  };
}

export function createGroup(group) {
  return {
    type: types.CREATE_GROUP,
    group,
  };
}

function handleCreateGroupSuccess(group) {
  return {
    type: types.RECEIVE_GROUP,
    group,
  };
}

export function createGroupAsync(group) {
  return (dispatch, getState) =>
    fetch(path.join(apiHost, '/api/group'), {
      method: 'POST',
      credentials: 'include',
      headers,
      body: JSON.stringify(group),
    })
    .then(res => res.json())
    .then((savedGroup) => {
      if (savedGroup.SUCCESS) {
        dispatch(handleCreateGroupSuccess(savedGroup.SUCCESS));
      }
    });
}
