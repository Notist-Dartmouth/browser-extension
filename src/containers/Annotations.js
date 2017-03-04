import { connect } from 'react-redux';
import AnnotationList from '../components/AnnotationList';
import AnnotationForm from '../components/AnnotationForm';
import { toggleNewComment, toggleCreatingAnnotation } from '../actions';

function mapStateToProps(state) {
  const { annotations, isFetchingAnnotations, isCreatingAnnotation, selectedArticleText } = state.articleAnnotations;
  return {
    annotations,
    isFetchingAnnotations,
    isCreatingAnnotation,
    articleText: selectedArticleText,
  };
}

function mapFormDispatchToProps(dispatch) {
  return {
    onCommentPost: (parentId, articleText, text) => dispatch({
      type: 'CREATE_ANNOTATION',
      articleText,
      text,
    }),
    onFormCancel: () => dispatch(toggleCreatingAnnotation()),
  };
}

function mapListDispatchToProps(dispatch) {
  return {
    onCommentPost: (parentId, articleText, text) => dispatch({
      type: 'CREATE_ANNOTATION',
      articleText,
      parentId,
      text,
    }),
    onCommentToggle: annotationId => dispatch(toggleNewComment(annotationId)),
  };
}

export const AnnotationListContainer = connect(mapStateToProps, mapListDispatchToProps)(AnnotationList);

export const AnnotationFormContainer = connect(mapStateToProps, mapFormDispatchToProps)(AnnotationForm);
