let annotationId = 0;

export const addAnnotation = (articleText) => {
  return {
    type: 'ADD_ANNOTATION',
    id: annotationId++,
    articleText,
  };
};

export const addChildAnnotation = (id, commentText) => {
  return {
    type: 'ADD_CHILD_ANNOTATION',
    childId: annotationId++,
    commentText,
    id,
  };
};
