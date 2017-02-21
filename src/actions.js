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
    default:
      break;
  }
}

export function createAnnotation(parentId, articleText, text, articleUrl) {
  return function (dispatch) {
    dispatch(requestCreateAnnotation());

    chrome.storage.local.get('apiHost', result =>
      fetch(path.join('http://', result.apiHost, 'api/annotation'), {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          parentId,
          articleText,
          text,
          articleUrl,
          groupIds: [],
        }),
      }).then(res => res.json())
      .then(json => handleResponse(json, dispatch, 'RECEIVE_ANNOTATION')));
  };
}

export function updateArticleUrl(url) {
  return {
    type: 'UPDATE_ARTICLE_URL',
    url,
  };
}
