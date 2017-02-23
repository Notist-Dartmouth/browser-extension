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

function requestCreateAnnotation() {
  return {
    type: 'REQUEST_CREATE_ANNOTATION',
  };
}

function sendCreateAnnotationRequest(hostname, dispatch, body) {
  fetch(path.join('http://', hostname, 'api/annotation'), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(res => res.json())
  .then(json => {
    if (json.SUCCESS) {
      const { _id, articleText, text } = json.SUCCESS;
      body.parentId ? dispatch(receiveReply(_id, body.parentId, text))
        : dispatch(receiveAnnotation(_id, articleText, text));
    }
  });
}

export function createAnnotation(parentId, articleText, text) {
  return (dispatch, getState) => {
    dispatch(requestCreateAnnotation());

    const body = {
      parentId,
      articleText,
      text,
      articleUrl: getState().currentArticleUrl,
      groupIds: [],
    };

    sendCreateAnnotationRequest('/* @echo API_HOST */', dispatch, body);
  };
}

export function updateArticleUrl(url) {
  return {
    type: 'UPDATE_ARTICLE_URL',
    url,
  };
}
