import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';

function annotation(state = {}, action) {
  switch (action.type) {
    case types.RECEIVE_ANNOTATION:
      return {
        id: action.id,
        articleText: action.articleText,
        text: action.text,
        childAnnotations: [],
        newCommentVisible: false,
      };
    case types.TOGGLE_NEW_COMMENT:
      return Object.assign({}, state, {
        newCommentVisible: action.annotationId === state.id ? !state.newCommentVisible : false,
      });
    case types.RECEIVE_REPLY:
      if (state.id !== action.parentId) {
        return state;
      }
      return Object.assign({}, state, {
        childAnnotations: [
          ...state.childAnnotations,
          {
            id: action.id,
            text: action.text,
            childAnnotations: [],
          },
        ],
      });
    default:
      return state;
  }
}

function annotations(state = [], action) {
  switch (action.type) {
    case types.RECEIVE_ANNOTATION:
      return [
        ...state,
        annotation(undefined, action),
      ];
    case types.TOGGLE_NEW_COMMENT:
    case types.RECEIVE_REPLY:
      return state.map(a => annotation(Object.assign({}, a, {
        childAnnotations: annotations(a.childAnnotations, action),
      }), action));
    default:
      return state;
  }
}

function articleUrl(state = '', action) {
  switch (action.type) {
    case types.UPDATE_ARTICLE_URL:
      return action.url;
    default:
      return state;
  }
}

function articleAnnotations(state = {
  isFetchingAnnotations: false,
  isCreatingAnnotation: false,
  annotations: [],
  currentArticleUrl: '',
  selectedArticleText: '',
}, action) {
  switch (action.type) {
    case types.TOGGLE_CREATING_ANNOTATION:
      return Object.assign({}, state, {
        isCreatingAnnotation: !state.isCreatingAnnotation,
      });
    case types.UPDATE_ARTICLE_URL:
      return Object.assign({}, state, {
        currentArticleUrl: articleUrl(state.currentArticleUrl, action),
      });
    case types.NEW_ANNOTATION:
      return Object.assign({}, state, {
        isCreatingAnnotation: true,
        selectedArticleText: action.articleText,
      });
    case types.TOGGLE_NEW_COMMENT:
    case types.RECEIVE_REPLY:
    case types.RECEIVE_ANNOTATION:
      return Object.assign({}, state, {
        annotations: annotations(state.annotations, action),
        isCreatingAnnotation: false,
      });
    default:
      return state;
  }
}

const notistReducers = combineReducers({ articleAnnotations });

export default notistReducers;
