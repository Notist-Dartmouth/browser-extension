import * as types from '../constants/ActionTypes';

const initialAnnotationState = {
  childAnnotations: [],
  ranges: [],
  newCommentVisible: false,
};

function annotation(state = initialAnnotationState, action) {
  switch (action.type) {
    case types.RECEIVE_ANNOTATIONS:
    case types.RECEIVE_ANNOTATION:
      return Object.assign({}, state, action.annotation);
    case types.TOGGLE_NEW_COMMENT:
      return Object.assign({}, state, {
        newCommentVisible: action.annotationId === state._id ? !state.newCommentVisible : false,
      });
    case types.RECEIVE_REPLY:
      if (state._id !== action.reply.parent) {
        return state;
      }
      return Object.assign({}, state, {
        childAnnotations: [
          ...state.childAnnotations,
          Object.assign({}, initialAnnotationState, action.reply),
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
    case types.RECEIVE_ANNOTATIONS:
      return action.annotations.map(a => annotation(undefined, Object.assign(action, { annotation: a })));
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

function articles(state = {
  isFetchingAnnotations: false,
  isCreatingAnnotation: false,
  annotations: [],
  currentArticleUrl: '',
  currentSelection: {
    articleText: '',
    ranges: [],
  },
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
        currentSelection: {
          articleText: action.articleText,
          ranges: action.ranges,
        },
      });
    case types.TOGGLE_NEW_COMMENT:
    case types.RECEIVE_REPLY:
    case types.RECEIVE_ANNOTATION:
      return Object.assign({}, state, {
        annotations: annotations(state.annotations, action),
        isCreatingAnnotation: false,
      });
    case types.FETCH_ANNOTATIONS:
      return Object.assign({}, state, {
        isFetchingAnnotations: true,
      });
    case types.RECEIVE_ANNOTATIONS:
      return Object.assign({}, state, {
        annotations: annotations(state.annotations, action),
        isFetchingAnnotations: false,
      });
    default:
      return state;
  }
}

export default articles;
