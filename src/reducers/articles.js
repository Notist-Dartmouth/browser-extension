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
    case types.DELETE_ANNOTATION: {
      const ids = state.map(a => a._id);
      return ids.includes(action.annotationId) ?
        state.filter(a => a._id !== action.annotationId) :
        state.map(a => annotation(Object.assign({}, a, {
          childAnnotations: annotations(a.childAnnotations, action),
        }), action));
    }
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

function annotationForm(state = {
  articleText: '',
  ranges: [],
  groups: [],
}, action) {
  switch (action.type) {
    case types.SELECT_ANNOTATION_GROUPS:
      return Object.assign({}, state, {
        groups: action.groups,
      });
    case types.NEW_ANNOTATION:
      return Object.assign({}, state, {
        articleText: action.articleText,
        ranges: action.ranges,
      });
    default:
      return state;
  }
}

function articles(state = {
  isFetchingAnnotations: false,
  isCreatingAnnotation: false,
  groupsFilter: [],
  annotations: [],
  currentArticleUrl: '',
  newAnnotation: {
    articleText: '',
    ranges: [],
    groups: [],
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
    case types.SELECT_ANNOTATION_GROUPS:
    case types.NEW_ANNOTATION:
      return Object.assign({}, state, {
        isCreatingAnnotation: true,
        newAnnotation: annotationForm(state.newAnnotation, action),
      });
    case types.FILTER_GROUP:
      return Object.assign({}, state, {
        groupsFilter: action.groups,
      });
    case types.TOGGLE_NEW_COMMENT:
    case types.RECEIVE_REPLY:
    case types.RECEIVE_ANNOTATION:
    case types.DELETE_ANNOTATION:
      return Object.assign({}, state, {
        annotations: annotations(state.annotations, action),
        isCreatingAnnotation: false,
        isFetchingAnnotations: false,
      });
    case types.REQUEST_ANNOTATIONS:
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
