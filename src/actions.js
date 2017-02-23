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

function receiveReply(id, text) {
  return {
    type: 'RECEIVE_REPLY',
    id,
    text,
  };
}

function requestCreateAnnotation() {
  return {
    type: 'REQUEST_CREATE_ANNOTATION',
  };
}

function handleResponse(jsonResponse, dispatch, actionType) {
  switch (actionType) {
    case 'RECEIVE_ANNOTATION':
      if (jsonResponse.SUCCESS) {
        const { _id, articleText, text } = jsonResponse.SUCCESS;
        dispatch(receiveAnnotation(_id, articleText, text));
      }
      break;
    case 'RECEIVE_REPLY':
      if (jsonResponse.SUCCESS) {
        const { _id, text } = jsonResponse.SUCCESS;
        dispatch(receiveReply(_id, text));
      }
      break;
    default:
      break;
  }
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
  .then(json => handleResponse(json, dispatch, body.parentId ? 'RECEIVE_REPLY' : 'RECEIVE_ANNOTATION'));
}

export function createAnnotation(parentId, articleText, text) {
  return function (dispatch, getState) {
    dispatch(requestCreateAnnotation());

    const body = {
      parentId,
      articleText,
      text,
      articleUrl: getState().currentArticleUrl,
      groupIds: [],
    };

    chrome.storage.local.get('apiHost', result =>
      sendCreateAnnotationRequest(result.apiHost, dispatch, body));
  };
}

export function updateArticleUrl(url) {
  return {
    type: 'UPDATE_ARTICLE_URL',
    url,
  };
}
