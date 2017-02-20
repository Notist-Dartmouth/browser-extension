let annotationId = 0;

const addAnnotation = (articleText) => {
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

const requestCreateAnnotation = (parentId, articleUrl, articleText, text) => {
  return {
    type: 'REQUEST_CREATE_ANNOTATION',
    articleText,
    text,
    parentId,
  };
};

export const updateArticleUrl = (url) => {
  return {
    type: 'UPDATE_ARTICLE_URL',
    url,
  }
};
