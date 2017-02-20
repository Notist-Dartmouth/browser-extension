function annotation(state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_ANNOTATION':
      return {
        id: action.id,
        articleText: action.articleText,
        text: action.text,
        childAnnotations: [],
      };
    case 'ADD_CHILD_ANNOTATION':
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
    case 'ADD_CHILD_ANNOTATION':
      return state.map(a => annotation(Object.assign({}, a, {
        childAnnotations: annotations(a.childAnnotations, action)
      }), action));
    default:
      return state;
  }
}

export default annotations;
