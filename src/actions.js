import fetch from 'isomorphic-fetch';
import path from 'path';

function receiveAnnotation(id, articleText, text) {
  return {
    type: 'RECEIVE_ANNOTATION',
    id,
    articleText,
    text,
  };
}

function receiveReply(id, parentId, text) {
  return {
    type: 'RECEIVE_REPLY',
    id,
    parentId,
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
      const { _id, articleText, text } = json.SUCCESS;
      body.parentId ? dispatch(receiveReply(_id, body.parentId, text))
        : dispatch(receiveAnnotation(_id, articleText, text));
    }
  });
}

export function createAnnotationAsync(parentId, articleText, text) {
  return (dispatch, getState) => {
    const body = {
      parentId,
      articleText,
      text,
      articleUrl: getState().currentArticleUrl,
      groupIds: [],
    };
    sendCreateAnnotationRequest(dispatch, body);
  };
}

export function createAnnotation(parentId, articleText, text) {
  return {
    type: 'CREATE_ANNOTATION',
    articleText,
    parentId,
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

export function newAnnotation(articleText) {
  return {
    type: 'NEW_ANNOTATION',
    articleText,
  };
}

export function updateArticleUrl(url) {
  return {
    type: 'UPDATE_ARTICLE_URL',
    url,
  };
}
