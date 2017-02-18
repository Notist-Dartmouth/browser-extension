var annotationId = 0;

export const addAnnotation = (articleText) => {
  annotationId += 1;
  return {
    type: 'ADD_ANNOTATION',
    id: annotationId,
    articleText,
  };
};

export const addChildAnnotation = (id, commentText) => {
  annotationId += 1;
  return {
    type: 'ADD_CHILD_ANNOTATION',
    childId: annotationId,
    commentText,
    id,
  };
};
