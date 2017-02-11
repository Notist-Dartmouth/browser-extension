const annotation = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_ANNOTATION':
      return {
        id: action.id,
        articleText: action.articleText
      }
    default:
      return state
  }
}

const annotations = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ANNOTATION':
      return [
        ...state,
        annotation(undefined, action)
      ]
    default:
      return state
  }
}

export default annotations;
