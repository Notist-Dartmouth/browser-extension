import { combineReducers } from 'redux';

function annotation(state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_ANNOTATION':
      return {
        id: action.id,
        articleText: action.articleText,
        text: action.text,
        childAnnotations: [],
      };
    case 'RECEIVE_REPLY':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        childAnnotations: [
          ...state.childAnnotations,
          {
            id: action.childId,
            commentText: action.commentText,
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
    case 'RECEIVE_ANNOTATION':
      return [
        ...state,
        annotation(undefined, action),
      ];
    case 'RECEIVE_REPLY':
      return state.map(a => annotation(Object.assign({}, a, {
        childAnnotations: annotations(a.childAnnotations, action)
      }), action));
    default:
      return state;
  }
}

function articleUrl(state = '', action) {
  switch (action.type) {
    case 'UPDATE_ARTICLE_URL':
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
}, action) {
  switch (action.type) {
    case 'UPDATE_ARTICLE_URL':
      return Object.assign({}, state, {
        currentArticleUrl: articleUrl(state.currentArticleUrl, action),
      });
    case 'REQUEST_CREATE_ANNOTATION':
      return Object.assign({}, state, {
        isCreatingAnnotation: true,
      });
    case 'RECEIVE_REPLY':
    case 'RECEIVE_ANNOTATION':
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
