import fetch from 'isomorphic-fetch';
import path from 'path';

function receiveAnnotation(id, articleText, ranges, text) {
  return {
    type: 'RECEIVE_ANNOTATION',
    id,
    articleText,
    ranges,
    text,
  };
}

function receiveReply(id, parent, text) {
  return {
    type: 'RECEIVE_REPLY',
    id,
    parent,
    text,
  };
}

function sendCreateAnnotationRequest(dispatch, body) {
  fetch(path.join('http://', '/* @echo API_HOST */', 'api/annotation'), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(res => res.json())
  .then((json) => {
    if (json.SUCCESS) {
      const { _id, articleText, ranges, text } = json.SUCCESS;
      body.parent ? dispatch(receiveReply(_id, body.parent, text))
        : dispatch(receiveAnnotation(_id, articleText, ranges, text));
    }
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
      groups: [],
    };
    sendCreateAnnotationRequest(dispatch, body);
  };
}

export function createAnnotation(parent, articleText, ranges, text) {
  return {
    type: 'CREATE_ANNOTATION',
    articleText,
    ranges,
    parent,
    text,
  };
}

export function toggleNewComment(annotationId) {
  return {
    type: 'TOGGLE_NEW_COMMENT',
    annotationId,
  };
}

export function toggleCreatingAnnotation() {
  return {
    type: 'TOGGLE_CREATING_ANNOTATION',
  };
}

export function newAnnotation(articleText, ranges) {
  return {
    type: 'NEW_ANNOTATION',
    articleText,
    ranges,
  };
}

export function updateArticleUrl(url) {
  return {
    type: 'UPDATE_ARTICLE_URL',
    url,
  };
}
