var annotationId = 0;

export const addAnnotation = (articleText) => {
  return {
    type: 'ADD_ANNOTATION',
    id: annotationId++,
    articleText,
  }
}
